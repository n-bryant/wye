/**
 * returns a starting offset value for a paginated list based on the current page value,
 * length of a list of items, and the number of items allowed per page
 * @param {Int} currentPage
 * @param {Int} listLength
 * @param {Int} perPage
 * @returns {Int}
 */
export function getOffsetStart(currentPage, listLength, perPage) {
  const pageDifferential = getPageDifferential(
    getTotalPages(listLength, perPage),
    currentPage,
    perPage
  );
  const mod = getTotalCountModPageLimit(listLength, perPage);
  const offsetCount = getOffsetCount(perPage, pageDifferential);

  return listLength - offsetCount - (mod === 0 ? perPage : mod);
}

/**
 * return the difference between total pages and current page
 * @param {Int} totalPages
 * @param {Int} currentPage
 * @returns {Int}
 */
export function getPageDifferential(totalPages, currentPage) {
  return totalPages - currentPage;
}

/**
 * returns the count of items remaining in the pages beyond the current page
 * @param {Int} perPage
 * @param {Int} pageDifferential
 * @returns {Int}
 */
export function getOffsetCount(perPage, pageDifferential) {
  return perPage * pageDifferential;
}

/**
 * returns the remainder of the list length divided by the per page limit
 * @param {Int} listLength
 * @param {Int} perPage
 */
export function getTotalCountModPageLimit(listLength, perPage) {
  return listLength % perPage;
}

/**
 * returns an end offset value for a paginated list based on the current page value and the allowed number of items per page
 * @param {Int} currentPage
 * @param {Int} perPage
 * @returns {Int}
 */
export function getOffsetEnd(currentPage, perPage) {
  return currentPage * perPage;
}

/**
 * returns the total amount of pages given a per page limit and list length
 * @param {Int} listLength
 * @param {Int} perPage
 * @returns {Int}
 */
export function getTotalPages(listLength, perPage) {
  return Math.ceil(listLength / perPage);
}
