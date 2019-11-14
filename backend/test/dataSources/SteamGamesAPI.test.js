const SteamGamesAPI = require("../../src/dataSources/SteamGamesAPI");
const { gameReducer } = require("../../src/reducers/gameReducer");
const {
  STEAM_GAMES_API_BASE_URL,
  STEAM_GAMES_API_GAMES_ENDPOINT
} = require("../../src/dataSources/constants");

describe("SteamGamesAPI", () => {
  const gameId = "1";
  let steamGamesAPI;
  beforeEach(() => {
    steamGamesAPI = new SteamGamesAPI();
    steamGamesAPI.get = jest.fn();
  });

  afterEach(() => {
    steamGamesAPI.get.mockReset();
  });

  it(`should have a baseURL property matching: ${STEAM_GAMES_API_BASE_URL}`, () => {
    expect(steamGamesAPI.baseURL).toBe(STEAM_GAMES_API_BASE_URL);
  });

  describe("getGameByGameId", () => {
    it("should have a getGameByGameId method", () => {
      expect(steamGamesAPI.getGameByGameId).toBeDefined();
    });

    it(`should have the getGameByGameId method call to ${STEAM_GAMES_API_GAMES_ENDPOINT}
    with an appids parameter matching the provided gameId`, () => {
      steamGamesAPI.getGameByGameId(gameId);
      expect(steamGamesAPI.get).toBeCalledWith(STEAM_GAMES_API_GAMES_ENDPOINT, {
        appids: gameId
      });
    });

    it("should have the getGameByGameId method return an empty object if no game data is available", async () => {
      steamGamesAPI.get.mockReturnValueOnce({});
      const data = await steamGamesAPI.getGameByGameId(gameId);
      expect(data).toMatchObject({});
    });

    it("should have the getGameByGameId method return a formatted game object when game data is available", async () => {
      const mockedGameResponse = {
        [gameId]: {
          data: {
            release_date: {
              date: 1111111
            },
            price_overview: {
              discout_percent: 0,
              initial_formatted: "$3.50",
              final_formatted: "$3.50"
            },
            platforms: {
              windows: true
            },
            metacritic: {
              score: 100,
              url: "https://foo.com"
            },
            categories: [
              {
                id: "1",
                description: "foo"
              }
            ],
            genres: [
              {
                id: "1",
                description: "foo"
              }
            ],
            screenshots: [
              {
                id: 1,
                path_thumbnail: "foo",
                path_full: "foo"
              }
            ],
            movies: [
              {
                id: 1,
                title: "foo",
                thumbnail: "foo",
                webm: {
                  max: "foo"
                }
              }
            ]
          }
        }
      };
      steamGamesAPI.get.mockReturnValueOnce(mockedGameResponse);
      const data = await steamGamesAPI.getGameByGameId(gameId);
      expect(data).toMatchObject(gameReducer(mockedGameResponse[gameId].data));
    });
  });
});
