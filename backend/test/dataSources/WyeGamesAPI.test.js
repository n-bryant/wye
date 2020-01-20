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

    it("should have the getGamesByGameIds apply additional string includes if such filters are provided", async () => {
      const game1 = {
        name: "1",
        developers: "foo",
        publishers: "",
        genres: "",
        tags: ""
      };
      const game2 = {
        name: "2",
        developers: "bar",
        publishers: "",
        genres: "",
        tags: ""
      };
      wyeGamesAPI.post.mockReturnValueOnce({
        games: [game1, game2]
      });
      const filters = {
        developers_in: "foo"
      };
      const result = await wyeGamesAPI.getGamesByGameIds(gameIds, filters);
      expect(result).toEqual([
        {
          ...game1,
          developers: [game1.developers],
          publishers: [game1.publishers],
          genres: [game1.genres],
          tags: [game1.tags]
        }
      ]);
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

  describe("compileNewFiltersObject", () => {
    const origObj = {
      foo: "bar",
      fizz: "buzz"
    };
    it("should have a compileNewFiltersObject method", () => {
      expect(wyeGamesAPI.compileNewFiltersObject).toBeDefined();
    });

    it("should return an empty object if no keys are provided", () => {
      expect(wyeGamesAPI.compileNewFiltersObject(origObj)).toEqual({});
    });

    it("should return a new object with the specified keys from the original object if provided a list of keys", () => {
      const keyList = [Object.keys(origObj)[0]];
      const expectedResultWithKeys = {
        [Object.keys(origObj)[0]]: origObj[Object.keys(origObj)[0]]
      };
      expect(wyeGamesAPI.compileNewFiltersObject(origObj, keyList)).toEqual(
        expectedResultWithKeys
      );
    });
  });

  describe("applyStringArrayIncludesFilters", () => {
    it("should have a applyStringArrayIncludesFilters method", () => {
      expect(wyeGamesAPI.applyStringArrayIncludesFilters).toBeDefined();
    });

    it("should return the original games list if no filters are provided", () => {
      const games = [];
      expect(wyeGamesAPI.applyStringArrayIncludesFilters(games, {})).toEqual(
        games
      );
    });

    it("should not apply a filter if it isn't one of the STRING_INCLUDES_FILTERS_MAP filter keys", () => {
      const games = [
        {
          name: "foo"
        },
        {
          name: "bar"
        }
      ];
      expect(
        wyeGamesAPI.applyStringArrayIncludesFilters(games, {
          name_in: "foo"
        })
      ).toEqual(games);
    });

    it("should filter out games that don't meet a given valid STRING_INCLUDES_FILTERS_MAP filter criteria", () => {
      const filters = {
        genres_in: "genre1",
        tags_in: "tag1",
        publishers_in: "pub1",
        developers_in: "dev1"
      };
      const games = [
        {
          name: "1",
          genres: ["genre1"],
          tags: ["tag1"],
          publishers: ["pub1"],
          developers: ["dev1"]
        },
        {
          name: "2",
          genres: ["genre1", "genre2"],
          tags: ["tag1"],
          publishers: ["pub2"],
          developers: ["dev2"]
        },
        {
          name: "3",
          genres: ["genre3"],
          tags: ["tag1", "tag2"],
          publishers: ["pub1"],
          developers: ["dev1"]
        }
      ];
      const expectedResult = [
        {
          developers: ["dev1"],
          genres: ["genre1"],
          name: "1",
          publishers: ["pub1"],
          tags: ["tag1"]
        }
      ];
      expect(
        wyeGamesAPI.applyStringArrayIncludesFilters(games, filters)
      ).toEqual(expectedResult);
    });
  });
});
