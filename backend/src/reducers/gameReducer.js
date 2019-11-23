const {
  GAME_IMAGES_BASE_URL,
  GAME_PARTIAL_CONTROLLER_SUPPORT,
  GAME_FULL_CONTROLLER_SUPPORT
} = require("./constants");

/**
 * Shapes the price data received into an object that matches the schema
 * @param { Object } data - price data object
 * @returns { Object } price - a price object matching the schema for the Price type
 */
const getPriceDetails = ({ is_free, price_overview }) => {
  if (price_overview) {
    const {
      discount_percent,
      initial_formatted,
      final_formatted,
      final
    } = price_overview;
    return {
      freeToPlay: is_free,
      onSale: discount_percent > 0,
      discountPercentage: discount_percent,
      initialFormatted: initial_formatted,
      finalFormatted: final_formatted,
      finalRaw: final
    };
  }
  return {
    freeToPlay: true
  };
};

/**
 * Searches a game's categories to determine if it has controller support
 * @param { Array } categories - An object containing details about what categories the game fits into
 * @returns { Boolean } controllerSupport - Whether the game has controller support
 */
const getHasControllerSupport = categories => {
  return (
    categories.filter(
      category =>
        category.description === GAME_PARTIAL_CONTROLLER_SUPPORT ||
        category.description === GAME_FULL_CONTROLLER_SUPPORT
    ).length > 0
  );
};

/**
 * Filters platforms object into a list of only the platforms supported by the game
 * @param { Object } platforms - what platforms the game supports
 * @returns { Array } platforms - a list of platforms, omitting platforms with a falsy value
 */
const getPlatforms = platforms => {
  return Object.keys(platforms).filter(key => platforms[key]);
};

/**
 * Returns a formatted list of screenshots
 * @param { Array } screenshots - a list of screenshots
 * @returns { Array } screenshots - a list of formatted screenshots
 */
const getScreenshots = screenshots =>
  screenshots.map(screenshot => ({
    id: screenshot["id"],
    thumbnailUrl: screenshot["path_thumbnail"],
    fullsizeUrl: screenshot["path_full"]
  }));

/**
 * Returns a formatted list of videos
 * @param { Array } videos - a list of videos
 * @returns { Array } videos - a list of formatted videos
 */
const getVideos = videos =>
  videos.map(video => ({
    id: video["id"],
    title: video["name"],
    thumbnailUrl: video["thumbnail"],
    fullsizeUrl: video["webm"]["max"]
  }));

/**
 * Transforms a game received from Steam's appdetails API
 * into a game object that matches the schema
 * @param { Object } game - game data from Steam's appdetails API
 * @returns { Object } game - see GameDetails definition in typeDefs
 */
const gameReducer = game => {
  return {
    id: game["steam_appid"],
    releaseDate: game["release_date"]["date"],
    shortDescription: game["short_description"],
    price: getPriceDetails(game),
    controllerSupport: getHasControllerSupport(game["categories"]),
    developers: game["developers"],
    publishers: game["publishers"],
    website: game["website"],
    platforms: getPlatforms(game["platforms"]),
    metacritic: {
      score: game["metacritic"]["score"],
      reviewsPageUrl: game["metacritic"]["url"]
    },
    categories: game["categories"],
    genres: game["genres"],
    headerImageUrl: game["header_image"],
    heroImageUrl: `${GAME_IMAGES_BASE_URL}${
      game["steam_appid"]
    }/library_hero.jpg`,
    logoImageUrl: `${GAME_IMAGES_BASE_URL}${game["steam_appid"]}/logo.png`,
    backgroundImageUrl: game["background"],
    screenshots: getScreenshots(game["screenshots"]),
    videos: getVideos(game["movies"])
  };
};

module.exports = {
  gameReducer,
  getPriceDetails,
  getHasControllerSupport,
  getPlatforms,
  getScreenshots,
  getVideos
};
