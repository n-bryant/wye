const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash.get");
const uniq = require("lodash.uniq");
const { sortRecommendations } = require("../../lib/util/sortRecommendations");
const wyeGamesReducer = require("../reducers/wyeGameReducer");

const EXCLUDED_PUBLISHER_KEYS = [
  "Inc.",
  "Inc",
  "LLC",
  "Lttd.",
  "(none)",
  "LTD.",
  "a.s.",
  "-",
  "LTD",
  "none"
];

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
   * Retrieves a list of genres associated with Wye's games list
   * @returns {Array}
   */
  async getGenres() {
    // fetch game data
    const data = await this.post("games/");
    const games = get(data, "games", []);

    // aggregate list of genres
    let genres = [];
    for (const game of games) {
      genres = genres.concat(game.genres.split(", "));
    }

    // return unique / valid values
    return uniq(genres.filter(genre => genre.length > 0));
  }

  /**
   * Retrieves a list of publishers associated with Wye's games list
   * @param {String} filter
   * @returns {Array}
   */
  async getPublishers(filter) {
    // fetch game data
    const data = await this.post("games/");
    const games = get(data, "games", []);

    // aggregate list of publishers
    let publishers = [];
    for (const game of games) {
      publishers = publishers.concat(
        game.publishers.split(", ").map(publisher => publisher.trim())
      );
    }

    // filter for unique and valid values, then sort alphabetically
    return uniq(
      publishers
        .filter(publisher => {
          let valid = true;
          // empty string or an excluded key
          if (
            publisher.length < 1 ||
            EXCLUDED_PUBLISHER_KEYS.some(
              key => publisher.toUpperCase() === key.toUpperCase()
            )
          ) {
            valid = false;
          }

          // text filtering
          if (filter) {
            const matcher = new RegExp(filter.toUpperCase(), "g");
            if (!matcher.test(publisher.toUpperCase())) {
              valid = false;
            }
          }

          return valid;
        })
        .sort(function(a, b) {
          if (a.toUpperCase() < b.toUpperCase()) {
            return -1;
          }

          if (a.toUpperCase() > b.toUpperCase()) {
            return 1;
          }

          return 0;
        })
    );
  }

  /**
   * Retrieves the path for the most popular game's background image
   * @returns {String}
   */
  async getMostPopularBackground() {
    // fetch game data
    const data = await this.post("games/", {
      orderBy: "playtime2Weeks_DESC",
      first: 1
    });
    const games = get(data, "games");
    return games && games.length ? get(data, "games")[0].backgroundImage : "";
  }

  /**
   * Returns a list of the most popular publishers and their top titles
   * @returns {Array}
   */
  async getTopTitleForMostPopularPublishers() {
    // fetch game data
    const data = await this.post("games/");
    const games = get(data, "games", []);

    let publishers = {};
    // aggregate the occurrences of each publisher in the games list
    for (let i = 0; i < games.length; i++) {
      // check that the game has publishers
      if (games[i].publishers && games[i].publishers.length) {
        // iterate over a game's publishers and either:
        // - add it to the list of publishers if it isn't in the list yet
        // - increment the publisher's count if it exists in the list
        const gamePublishers = games[i].publishers.split(", ");
        for (let j = 0; j < gamePublishers.length; j++) {
          if (!publishers[gamePublishers[j]]) {
            publishers[gamePublishers[j]] = 1;
          } else {
            publishers[gamePublishers[j]]++;
          }
        }
      }
    }

    // sort for the top 4 publishers with the biggest library desc,
    // then get the publisher's most popular game
    // - excluding INC and LLC
    const mostPopularTitles = Object.keys(publishers)
      .filter(key => !EXCLUDED_PUBLISHER_KEYS.some(item => item === key))
      .sort((a, b) => publishers[b] - publishers[a])
      .slice(0, 8)
      .map(publisher => {
        const topTitle = sortRecommendations(
          [
            {
              prop: "playtime2Weeks",
              direction: -1
            }
          ],
          games.filter(
            game => game.publishers && game.publishers.indexOf(publisher) !== -1
          )
        )[0];
        return {
          publisher,
          topTitle: wyeGamesReducer(topTitle)
        };
      });
    return mostPopularTitles.length ? mostPopularTitles : [];
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
      games = games.map(game => wyeGamesReducer(game));

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
        if (gamePropertyKey === "tags") {
          games = games.filter(game =>
            game[gamePropertyKey].some(item => {
              return filters[filterKeys[i]].indexOf(item.name) !== -1;
            })
          );
        } else {
          games = games.filter(game =>
            game[gamePropertyKey].some(
              item => filters[filterKeys[i]].indexOf(item) !== -1
            )
          );
        }
      }
    }
    return games;
  }
}

module.exports = WyeGamesAPI;
