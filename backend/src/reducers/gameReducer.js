const { GAME_IMAGES_BASE_URL } = require("./constants");

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
      initial,
      final
    } = price_overview;
    return {
      freeToPlay: is_free,
      onSale: discount_percent > 0,
      discountPercentage: discount_percent,
      initialFormatted: initial_formatted,
      finalFormatted: final_formatted,
      initialRaw: initial,
      finalRaw: final
    };
  }
  return {
    freeToPlay: true
  };
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
    name: game["name"],
    releaseDate: game["release_date"]["date"],
    shortDescription: game["short_description"],
    price: getPriceDetails(game),
    controllerSupport: game["controller_support"]
      ? game["controller_support"]
      : null,
    developers: game["developers"],
    publishers: game["publishers"],
    website: game["website"],
    platforms: getPlatforms(game["platforms"]),
    requirements: game["pc_requirements"],
    legalNotice: game["legal_notice"] || "",
    metacritic: game["metacritic"]
      ? {
          score: game["metacritic"]["score"],
          reviewsPageUrl: game["metacritic"]["url"]
        }
      : {
          score: 0,
          reviewsPageUrl: ""
        },
    categories: game["categories"],
    genres: game["genres"],
    headerImageUrl: game["header_image"],
    heroImageUrl: `${GAME_IMAGES_BASE_URL}${game["steam_appid"]}/library_hero.jpg`,
    logoImageUrl: `${GAME_IMAGES_BASE_URL}${game["steam_appid"]}/logo.png`,
    backgroundImageUrl: game["background"],
    highlightedVideos: game["movies"]
      ? getVideos(game["movies"].filter(video => video.highlight))
      : [],
    screenshots: getScreenshots(game["screenshots"] || []),
    videos: game["movies"]
      ? getVideos(game["movies"].filter(video => !video.highlight))
      : []
  };
};

module.exports = {
  gameReducer,
  getPriceDetails,
  getPlatforms,
  getScreenshots,
  getVideos
};
