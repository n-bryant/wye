const {
  gameReducer,
  getPriceDetails,
  getHasControllerSupport,
  getPlatforms,
  getScreenshots,
  getVideos
} = require("../../src/reducers/gameReducer");
const {
  GAME_IMAGES_BASE_URL,
  GAME_PARTIAL_CONTROLLER_SUPPORT,
  GAME_FULL_CONTROLLER_SUPPORT
} = require("../../src/reducers/constants");

describe("gameReducer", () => {
  const mockedGame = {
    stam_appid: "1",
    name: "foo",
    is_free: false,
    release_date: {
      date: 1111111
    },
    short_description: "foo",
    price_overview: {
      discount_percent: 0,
      initial_formatted: "$3.50",
      final_formatted: "$3.50",
      final: 350
    },
    developers: ["a", "b"],
    publishers: ["a", "b"],
    website: "https://foo.com",
    platforms: {
      windows: true,
      macOs: false
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
    header_image: "image/path",
    background: "background/path",
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
        },
        highlight: false
      }
    ]
  };

  it("should map the provided game's steam_appid to the id property", () => {
    expect(gameReducer(mockedGame).id).toBe(mockedGame.steam_appid);
  });

  it("should map the provided game's name to the name property", () => {
    expect(gameReducer(mockedGame).name).toBe(mockedGame.name);
  });

  it("should map the provided game's release_date date value to the releaseDate property", () => {
    expect(gameReducer(mockedGame).releaseDate).toBe(
      mockedGame.release_date.date
    );
  });

  it("should map the provided game's short_description to the shortDescription property", () => {
    expect(gameReducer(mockedGame).shortDescription).toBe(
      mockedGame.short_description
    );
  });

  it("should call getPriceDetails to retrieve the price details for the game", () => {
    expect(gameReducer(mockedGame).price).toMatchObject(
      getPriceDetails(mockedGame)
    );
  });

  it("should call getHasControllerSupport to retrieve whether the game has controller support or not", () => {
    expect(gameReducer(mockedGame).controllerSupport).toBe(
      getHasControllerSupport(mockedGame.categories)
    );
  });

  it("should map the provided game's developers property to the developers property", () => {
    expect(gameReducer(mockedGame).developers).toBe(mockedGame.developers);
  });

  it("should map the provided game's publishers property to the publishers property", () => {
    expect(gameReducer(mockedGame).publishers).toBe(mockedGame.publishers);
  });

  it("should map the provided game's website property to the website property", () => {
    expect(gameReducer(mockedGame).website).toBe(mockedGame.website);
  });

  it("should call getPlatforms to retrieve what platforms the game supports", () => {
    expect(gameReducer(mockedGame).platforms).toEqual(
      getPlatforms(mockedGame.platforms)
    );
  });

  it("should map the provided game's metacritic details to the metacritic score and reviewsPageUrl properties", () => {
    expect(gameReducer(mockedGame).metacritic).toMatchObject({
      score: mockedGame.metacritic.score,
      reviewsPageUrl: mockedGame.metacritic.url
    });
  });

  it("should map the provided game's categories property to the categories property", () => {
    expect(gameReducer(mockedGame).categories).toBe(mockedGame.categories);
  });

  it("should map the provided game's genres property to the genres property", () => {
    expect(gameReducer(mockedGame).genres).toBe(mockedGame.genres);
  });

  it("should map the provided game's header_image property to the headerImageUrl property", () => {
    expect(gameReducer(mockedGame).headerImageUrl).toBe(
      mockedGame.header_image
    );
  });

  it("should build a hero image url based on the game's steam_appid property", () => {
    expect(gameReducer(mockedGame).heroImageUrl).toBe(
      `${GAME_IMAGES_BASE_URL}${mockedGame["steam_appid"]}/library_hero.jpg`
    );
  });

  it("should build a logo image url based on the game's steam_appid property", () => {
    expect(gameReducer(mockedGame).logoImageUrl).toBe(
      `${GAME_IMAGES_BASE_URL}${mockedGame["steam_appid"]}/logo.png`
    );
  });

  it("should map the provided game's background property to the backgroundImageUrl property", () => {
    expect(gameReducer(mockedGame).backgroundImageUrl).toBe(
      mockedGame.background
    );
  });

  it("should call getScreenshots to get the game's screenshots data", () => {
    expect(gameReducer(mockedGame).screenshots).toEqual(
      getScreenshots(mockedGame.screenshots)
    );
  });

  it("should call getVideos to get the game's videos data", () => {
    expect(gameReducer(mockedGame).videos).toEqual(
      getVideos(mockedGame.movies)
    );
  });

  describe("getPriceDetails", () => {
    it("should return an object with a truthy freeToPlay value if no price_overview is provided", () => {
      const freeGame = {
        is_free: true
      };
      expect(getPriceDetails(freeGame)).toMatchObject({
        freeToPlay: true
      });
    });

    it("should build a formatted price object if price_overview is provided", () => {
      const priceOverview = mockedGame.price_overview;
      expect(getPriceDetails(mockedGame)).toMatchObject({
        freeToPlay: mockedGame.is_free,
        onSale: false,
        discountPercentage: priceOverview.discount_percent,
        initialFormatted: priceOverview.initial_formatted,
        finalFormatted: priceOverview.final_formatted,
        finalRaw: priceOverview.final
      });
    });

    it("should set the returned onSale value based on whether the provided game's discount_percent value is greater than 0", () => {
      const mockedPriceOverview = {
        is_free: false,
        price_overview: {
          discount_percent: 50,
          initial_formatted: "$5.00",
          final_formatted: "$2.50"
        }
      };
      expect(getPriceDetails(mockedPriceOverview).onSale).toBeTruthy();
    });
  });

  describe("getHasControllerSupport", () => {
    it("should return a truthy value if the game has partial or full controller support", () => {
      const partialControllerGame = [
        {
          description: GAME_PARTIAL_CONTROLLER_SUPPORT
        }
      ];
      const fullControllerGame = [
        {
          description: GAME_FULL_CONTROLLER_SUPPORT
        }
      ];
      expect(getHasControllerSupport(partialControllerGame)).toBeTruthy();
      expect(getHasControllerSupport(fullControllerGame)).toBeTruthy();
    });

    it("should return a falsy value if the game does not have controller support", () => {
      const nonControllerGame = [
        {
          description: "no controller support"
        }
      ];
      expect(getHasControllerSupport(nonControllerGame)).toBeFalsy();
    });
  });

  describe("getPlatforms", () => {
    it("should strip the provided game's platforms to only platforms that are supported", () => {
      const expectedFilteredPlatforms = ["windows"];
      expect(getPlatforms(mockedGame.platforms)).toEqual(
        expectedFilteredPlatforms
      );
    });
  });

  describe("getScreenshots", () => {
    it("should format the provided screenshot data into a shape that matches the schema", () => {
      expect(getScreenshots(mockedGame.screenshots)).toEqual[
        {
          thumbnailUrl: mockedGame.screenshots[0].path_thumbnail,
          fullsizeUrl: mockedGame.screenshots[0].path_full
        }
      ];
    });
  });

  describe("getVideos", () => {
    it("should format the provided videos data into a shape that matches the schema", () => {
      expect(getVideos(mockedGame.movies)).toEqual[
        {
          title: mockedGame.screenshots[0].title,
          thumbnailUrl: mockedGame.movies[0].thumbnail,
          fullsizeUrl: mockedGame.movies[0].webm.max
        }
      ];
    });
  });
});
