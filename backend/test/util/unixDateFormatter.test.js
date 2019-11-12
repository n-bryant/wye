const moment = require("moment");
const getFormattedUnixTime = require("../../lib/util/unixDateFormatter");
const { DATE_FORMAT } = require("../../lib/util/constants");

describe("getFormattedUnixTime", () => {
  it(`should return a unix moment formatted with the date format: ${DATE_FORMAT}`, () => {
    moment.unix = jest.fn();
    moment.unix.mockReturnValue({
      format: jest.fn()
    });
    const time = 11111111;
    getFormattedUnixTime(time);
    expect(moment.unix).toBeCalledWith(time);
    expect(moment.unix(time).format).toBeCalledWith(DATE_FORMAT);
  });
});
