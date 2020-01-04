const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash.get");

/**
 * Builds a REST data source for Wye's support service games API
 */
class WyeGamesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.WYE_SUPPORT_URL;
  }

  /**
   * Gets information for a list of games from Wye Support Service's games endpoint
   * @param {Array} gameids
   * @param {Object} filters
   * @returns {Array}
   */
  async getGamesByGameIds(gameids, filters) {
    const data = await this.post("games/", {
      gameids,
      filters
    });
    const games = get(data, "games", []).map(game => ({
      ...game,
      developers: game.developers.split(", "),
      publishers: game.publishers.split(", "),
      genres: game.genres.split(", "),
      tags: game.tags.split(", ")
    }));
    return games;
  }
}

module.exports = WyeGamesAPI;
