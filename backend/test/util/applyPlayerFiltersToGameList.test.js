const uniq = require("lodash.uniq");
const applyPlayerFiltersToGameList = require("../../lib/util/applyPlayerFiltersToGameList");

describe("applyPlayerFiltersToGameList", () => {
  it("should return an empty array by default", () => {
    expect(applyPlayerFiltersToGameList()).toEqual([]);
  });

  it("should return the provided game list, filtered for matches of games associated with the provided filter values", () => {
    const filterValue = ["a", "b", "c"];
    const gameList = ["1", "2", "3", "4", "5", "6", "7"];
    const gamesByUserNoIds = {
      a: {
        games: ["1", "2"]
      },
      b: {
        games: ["2"]
      },
      c: {
        games: ["1", "2", "6", "7"]
      },
      d: {
        games: ["3", "4", "5"]
      }
    };
    const expectedResult = ["2"];
    expect(
      applyPlayerFiltersToGameList(filterValue, gameList, gamesByUserNoIds)
    ).toEqual(expectedResult);

    const gamesByUserWithIds = {
      a: {
        games: [
          {
            id: "1"
          },
          {
            id: "2"
          }
        ]
      },
      b: {
        games: [
          {
            id: "2"
          },
          { id: "3" }
        ]
      },
      c: {
        games: [{ id: "2" }, { id: "3" }, { id: "4" }]
      },
      d: {
        games: []
      }
    };
    expect(
      applyPlayerFiltersToGameList(filterValue, gameList, gamesByUserWithIds)
    ).toEqual(expectedResult);
  });
});
