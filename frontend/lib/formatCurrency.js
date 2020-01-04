/**
 * adds commas as appropriate to a given dollar amount
 * @param {String} value - dollar value to be formatted with commas
 * @returns {String}
 */
export const amountWithCommas = value => {
  // split on decimal point
  const parts = value.split(".");

  // examine the value's content before the decimal point,
  // placing commas where appropriate
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // rejoin amount after formatting
  return parts.join(".");
};

/**
 * formats a value provided in cents into a readable dollar amount
 * @param {Int} value - value in cents
 * @returns {String}
 */
export const formatCurrency = value => {
  const dollarAmount = value / 100;
  return `$${amountWithCommas(dollarAmount.toFixed(2))}`;
};

export default formatCurrency;
