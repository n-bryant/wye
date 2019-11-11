const {
  USER_GAME_IMG_BASE_URL,
  USER_GAME_STORE_BASE_URL
} = require("./constants");

/**
 * Transforms a recently played or owned game received from Steam's player service API
 * into a game object that matches the schema
 * @param { Object } game - game data from Steam's player service API
 * @returns { Object } game - see GameBasicInfo definition in typeDefs
 */
const userGameReducer = game => ({
  id: game["appid"],
  name: game["name"],
  playtime: game["playtime_forever"],
  icon: `${USER_GAME_IMG_BASE_URL}${game["appid"]}/${game["img_icon_url"]}.jpg`,
  logo: `${USER_GAME_IMG_BASE_URL}${game["appid"]}/${game["img_logo_url"]}.jpg`,
  storeUrl: `${USER_GAME_STORE_BASE_URL}${game["appid"]}`
});

module.exports = { userGameReducer };
