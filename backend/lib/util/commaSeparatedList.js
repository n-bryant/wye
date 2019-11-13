/**
 * Transforms an array into a comma separated list string
 * @param { Array } list - the array  to transform into a comma separated list
 * @returns { String } list - a comma separated list derived from the provided array
 */
const getCommaSeparatedList = list => list.join(",").trim();

module.exports = getCommaSeparatedList;
