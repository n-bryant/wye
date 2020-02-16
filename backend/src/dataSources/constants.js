// SteamUsersAPI
const STEAM_USERS_API_BASE_URL = "http://api.steampowered.com/ISteamUser/";
const STEAM_USERS_API_USERS_ENDPOINT = "GetPlayerSummaries/v0002/";

// SteamPlayerServiceAPI
const STEAM_PLAYER_SERVICE_API_BASE_URL =
  "http://api.steampowered.com/IPlayerService/";
const STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT = "GetOwnedGames/v0001/";
const STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT =
  "GetRecentlyPlayedGames/v0001/";
const STEAM_PLAYER_SERVICE_RECENT_PLAYED_COUNT = 10;

// SteamNewsAPI
const STEAM_NEWS_API_BASE_URL = "http://api.steampowered.com/ISteamNews/";
const STEAM_NEWS_API_ARTICLES_ENDPOINT = "GetNewsForApp/v0002/";
const STEAM_NEWS_API_ARTICLE_COUNT = 6;

// SteamGamesAPI
const STEAM_GAMES_API_BASE_URL = "https://store.steampowered.com/api/";
const STEAM_GAMES_API_GAMES_ENDPOINT = "appdetails";

module.exports = {
  STEAM_USERS_API_BASE_URL,
  STEAM_USERS_API_USERS_ENDPOINT,
  STEAM_PLAYER_SERVICE_API_BASE_URL,
  STEAM_PLAYER_SERVICE_OWNED_GAMES_ENDPOINT,
  STEAM_PLAYER_SERVICE_RECENT_GAMES_ENDPOINT,
  STEAM_PLAYER_SERVICE_RECENT_PLAYED_COUNT,
  STEAM_NEWS_API_BASE_URL,
  STEAM_NEWS_API_ARTICLES_ENDPOINT,
  STEAM_NEWS_API_ARTICLE_COUNT,
  STEAM_GAMES_API_BASE_URL,
  STEAM_GAMES_API_GAMES_ENDPOINT
};
