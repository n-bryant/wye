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
   * @param {Array} gameIds - The game's ID to get information for
   * @returns {Array}
   */
  async getGamesByGameIds(gameIds) {
    const data = await this.get("games/", {
      gameids: gameIds
    });
    return get(data, "games", []);
  }
}

module.exports = WyeGamesAPI;
