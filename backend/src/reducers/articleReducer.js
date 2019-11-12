const getFormattedUnixTime = require("../../lib/util/unixDateFormatter");

/**
 * Transforms an article received from Steam's news API
 * into an article object that matches the schema
 *
 * @param { Object } article - the raw article data to parse
 * @returns { Object } article - article parsed to match schema definition
 */
const articleReducer = article => ({
  id: article["gid"],
  appId: article["appid"],
  printDate: getFormattedUnixTime(article["date"]),
  title: article["title"],
  url: article["url"],
  contents: article["contents"]
});
module.exports = { articleReducer };
