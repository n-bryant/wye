/**
 * returns a list of games for users, filtered by the specified filter
 * @param {Array} filterValue
 * @param {Array} gameList
 * @param {Object} gamesByUser
 * @returns {Array}
 */
const applyPlayerFiltersToGameList = (
  filterValue = [],
  gameList = [],
  gamesByUser = {}
) => {
  return gameList.filter(gameId =>
    // iterate over user ids from the filterValue parameter
    Object.keys(gamesByUser)
      .filter(userId => filterValue.includes(userId))
      // filter out games that don't match against each filterValue user's game list
      .every(user =>
        gamesByUser[user].games.some(userGame =>
          // ownedBy game lists structure games as an object with id and playtime properties,
          // whereas, recentlyPlayedBy game lists are simply a list of game id strings
          userGame.id ? userGame.id === gameId : userGame === gameId
        )
      )
  );
};

module.exports = applyPlayerFiltersToGameList;
