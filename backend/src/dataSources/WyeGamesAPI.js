const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash.get");

/**
 * Builds a REST data source for Wye's support service games API
 */
class WyeGamesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.WYE_SUPPORT_URL;
    this.STRING_INCLUDES_FILTERS_MAP = {
      genres_in: "genres",
      tags_in: "tags",
      publishers_in: "publishers",
      developers_in: "developers"
    };
  }

  /**
   * Gets information for a list of games from Wye Support Service's games endpoint
   * @param {Array} gameids
   * @param {Object} filters
   * @returns {Array}
   */
  async getGamesByGameIds(gameids, filters) {
    // the string includes filter for Prisma's WhereInputs doesn't function as expected,
    // so filtering on these fields should be done manually
    let stringIncludesFiltersObject,
      nonStringIncludesFiltersObject = {};
    if (filters) {
      const stringIncludesFiltersKeys = Object.keys(filters).filter(key =>
        this.STRING_INCLUDES_FILTERS_MAP.hasOwnProperty(key)
      );
      stringIncludesFiltersObject = this.compileNewFiltersObject(
        filters,
        stringIncludesFiltersKeys
      );
      const nonStringIncludesFiltersKeys = Object.keys(filters).filter(
        key => !this.STRING_INCLUDES_FILTERS_MAP.hasOwnProperty(key)
      );
      nonStringIncludesFiltersObject = this.compileNewFiltersObject(
        filters,
        nonStringIncludesFiltersKeys
      );
    }

    // fetch game data
    const data = await this.post("games/", {
      gameids,
      filters: filters ? nonStringIncludesFiltersObject : undefined
    });
    let games = get(data, "games", []);

    // shape data to fit schema
    if (games.length) {
      games = games.map(game => ({
        ...game,
        developers: game.developers.split(", "),
        publishers: game.publishers.split(", "),
        genres: game.genres.split(", "),
        tags: game.tags.split(", ")
      }));

      if (filters) {
        // apply any additional string array includes filters
        games = this.applyStringArrayIncludesFilters(
          games,
          stringIncludesFiltersObject
        );
      }
    }
    return games;
  }

  /**
   * builds a new object with the specified keys from a provided original object
   * @param {Object} originalObject
   * @param {Array} keyList
   * @returns {Object}
   */
  compileNewFiltersObject(originalObject, keyList) {
    let newObject = {};
    if (keyList) {
      for (let i = 0; i < keyList.length; i++) {
        newObject[keyList[i]] = originalObject[keyList[i]];
      }
    }
    return newObject;
  }

  /**
   * applies string includes filters to a list of games
   * @param {Array} games
   * @param {Object} filters
   * @returns {Array}
   */
  applyStringArrayIncludesFilters(games, filters) {
    const filterKeys = Object.keys(filters);
    // iterate over the provided filters
    for (let i = 0; i < filterKeys.length; i++) {
      // check if the filter key exists in the list of string includes filters map
      if (this.STRING_INCLUDES_FILTERS_MAP.hasOwnProperty(filterKeys[i])) {
        const gamePropertyKey = this.STRING_INCLUDES_FILTERS_MAP[filterKeys[i]];
        // filter out games that do not have matches for the filter values
        games = games.filter(game =>
          game[gamePropertyKey].some(
            item => filters[filterKeys[i]].indexOf(item) !== -1
          )
        );
      }
    }
    return games;
  }
}

module.exports = WyeGamesAPI;
