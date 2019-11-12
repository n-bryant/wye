const moment = require("moment");
const { DATE_FORMAT } = require("./constants");

/**
 * Returns a unix time formatted as a readable date
 * @param { Int } time - A unix time
 * @returns { String } - A formatted date string
 */
const getFormattedUnixTime = time => moment.unix(time).format(DATE_FORMAT);

module.exports = getFormattedUnixTime;
