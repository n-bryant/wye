const SteamPlayerServiceAPI = require("../../src/dataSources/SteamPlayerServiceAPI");
const { userGameReducer } = require("../../src/reducers/userGameReducer");
const {
  STEAM_PLAYER_SERVICE_API_BASE_URL,
  STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT,
  STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT,
  STEAM_PLAYER_SERVICE_RECENT_PLAYED_COUNT
} = require("../../src/dataSources/constants");

describe("SteamPlayerServiceAPI", () => {
  process.env.API_KEY = "foo";
  const playerId = "1";
  const playerIds = ["1", "2", "3"];
  const gameId = "1";
  const nonExistentGameId = "2";
  const mockedGamesResponse = {
    response: {
      games: [
        {
          appid: "1",
          name: "foo",
          playtime_forever: 0,
          img_icon_url: 11111111,
          img_logo_url: "bar"
        }
      ]
    }
  };

  let steamPlayerServiceAPI;
  beforeEach(() => {
    steamPlayerServiceAPI = new SteamPlayerServiceAPI();
    steamPlayerServiceAPI.get = jest.fn();
  });

  afterEach(() => {
    steamPlayerServiceAPI.get.mockReset();
  });

  it(`should have a baseURL property matching: ${STEAM_PLAYER_SERVICE_API_BASE_URL}`, () => {
    expect(steamPlayerServiceAPI.baseURL).toBe(
      STEAM_PLAYER_SERVICE_API_BASE_URL
    );
  });

  describe("getOwnedGamesByPlayerId", () => {
    it("should have a getOwnedGamesByPlayerId method", () => {
      expect(steamPlayerServiceAPI.getOwnedGamesByPlayerId).toBeDefined();
    });

    it(`should have the getOwnedGamesByPlayerId method call to ${STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT}
    with a key query paramater of process.env.API_KEY and a steamid parameter matching the passed playerId`, () => {
      steamPlayerServiceAPI.getOwnedGamesByPlayerId(playerId);
      expect(steamPlayerServiceAPI.get).toBeCalledWith(
        STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT,
        {
          key: process.env.API_KEY,
          steamid: playerId,
          include_appinfo: true,
          include_played_free_games: true
        }
      );
    });

    it("should return a list of games matching the schema for GameBasicInfo", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const data = await steamPlayerServiceAPI.getOwnedGamesByPlayerId(
        playerId
      );
      expect(data).toEqual([
        userGameReducer(mockedGamesResponse.response.games[0])
      ]);
    });
  });

  describe("getRecentlyPlayedGamesByPlayerId", () => {
    it("should have a getRecentlyPlayedGamesByPlayerId method", () => {
      expect(
        steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerId
      ).toBeDefined();
    });

    it(`should have the getRecentlyPlayedGamesByPlayerId method call to ${STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT}
    with a key query paramater of process.env.API_KEY and a steamid parameter matching the passed playerId`, () => {
      steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerId(playerId);
      expect(steamPlayerServiceAPI.get).toBeCalledWith(
        STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT,
        {
          key: process.env.API_KEY,
          steamid: playerId,
          count: STEAM_PLAYER_SERVICE_RECENT_PLAYED_COUNT
        }
      );
    });

    it("should return a list of games matching the schema for GameBasicInfo", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const data = await steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerId(
        playerId
      );
      expect(data).toEqual([
        userGameReducer(mockedGamesResponse.response.games[0])
      ]);
    });
  });

  describe("getOwnedGamesByPlayerIds", () => {
    it("should have a getOwnedGamesByPlayerIds method", () => {
      expect(steamPlayerServiceAPI.getOwnedGamesByPlayerIds).toBeDefined();
    });

    it(`should call to ${STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT} to retrieve player data`, async () => {
      await steamPlayerServiceAPI.getOwnedGamesByPlayerIds(playerIds);
      expect(steamPlayerServiceAPI.get).toHaveBeenCalledTimes(3);
    });

    it("should return a games by player ID that includes the game ID and playtime", async () => {
      const mockGamesList = [
        {
          appid: 10,
          playtime_forever: 42
        }
      ];
      steamPlayerServiceAPI.get.mockImplementationOnce(() =>
        Promise.resolve({
          response: {
            games: mockGamesList
          }
        })
      );
      const expectedResult = {
        [playerId]: {
          games: [
            {
              id: mockGamesList[0].appid.toString(),
              hoursPlayed: parseFloat(
                (mockGamesList[0].playtime_forever / 60).toFixed(2),
                10
              )
            }
          ]
        }
      };
      const result = await steamPlayerServiceAPI.getOwnedGamesByPlayerIds([
        playerId
      ]);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getOwnsGame", () => {
    it("should have a getOwnsGame method", () => {
      expect(steamPlayerServiceAPI.getOwnsGame).toBeDefined();
    });

    it(`should call to ${STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT} with the API key, a steamid matching the playerId, include_appinfo false, and include_played_free_games true`, () => {
      steamPlayerServiceAPI.getOwnsGame(playerId);
      expect(steamPlayerServiceAPI.get).toBeCalledWith(
        STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT,
        {
          key: process.env.API_KEY,
          steamid: playerId,
          include_appinfo: false,
          include_played_free_games: true
        }
      );
    });

    it("should return a truthy value if the player owns the game", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const response = await steamPlayerServiceAPI.getOwnsGame(
        playerId,
        gameId
      );
      expect(response).toBeTruthy();
    });

    it("should return a falsy value if the player owns the game", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const response = await steamPlayerServiceAPI.getOwnsGame(
        playerId,
        nonExistentGameId
      );
      expect(response).toBeFalsy();
    });
  });

  describe("getUserPlaytimeForGameByGameId", () => {
    it("should have a getUserPlaytimeForGameByGameId method", () => {
      expect(
        steamPlayerServiceAPI.getUserPlaytimeForGameByGameId
      ).toBeDefined();
    });

    it(`should call to ${STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT} with the API key, a steamid matching the playerId, include_appinfo true, and include_played_free_games true`, () => {
      steamPlayerServiceAPI.getUserPlaytimeForGameByGameId(playerId);
      expect(steamPlayerServiceAPI.get).toBeCalledWith(
        STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT,
        {
          key: process.env.API_KEY,
          steamid: playerId,
          include_appinfo: true,
          include_played_free_games: true
        }
      );
    });

    it("should return a 0 playtime value if the user doesn't own the provided game", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const response = await steamPlayerServiceAPI.getUserPlaytimeForGameByGameId(
        playerId,
        nonExistentGameId
      );
      expect(response).toMatchObject({
        userId: playerId,
        playtime: 0
      });
    });

    it("should map the provided game's playtime_forever value to the response if the game is owned by the user", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const response = await steamPlayerServiceAPI.getUserPlaytimeForGameByGameId(
        playerId,
        gameId
      );
      expect(response).toMatchObject({
        userId: playerId,
        playtime: mockedGamesResponse.response.games[0].playtime_forever
      });
    });
  });

  describe("getHasRecentlyPlayedGameByGameId", () => {
    it("should have a getHasRecentlyPlayedGameByGameId method", () => {
      expect(
        steamPlayerServiceAPI.getHasRecentlyPlayedGameByGameId
      ).toBeDefined();
    });

    it(`should call ${STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT} with the API key and a player ID`, () => {
      steamPlayerServiceAPI.getHasRecentlyPlayedGameByGameId(playerId);
      expect(steamPlayerServiceAPI.get).toBeCalledWith(
        STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT,
        {
          key: process.env.API_KEY,
          steamid: playerId
        }
      );
    });

    it("should return a truthy value if the player has recently played the game", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const response = await steamPlayerServiceAPI.getHasRecentlyPlayedGameByGameId(
        playerId,
        gameId
      );
      expect(response).toBeTruthy();
    });

    it("should return a falsy value if the player has not recently played the game", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const response = await steamPlayerServiceAPI.getHasRecentlyPlayedGameByGameId(
        playerId,
        nonExistentGameId
      );
      expect(response).toBeFalsy();
    });
  });

  describe("getRecentlyPlayedGamesByPlayerIds", () => {
    it("should have a getRecentlyPlayedGamesByPlayerIds method", () => {
      expect(
        steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerIds
      ).toBeDefined();
    });

    it(`should call to ${STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT} to retrieve player data`, async () => {
      await steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerIds(playerIds);
      expect(steamPlayerServiceAPI.get).toHaveBeenCalledTimes(3);
    });

    it("should return a list of recently played games by player ID", async () => {
      steamPlayerServiceAPI.get.mockImplementationOnce(() =>
        Promise.resolve({
          response: {
            games: [{ appid: 1 }]
          }
        })
      );
      const expectedResult = {
        [playerId]: {
          games: ["1"]
        }
      };
      const result = await steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerIds(
        [playerId]
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
