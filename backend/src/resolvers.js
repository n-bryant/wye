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
      { userIds, filters, first, after, orderBy, sortOrder },
      { dataSources }
    ) => {
      // 1. get all unique games owned by players from Steam's player service API
      const uniqueOwnedGames = await dataSources.steamPlayerServiceAPI.getUniqueOwnedGamesByPlayerIds(
        userIds
      );

      // 2. get details for each unique game from Wye's support service's API, applying filters, pagination, and sorting
      const uniqueOwnedGamesDetails = await dataSources.wyeGamesAPI.getGamesByGameIds(
        // uniqueOwnedGames
        "10,20,30"
      );
      console.log(uniqueOwnedGamesDetails);

      // 3. return Recommendation for each of the results of the filtered games
      // return {
      //   game: ...,
      //   ownedBy: ...,
      //   recentlyPlayedBy: ...,
      //   playtime: ...
      // }
      return {};
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
