const uniq = require("lodash.uniq");
const applyPlayerFilterToGamesList = require("../lib/util/appyPlayerFiltersToGameList");

const resolvers = {
  Query: {
    user: async (_source, { userId }, { dataSources }) => {
      return dataSources.steamUsersAPI.getUserSummaryById(userId);
    },
    game: async (_source, { gameId }, { dataSources }) => {
      return dataSources.steamGamesAPI.getGameByGameId(gameId);
    },
    articles: async (_source, { gameId }, { dataSources }) => {
      return dataSources.steamNewsAPI.getNewsForGameById(gameId);
    },
    recommendations: async (
      _source,
      {
        users,
        filters: { playerFilters = {}, gameFilters = {} } = {},
        first,
        after,
        orderBy,
        sortOrder
      },
      { dataSources }
    ) => {
      // 1. get all unique games owned by players from Steam's player service API
      const userOwnedGames = await dataSources.steamPlayerServiceAPI.getOwnedGamesByPlayerIds(
        users
      );
      let uniqueOwnedGames = [];
      Object.keys(userOwnedGames).forEach(user => {
        uniqueOwnedGames = uniqueOwnedGames.concat(
          userOwnedGames[user]["games"].map(game => game.id)
        );
      });
      uniqueOwnedGames = uniq(uniqueOwnedGames);

      // 2. get recently played games by players from Steam's player service API
      const userRecentlyPlayedGames = await dataSources.steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerIds(
        users
      );

      // 3. apply player filters to the list of unique owned games
      let uniqueOwnedGamesWithPlayerFiltersApplied = uniqueOwnedGames;
      Object.keys(playerFilters).forEach(key => {
        playerFilters[key] = playerFilters[key].filter(value =>
          users.some(user => user.id === value)
        );
        if (playerFilters[key].length) {
          uniqueOwnedGamesWithPlayerFiltersApplied = applyPlayerFilterToGamesList(
            playerFilters[key],
            uniqueOwnedGames
          );
        }
      });

      // 4. get details for each unique game from Wye's support service's API, applying filters, pagination, and sorting
      let orderByParam;
      if (orderBy && sortOrder) {
        orderByParam = `${orderBy}_${sortOrder}`;
      }
      const uniqueOwnedGamesDetails = await dataSources.wyeGamesAPI.getGamesByGameIds(
        uniqueOwnedGamesWithPlayerFiltersApplied,
        gameFilters,
        first,
        after,
        orderByParam
      );

      // 5. return Recommendation for each of the results of the filtered games
      const edges = uniqueOwnedGamesDetails.map(game => ({
        node: {
          game,
          ownedBy: Object.keys(userOwnedGames).filter(user =>
            userOwnedGames[user]["games"].some(
              userGame => userGame.id === game.appid
            )
          ),
          recentlyPlayedBy: Object.keys(userRecentlyPlayedGames).filter(user =>
            userRecentlyPlayedGames[user]["games"].some(
              gameId => gameId === game.appid
            )
          ),
          playtime: Object.keys(userOwnedGames).map(user => {
            if (
              userOwnedGames[user]["games"].some(
                userGame => userGame.id === game.appid
              )
            ) {
              return {
                id: user,
                playtime: userOwnedGames[user]["games"].filter(
                  userGame => userGame.id === game.appid
                )[0].hoursPlayed
              };
            } else {
              return {
                id: user,
                playtime: 0
              };
            }
          })
        }
      }));
      return {
        pageInfo: {
          totalCount: uniqueOwnedGamesDetails.length
        },
        edges
      };
    }
  },
  User: {
    ownedGames: async ({ id }, _args, { dataSources }) => {
      return dataSources.steamPlayerServiceAPI.getOwnedGamesByPlayerId(id);
    },
    recentlyPlayedGames: async ({ id }, _args, { dataSources }) => {
      return dataSources.steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerId(
        id
      );
    }
  },
  Game: {
    details: async (_source, { gameId }, { dataSources }) => {
      return dataSources.steamGamesAPI.getGameByGameId(gameId);
    },
    articles: async (_source, { gameId }, { dataSources }) => {
      return dataSources.steamNewsAPI.getNewsForGameById(gameId);
    }
  }
};

module.exports = resolvers;
