const SteamNewsAPI = require("../../src/dataSources/SteamNewsAPI");
const { articleReducer } = require("../../src/reducers/articleReducer");
const {
  STEAM_NEWS_API_BASE_URL,
  STEAM_NEWS_API_ARTICLES_ENDPOINT,
  STEAM_NEWS_API_ARTICLE_COUNT
} = require("../../src/dataSources/constants");

describe("SteamNewsAPI", () => {
  const gameId = "1";
  const mockedArticlesResponse = {
    appnews: {
      newsitems: [
        {
          gid: "1",
          appid: "2",
          date: 11111111,
          title: "foo",
          url: "bar",
          contents: "foobar"
        }
      ]
    }
  };

  let steamNewsAPI;
  beforeEach(() => {
    steamNewsAPI = new SteamNewsAPI();
    steamNewsAPI.get = jest.fn();
  });

  afterEach(() => {
    steamNewsAPI.get.mockReset();
  });

  it(`should have a baseURL property matching: ${STEAM_NEWS_API_BASE_URL}`, () => {
    expect(steamNewsAPI.baseURL).toBe(STEAM_NEWS_API_BASE_URL);
  });

  describe("getNewsForGameById", () => {
    it("should have a getNewsForGameById method", () => {
      expect(steamNewsAPI.getNewsForGameById).toBeDefined();
    });

    it(`should have the getNewsForGameById method call to ${STEAM_NEWS_API_ARTICLES_ENDPOINT}
    with an appId query paramater matching the provided game ID and a count parameter matching ${STEAM_NEWS_API_ARTICLE_COUNT}`, () => {
      steamNewsAPI.getNewsForGameById(gameId);
      expect(steamNewsAPI.get).toBeCalledWith(
        STEAM_NEWS_API_ARTICLES_ENDPOINT,
        {
          appId: gameId,
          count: STEAM_NEWS_API_ARTICLE_COUNT
        }
      );
    });

    it("should build edges for the returned articles object by using the articleReducer", async () => {
      steamNewsAPI.get.mockReturnValueOnce(mockedArticlesResponse);
      const data = await steamNewsAPI.getNewsForGameById(gameId);
      const mockedEdges = mockedArticlesResponse.appnews.newsitems.map(
        article => ({
          node: articleReducer(article)
        })
      );
      expect(data).toMatchObject({
        edges: mockedEdges
      });
    });
  });
});
