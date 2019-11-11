const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash.get");
require("dotenv").config({ path: "variables.env" });
const {
  STEAM_USERS_API_BASE_URL,
  STEAM_USERS_API_USERS_ENDPOINT
} = require("./constants");
const { userReducer } = require("../reducers/userReducer");

/**
 * Builds a REST data source for Steam's community User API
 * # https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0002.29
 */
class SteamUsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = STEAM_USERS_API_BASE_URL;
  }

  /**
   * Gets a user's information from Steam's user API's GetPlayerSummaries endpoint
   * @param { String } userId - The user's ID to get information for
   * @returns { Object } user - a User object matching the schema for the User type
   */
  async getUserSummaryById(userId) {
    const data = await this.get(STEAM_USERS_API_USERS_ENDPOINT, {
      key: process.env.API_KEY,
      steamids: userId
    });
    const players = get(data, ["response", "players"], []);
    const user = players.length ? userReducer(players[0]) : {};
    return user;
  }
}

module.exports = SteamUsersAPI;
