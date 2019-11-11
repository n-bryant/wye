const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash.get");
require("dotenv").config({ path: "variables.env" });
const { userGameReducer } = require("../reducers/userGameReducer");
const {
  STEAM_PLAYER_SERVICE_API_BASE_URL,
  STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT,
  STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT,
  STEAM_PLAYER_SERVICE_RECENT_PLAYED_COUNT
} = require("./constants");

/**
 * Builds a REST data source for Steam's community Player Service API
 * # https://developer.valvesoftware.com/wiki/Steam_Web_API#GetOwnedGames_.28v0001.29
 * # https://developer.valvesoftware.com/wiki/Steam_Web_API#GetRecentlyPlayedGames_.28v0001.29
 */
class SteamPlayerServiceAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = STEAM_PLAYER_SERVICE_API_BASE_URL;
  }

  /**
   * Gets a player's owned games from Steam's player service API's GetOwnedGames endpoint
   * @param { String } playerId - The player's ID to get games for
   * @returns { Object } returns object containing data matching the UserConnection type
   */
  async getOwnedGamesByPlayerId(playerId) {
    const data = await this.get(STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT, {
      key: process.env.API_KEY,
      steamid: playerId,
      include_appinfo: true,
      include_played_free_games: true
    });

    const ownedGames = get(data, ["response", "games"], []);
    const edges = ownedGames.map(game => ({
      node: userGameReducer(game)
    }));

    return {
      edges
    };
  }

  /**
   * Gets a player's recently played games from Steam's player service API's GetRecentlyPlayedGames endpoint
   * @param { String } playerId - The player's ID to get games for
   * @returns { Object } returns object containing data matching the UserConnection type
   */
  async getRecentlyPlayedGamesByPlayerId(playerId) {
    const data = await this.get(STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT, {
      key: process.env.API_KEY,
      steamid: playerId,
      count: STEAM_PLAYER_SERVICE_RECENT_PLAYED_COUNT
    });

    const recentlyPlayedGames = get(data, ["response", "games"], []);
    const edges = recentlyPlayedGames.map(game => ({
      node: userGameReducer(game)
    }));

    return {
      edges
    };
  }
}

module.exports = SteamPlayerServiceAPI;
