const get = require("lodash.get");

/**
 * sorts a given list of recommendations by their total hours played
 * @param {Array} list
 * @param {String} direction
 * @returns {Array}
 */
const sortRecommendationsByPlaytime = (list, direction) => {
  list.sort((a, b) => {
    return (
      a.node.playtime.reduce((total, val) => total + val.hoursPlayed, 0) -
      b.node.playtime.reduce((total, val) => total + val.hoursPlayed, 0)
    );
  });
  if (direction === "DESC") {
    list.reverse();
  }
  return list;
};

/**
 * sorts a given list of recommendations by one or multiple properties
 * @param {Array} sortBy
 * @param {Array} list
 * @returns {Array}
 */
const sortRecommendations = (sortBy, list) => {
  list.sort((a, b) => {
    let i = 0,
      result = 0;
    while (i < sortBy.length && result === 0) {
      result =
        sortBy[i].direction *
        (get(a, sortBy[i].prop) < get(b, sortBy[i].prop)
          ? -1
          : get(a, sortBy[i].prop) > get(b, sortBy[i].prop)
          ? 1
          : 0);
      i++;
    }
    return result;
  });
  return list;
};

module.exports = { sortRecommendations, sortRecommendationsByPlaytime };
