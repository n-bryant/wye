const uniq = require("lodash.uniq");

const EXCLUDED_PUBLISHER_KEYS = [
  "Inc.",
  "Inc",
  "LLC",
  "LLC.",
  "LLC)",
  "Lttd.",
  "(none)",
  "LTD.",
  "a.s.",
  "-",
  "LTD",
  "none"
];

function getFilterOptions(gameList) {
  let filterOptions = {
    publishers: [],
    developers: [],
    tags: [],
    genres: []
  };

  for (const game of gameList) {
    // compile category items, removing invalid options
    for (const key of ["publishers", "developers", "genres", "tags"]) {
      let categoryList = game[key].map(value => value.trim());
      if (key === "publishers" || key === "developers") {
        categoryList = categoryList.filter(
          value =>
            !EXCLUDED_PUBLISHER_KEYS.some(
              item => item.toUpperCase() === value.toUpperCase()
            )
        );
      }
      categoryList = categoryList.filter(value => value.length > 0);
      filterOptions[key] = filterOptions[key].concat(categoryList);
    }

    // compile numerical options
    for (const key of [
      "userRating_min",
      "userRating_max",
      "discount_min",
      "discount_max",
      "finalPrice_min",
      "finalPrice_max"
    ]) {
      if (
        ["userRating_min", "discount_min", "finalPrice_min"].some(
          item => item === key
        )
      ) {
        const gameKey = key.slice(0, key.match(/_min/).index);
        if (
          typeof filterOptions[key] === "undefined" ||
          game[gameKey] < filterOptions[key]
        ) {
          filterOptions[key] = game[gameKey];
        }
      }
      if (
        ["userRating_max", "discount_max", "finalPrice_max"].some(
          item => item === key
        )
      ) {
        const gameKey = key.slice(0, key.match(/_max/).index);
        if (
          typeof filterOptions[key] === "undefined" ||
          game[gameKey] > filterOptions[key]
        ) {
          filterOptions[key] = game[gameKey];
        }
      }
    }
  }

  // filter the compiled category types for unique items and sort by name
  for (const key of ["publishers", "developers", "genres", "tags"]) {
    filterOptions[key] = uniq(filterOptions[key]).sort((a, b) => {
      if (a.toUpperCase() < b.toUpperCase()) {
        return -1;
      }

      if (a.toUpperCase() > b.toUpperCase()) {
        return 1;
      }

      return 0;
    });
  }

  return filterOptions;
}

module.exports = { getFilterOptions, EXCLUDED_PUBLISHER_KEYS };
