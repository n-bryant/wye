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
  return gameList.filter(game => {
    let criteriaMet = false;
    for (let i = 0; i < filterValue.length; i++) {
      const user = gamesByUser[filterValue[i]];
      if (user && user["games"] && user["games"].indexOf(game) !== -1) {
        criteriaMet = true;
        break;
      }
    }
    return criteriaMet;
  });
};

module.exports = applyPlayerFiltersToGameList;
