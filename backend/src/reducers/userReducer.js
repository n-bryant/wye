const getFormattedUnixTime = require("../../lib/util/unixDateFormatter");
const { ONLINE_STATUS_MAP } = require("./constants");

/**
 * Returns a readable online status for a user
 * @param { Int } status - A user's online status id from Steam's user API
 * @returns { String } - A legible online status string
 */
const getUserOnlineStatus = status => {
  return ONLINE_STATUS_MAP.hasOwnProperty(status)
    ? ONLINE_STATUS_MAP[`${status}`]
    : ONLINE_STATUS_MAP[0];
};

/**
 * Transforms a user received from Steam's user API
 * into a user object that matches the schema
 *
 * @param { Object } user see User definition in ../schema.js
 * @returns { Object } user that matches schema definition
 */
const userReducer = user => ({
  id: user["steamid"],
  avatarName: user["personaname"],
  onlineStatus: getUserOnlineStatus(user["personastate"]),
  lastOnlineTime: getFormattedUnixTime(user["lastlogoff"]),
  profileUrl: user["profileurl"],
  avatarImageUrl: user["avatar"]
});

module.exports = {
  userReducer,
  getUserOnlineStatus
};
