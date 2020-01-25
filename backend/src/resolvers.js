const uniq = require("lodash.uniq");
const {
  sortRecommendations,
  sortRecommendationsByPlaytime
} = require("../lib/util/sortRecommendations");
const applyPlayerFilterToGamesList = require("../lib/util/applyPlayerFiltersToGameList");

const PLAYER_FILTERS_KEYS = {
  OWNED_BY: "ownedBy",
  RECENTLY_PLAYED_BY: "recentlyPlayedBy"
};

const SORT_BY_MAP = {
  NAME: "node.game.name",
  FREE_TO_PLAY: "node.game.freeToPlay",
  ON_SALE: "node.game.onSale",
  DISCOUNT: "node.game.discount",
  FINAL_PRICE: "node.game.finalPrice",
  USER_RATING: "node.game.userRating",
  PLAYTIME_RECENT: "node.game.playtime2Weeks",
  PLAYTIME_FOREVER: "node.game.playtimeForever",
  OWNER_COUNT: "node.game.owners.max",
  OWNED_BY: "node.ownedBy.length",
  RECENTLY_PLAYED_BY: "node.recentlyPlayedBy.length",
  HOURS_PLAYED: "node.playtime"
};

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
    mostPopularBackgroundSrc: async (_source, _args, { dataSources }) => {
      return dataSources.wyeGamesAPI.getMostPopularBackground();
    },
    getHighlightTrailer: async (_source, { gameId }, { dataSources }) => {
      return dataSources.steamGamesAPI.getGameHighlightTrailer(gameId);
    },
    recommendations: async (
      _source,
      {
        users,
        filters: { playerFilters = {}, gameFilters = {} } = {},
        orderBy,
        sortOrder = "DESC",
        first
      },
      { dataSources }
    ) => {
      let uniqueOwnedGamesWithPlayerFiltersApplied = [];
      let userOwnedGames,
        userRecentlyPlayedGames = {};
      if (users) {
        // 1. get all unique games owned by players from Steam's player service API
        userOwnedGames = await dataSources.steamPlayerServiceAPI.getOwnedGamesByPlayerIds(
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
        userRecentlyPlayedGames = await dataSources.steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerIds(
          users
        );

        // 3. apply player filters to the list of unique owned games
        uniqueOwnedGamesWithPlayerFiltersApplied = uniqueOwnedGames;
        Object.keys(playerFilters).forEach(key => {
          if (key === PLAYER_FILTERS_KEYS.OWNED_BY) {
            uniqueOwnedGamesWithPlayerFiltersApplied = applyPlayerFilterToGamesList(
              playerFilters[key],
              uniqueOwnedGamesWithPlayerFiltersApplied,
              userOwnedGames
            );
          } else if (key === PLAYER_FILTERS_KEYS.RECENTLY_PLAYED_BY) {
            uniqueOwnedGamesWithPlayerFiltersApplied = applyPlayerFilterToGamesList(
              playerFilters[key],
              uniqueOwnedGamesWithPlayerFiltersApplied,
              userRecentlyPlayedGames
            );
          }
        });
      }

      // 4. get details for each unique game from Wye's support service's API and apply filters
      const uniqueGameDetails = await dataSources.wyeGamesAPI.getGamesByGameIds(
        uniqueOwnedGamesWithPlayerFiltersApplied.length
          ? uniqueOwnedGamesWithPlayerFiltersApplied
          : undefined,
        gameFilters
      );

      // 5. get user profile data
      const userDetails = dataSources.steamUsersAPI.getUserSummariesByIds(
        users
      );

      // 6. build edges for each of the results of the filtered games
      let edges = uniqueGameDetails.map(game => {
        // who owns the game
        const ownedBy = !users
          ? null
          : Object.keys(userOwnedGames).filter(user =>
              userOwnedGames[user]["games"].some(
                userGame => userGame.id === game.appid
              )
            );

        // who has recently played the game
        const recentlyPlayedBy = !users
          ? null
          : Object.keys(userRecentlyPlayedGames).filter(user =>
              userRecentlyPlayedGames[user]["games"].some(
                gameId => gameId === game.appid
              )
            );

        // what is each user's playtime for the game
        const playtime = !users
          ? null
          : Object.keys(userOwnedGames).map(user => {
              if (
                userOwnedGames[user]["games"].some(
                  userGame => userGame.id === game.appid
                )
              ) {
                return {
                  id: user,
                  hoursPlayed: userOwnedGames[user]["games"].filter(
                    userGame => userGame.id === game.appid
                  )[0].hoursPlayed
                };
              } else {
                return {
                  id: user,
                  hoursPlayed: 0
                };
              }
            });

        return {
          node: {
            game,
            ownedBy,
            recentlyPlayedBy,
            playtime
          }
        };
      });

      // 7. apply sorting
      // - by default, sort for the highest rated game owned by the most users, and then by lowest price
      const direction = sortOrder === "DESC" ? -1 : 1;
      let sortBy = [
        {
          prop: SORT_BY_MAP.OWNED_BY,
          direction: -1
        },
        {
          prop: SORT_BY_MAP.USER_RATING,
          direction: -1
        },
        {
          prop: SORT_BY_MAP.FINAL_PRICE,
          direction: 1
        }
      ];
      if (orderBy) {
        // sort by the given orderBy field
        sortBy = [
          {
            prop: SORT_BY_MAP[orderBy],
            direction
          }
        ];
      }
      if (orderBy === SORT_BY_MAP.HOURS_PLAYED) {
        sortRecommendationsByPlaytime(edges, sortOrder);
      } else {
        sortRecommendations(sortBy, edges);
      }

      // return compiled recommendations
      return {
        pageInfo: {
          totalCount: uniqueGameDetails.length
        },
        userDetails,
        edges: first ? edges.slice(0, first) : edges
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

module.exports = { resolvers, PLAYER_FILTERS_KEYS, SORT_BY_MAP };
