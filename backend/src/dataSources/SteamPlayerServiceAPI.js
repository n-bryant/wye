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
   * Gets whether a player owns a game from Steam's player service API's GetOwnedGames endpoint
   * @param { String } playerId - The player's ID to check if owned by
   * @param { String } gameId - The game ID to check
   * @returns { Boolean } returns a boolean indicating if the player owns the game
   */
  async getOwnsGame(playerId, gameId) {
    const data = await this.get(STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT, {
      key: process.env.API_KEY,
      steamid: playerId,
      include_appinfo: false,
      include_played_free_games: true
    });

    const ownedGames = get(data, ["response", "games"], []);
    return ownedGames.filter(game => game.appid === gameId).length > 0;
  }

  /**
   * Gets a player's owned games from Steam's player service API's GetOwnedGames endpoint
   * @param { String } playerId - The player's ID to get games for
   * @returns { Array }
   */
  async getOwnedGamesByPlayerId(playerId) {
    const data = await this.get(STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT, {
      key: process.env.API_KEY,
      steamid: playerId,
      include_appinfo: true,
      include_played_free_games: true
    });

    const ownedGames = get(data, ["response", "games"], []);
    return ownedGames.map(game => userGameReducer(game));
  }

  /**
   * Returns a list of games owned by a group of users and the users' playtime for each game
   * @param { Array } playerIds - The users to get owned games for
   * @returns { Object } playerGames - The list of users' games and playtimes
   */
  async getOwnedGamesByPlayerIds(playerIds) {
    let playerGames = {};
    for (const playerId of playerIds) {
      let data = {};
      try {
        // collect user owned game data
        data = await this.get(STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT, {
          key: process.env.API_KEY,
          steamid: playerId,
          include_appinfo: true,
          include_played_free_games: true
        });
      } catch (e) {
        console.log(e);
        return;
      }

      // set user game and playtime for the player ID
      playerGames[playerId] = {
        games: []
      };
      const playerOwnedGames = get(data, ["response", "games"], []);
      for (const game of playerOwnedGames) {
        playerGames[playerId]["games"].push({
          id: game["appid"].toString(),
          hoursPlayed:
            !game.playtime_forever || game.playtime_forever === 0
              ? 0
              : parseFloat((game["playtime_forever"] / 60).toFixed(2), 10)
        });
      }
    }

    return playerGames;
  }

  /**
   * Gets a player's playtime for a game from Steam's player service API's GetOwnedGames endpoint
   * @param { String } userId - The user's ID to retrieve playtime for
   * @param { String } gameId - The game's ID to get playtime for
   * @returns { Object } returns object containing dat matching the UserPlaytime type
   */
  async getUserPlaytimeForGameByGameId(userId, gameId) {
    const data = await this.get(STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT, {
      key: process.env.API_KEY,
      steamid: userId,
      include_appinfo: true,
      include_played_free_games: true
    });

    const ownedGames = get(data, ["response", "games"], []);
    const gameToRetrievePlaytimeFor = ownedGames.find(
      game => game.appId === gameId
    );
    if (
      !gameToRetrievePlaytimeFor ||
      (gameToRetrievePlaytimeFor &&
        !gameToRetrievePlaytimeFor["playtime_forever"])
    ) {
      return {
        userId,
        playtime: 0
      };
    } else {
      return {
        userId,
        playtime: gameToRetrievePlaytimeFor["playtime_forever"]
      };
    }
  }

  /**
   * Gets whether a player has recently played a game from Steam's player service API's GetRecentlyPlayedGames endpoint
   * @param { String } playerId - The player's ID to check if recently played by
   * @param { String } gameId - The game's ID to check
   * @returns { Boolean } returns a boolean indicating if the player has recently played the provided game
   */
  async getHasRecentlyPlayedGameByGameId(playerId, gameId) {
    const data = await this.get(STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT, {
      key: process.env.API_KEY,
      steamid: playerId
    });

    const recentlyPlayedGames = get(data, ["response", "games"], []);
    return recentlyPlayedGames.filter(game => game.appid === gameId).length > 0;
  }

  /**
   * Gets a player's recently played games from Steam's player service API's GetRecentlyPlayedGames endpoint
   * @param { String } playerId - The player's ID to get games for
   * @returns { Array }
   */
  async getRecentlyPlayedGamesByPlayerId(playerId) {
    const data = await this.get(STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT, {
      key: process.env.API_KEY,
      steamid: playerId,
      count: STEAM_PLAYER_SERVICE_RECENT_PLAYED_COUNT
    });

    const recentlyPlayedGames = get(data, ["response", "games"], []);
    return recentlyPlayedGames.map(game => userGameReducer(game));
  }

  /**
   * Gets recently played games from Steam's player service API's GetRecentlyPlayedGames endpoint for a list of players
   * @param { Arra } playerIds - The list of players to get games for
   * @returns { Object } returns list of recently played games by player
   */
  async getRecentlyPlayedGamesByPlayerIds(playerIds) {
    let playerGames = {};
    for (const playerId of playerIds) {
      // collect user recently played game data
      const data = await this.get(STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT, {
        key: process.env.API_KEY,
        steamid: playerId,
        count: STEAM_PLAYER_SERVICE_RECENT_PLAYED_COUNT
      });

      // set user games for the player ID
      playerGames[playerId] = {
        games: []
      };
      const playerOwnedGames = get(data, ["response", "games"], []);
      for (const game of playerOwnedGames) {
        playerGames[playerId]["games"].push(game["appid"].toString());
      }
    }
    return playerGames;
  }
}

module.exports = SteamPlayerServiceAPI;
