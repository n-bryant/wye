const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash.get");
const {
  STEAM_NEWS_API_BASE_URL,
  STEAM_NEWS_API_ARTICLES_ENDPOINT,
  STEAM_NEWS_API_ARTICLE_COUNT
} = require("./constants");
const { articleReducer } = require("../reducers/articleReducer");

/**
 * Builds a REST data source for Steam's community News API
 * # https://developer.valvesoftware.com/wiki/Steam_Web_API#GetNewsForApp_.28v0002.29
 */
class SteamNewsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = STEAM_NEWS_API_BASE_URL;
  }

  /**
   * Gets a game's news information from Steam's news API's GetNewsForApp endpoint
   * @param { String } gameId - The game's ID to get articles for
   * @returns { Object } articles - Object containing Article object edges matching the schema for the Article type
   */
  async getNewsForGameById(gameId) {
    const data = await this.get(STEAM_NEWS_API_ARTICLES_ENDPOINT, {
      appId: gameId,
      count: STEAM_NEWS_API_ARTICLE_COUNT
    });
    const articles = get(data, ["appnews", "newsitems"], []);
    const edges = articles.map(article => ({
      node: articleReducer(article)
    }));
    return {
      edges
    };
  }
}

module.exports = SteamNewsAPI;
