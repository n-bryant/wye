const WyeGamesAPI = require("../../src/dataSources/WyeGamesAPI");

process.env.WYE_SUPPORT_URL = "foo";

describe("WyeGamesAPI", () => {
  const gameIds = ["1", "2"];
  let wyeGamesAPI;
  beforeEach(() => {
    wyeGamesAPI = new WyeGamesAPI();
    wyeGamesAPI.post = jest.fn();
  });

  afterEach(() => {
    wyeGamesAPI.post.mockReset();
  });

  it(`should have a baseURL property matching: ${process.env.WYE_SUPPORT_URL}`, () => {
    expect(wyeGamesAPI.baseURL).toBe(process.env.WYE_SUPPORT_URL);
  });

  describe("getGamesByGameIds", () => {
    it("should have a getGamesByGameIds method", () => {
      expect(wyeGamesAPI.getGamesByGameIds).toBeDefined();
    });

    it(`should have the getGamesByGameIds method call to games/
    with a gameids parameter matching the provided gameIds`, () => {
      wyeGamesAPI.getGamesByGameIds(gameIds);
      expect(wyeGamesAPI.post).toBeCalledWith("games/", {
        gameids: gameIds
      });
    });

    it("should have the getGamesByGameIds method return an empty array if no game data is available", async () => {
      wyeGamesAPI.post.mockReturnValueOnce({});
      const data = await wyeGamesAPI.getGamesByGameIds(gameIds);
      expect(data).toEqual([]);
    });

    it("should have the getGamesByGameIds method return a games list when game data is available", async () => {
      const mockedGamesResponse = {
        games: [
          {
            developers: "1, 2",
            publishers: "1, 2",
            genres: "1, 2",
            tags: "1, 2"
          }
        ]
      };
      const exprectedResult = [
        {
          developers: ["1", "2"],
          publishers: ["1", "2"],
          genres: ["1", "2"],
          tags: ["1", "2"]
        }
      ];
      wyeGamesAPI.post.mockReturnValueOnce(mockedGamesResponse);
      const data = await wyeGamesAPI.getGamesByGameIds(gameIds);
      expect(data).toEqual(exprectedResult);
    });
  });
});
