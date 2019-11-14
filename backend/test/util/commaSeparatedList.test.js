const getCommaSeparatedList = require("../../lib/util/commaSeparatedList");

describe("getCommaSeparatedList", () => {
  it("should return a comma separated list from the array provided", () => {
    const list = ["foo", "bar", "foo-bar"];
    const expectedFormattedList = "foo,bar,foo-bar";
    expect(getCommaSeparatedList(list)).toBe(expectedFormattedList);
  });

  it("should return an empty string if it does not receive an array", () => {
    expect(getCommaSeparatedList("not an array")).toBe("");
  });
});
