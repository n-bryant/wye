const moment = require("moment");
const { ONLINE_STATUS_MAP, DATE_FORMAT } = require("./constants");

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
 * Returns a formatted last online time for a user
 * @param { Int } time - A user's last logoff in unix time
 * @returns { String } - A formatted date string
 */
const getUserLastOnlineTime = time => moment.unix(time).format(DATE_FORMAT);

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
  lastOnlineTime: getUserLastOnlineTime(user["lastlogoff"]),
  profileUrl: user["profileurl"],
  avatarImgUrl: user["avatar"]
});

module.exports = {
  userReducer,
  getUserOnlineStatus,
  getUserLastOnlineTime
};
