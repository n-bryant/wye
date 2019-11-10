const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash.get");

class SteamUsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://api.steampowerd.com/ISteamUser/";
  }

  async getUserSummaryById(userId) {
    const data = await this.get("GetPlayerSummaries/v0002", {
      key: "XXXXXXXXXXXXXX",
      steamids: userId
    });
    return data;
  }
}

module.exports = SteamUsersAPI;
