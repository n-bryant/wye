const uniq = require("lodash.uniq");
const applyPlayerFiltersToGameList = require("../../lib/util/applyPlayerFiltersToGameList");

describe("applyPlayerFiltersToGameList", () => {
  it("should return an empty array by default", () => {
    expect(applyPlayerFiltersToGameList()).toEqual([]);
  });

  it("should return the provided game list, filtered for matches of games associated with the provided filter values", () => {
    const filterValue = ["a", "b", "c"];
    const gameList = ["1", "2", "3", "4", "5", "6", "7"];
    const gamesByUser = {
      a: {
        games: ["1", "2"]
      },
      b: {
        games: ["2"]
      },
      c: {
        games: ["1", "6", "7"]
      },
      d: {
        games: ["3", "4", "5"]
      }
    };
    const expectedResult = ["1", "2", "6", "7"];
    expect(
      applyPlayerFiltersToGameList(filterValue, gameList, gamesByUser)
    ).toEqual(expectedResult);
  });
});
