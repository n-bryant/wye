/**
 * returns a list of games for users, filtered by the specified filter
 * @param {String} filterValue
 * @param {Array} userList
 * @param {Array} gameList
 * @returns {Array}
 */
const applyPlayerFiltersToGameList = (
  filterValue,
  userList = [],
  gameList = []
) => {
  let filteredGameList = gameList;
  filteredGameList = filteredGameList.filter(game => {
    let criteriaMet = true;
    for (let i = 0; i < userList.length; i++) {
      if (!userList[filterValue].some(userGame => userGame.id === game)) {
        criteriaMet = false;
        break;
      }
    }
    return criteriaMet;
  });
  return filteredGameList;
};

module.exports = applyPlayerFiltersToGameList;
