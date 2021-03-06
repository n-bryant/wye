const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash.get");
const { gameReducer } = require("../reducers/gameReducer");
const {
  STEAM_GAMES_API_BASE_URL,
  STEAM_GAMES_API_GAMES_ENDPOINT
} = require("./constants");

/**
 * Builds a REST data source for Steam's app details API
 */
class SteamGamesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = STEAM_GAMES_API_BASE_URL;
  }

  /**
   * Gets a single game's information from Steam's API's appdetails endpoint
   * @param { String } gameId - The game's ID to get information for
   * @returns { Object } game - a Game object matching the schema for the Game type
   */
  async getGameByGameId(gameId) {
    const data = await this.get(STEAM_GAMES_API_GAMES_ENDPOINT, {
      appids: gameId
    });
    const game = get(data, [gameId, "data"], {});
    const formattedGame = Object.keys(game).length ? gameReducer(game) : {};
    return formattedGame;
  }

  /**
   * Gets the path for a game's highlight trailer from Steam's API's appdetails endpoint
   * @param { String } gameId
   * @returns {String}
   */
  async getGameHighlightTrailer(gameId) {
    const data = await this.get(STEAM_GAMES_API_GAMES_ENDPOINT, {
      appids: gameId
    });
    const gameMovies = get(data, [gameId, "data", "movies"], []);
    const gameHighlightedMovies = gameMovies.filter(movie => movie.highlight);
    return gameHighlightedMovies[0] && gameHighlightedMovies[0].webm["480"]
      ? gameHighlightedMovies[0].webm["480"]
      : "";
  }
}

module.exports = SteamGamesAPI;
