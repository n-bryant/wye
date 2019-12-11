const WyeGamesAPI = require("../../src/dataSources/WyeGamesAPI");

process.env.WYE_SUPPORT_URL = "foo";

describe("WyeGamesAPI", () => {
  const gameIds = ["1", "2"];
  let wyeGamesAPI;
  beforeEach(() => {
    wyeGamesAPI = new WyeGamesAPI();
    wyeGamesAPI.get = jest.fn();
  });

  afterEach(() => {
    wyeGamesAPI.get.mockReset();
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
      expect(wyeGamesAPI.get).toBeCalledWith("games/", {
        gameids: gameIds
      });
    });

    it("should have the getGamesByGameIds method return an empty array if no game data is available", async () => {
      wyeGamesAPI.get.mockReturnValueOnce({});
      const data = await wyeGamesAPI.getGamesByGameIds(gameIds);
      expect(data).toEqual([]);
    });

    it("should have the getGamesByGameIds method return a games list when game data is available", async () => {
      const mockedGamesResponse = {
        games: [{ foo: "bar" }, { bar: "foo" }]
      };
      wyeGamesAPI.get.mockReturnValueOnce(mockedGamesResponse);
      const data = await wyeGamesAPI.getGamesByGameIds(gameIds);
      expect(data).toBe(mockedGamesResponse.games);
    });
  });
});
