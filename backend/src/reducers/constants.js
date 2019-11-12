// userReducer
const ONLINE_STATUS_MAP = {
  0: "Offline",
  1: "Online",
  2: "Busy",
  3: "Away",
  4: "Snooze",
  5: "Looking to Trade",
  6: "Looking to Play"
};

// userGameReducer
const USER_GAME_IMG_BASE_URL =
  "http://media.steampowered.com/steamcommunity/public/images/apps/";
const USER_GAME_STORE_BASE_URL = "http://store.steampowered.com/app/";

module.exports = {
  ONLINE_STATUS_MAP,
  USER_GAME_IMG_BASE_URL,
  USER_GAME_STORE_BASE_URL
};
