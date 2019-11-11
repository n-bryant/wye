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

    it("should build edges for the returned games object by using the userGameReducer", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const data = await steamPlayerServiceAPI.getOwnedGamesByPlayerId(
        playerId
      );
      expect(data).toMatchObject({
        edges: [
          { node: userGameReducer(mockedGamesResponse.response.games[0]) }
        ]
      });
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

    it("should build edges for the returned games object by using the userGameReducer", async () => {
      steamPlayerServiceAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const data = await steamPlayerServiceAPI.getRecentlyPlayedGamesByPlayerId(
        playerId
      );
      expect(data).toMatchObject({
        edges: [
          { node: userGameReducer(mockedGamesResponse.response.games[0]) }
        ]
      });
    });
  });
});
