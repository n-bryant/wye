const {
  getFilterOptions,
  EXCLUDED_PUBLISHER_KEYS
} = require("./getFilterOptions");

describe("getFilterOptions", () => {
  it("should exclude the excluded publisher keys from being added to the publisher/developer options", () => {
    ["publishers", "developers"].forEach(key => {
      EXCLUDED_PUBLISHER_KEYS.forEach(exclusion => {
        const gameList = [
          {
            publishers: [exclusion],
            developers: [exclusion],
            genres: [],
            tags: []
          }
        ];
        expect(getFilterOptions(gameList)[key]).toEqual([]);
      });
    });
  });

  const mockedList = [
    {
      publishers: ["a"],
      developers: ["a"],
      genres: ["a"],
      tags: ["a"],
      userRating: 25,
      discount: 25,
      finalPrice: 250
    },
    {
      publishers: ["a", "b"],
      developers: ["b", "a"],
      genres: ["a", "b"],
      tags: ["b", "a"],
      userRating: 75,
      discount: 75,
      finalPrice: 750
    },
    {
      publishers: ["a", "c", "b"],
      developers: ["a", "c", "b"],
      genres: ["a", "c", "b"],
      tags: ["a", "c", "b"],
      userRating: 50,
      discount: 50,
      finalPrice: 500
    }
  ];

  it("should return a sorted list of unique category types and the min/max values for filtering", () => {
    const result = getFilterOptions(mockedList);
    expect(result.publishers).toEqual(["a", "b", "c"]);
    expect(result.developers).toEqual(["a", "b", "c"]);
    expect(result.genres).toEqual(["a", "b", "c"]);
    expect(result.tags).toEqual(["a", "b", "c"]);
    expect(result.userRating_min).toEqual(25);
    expect(result.userRating_max).toEqual(75);
    expect(result.discount_min).toEqual(25);
    expect(result.discount_max).toEqual(75);
    expect(result.finalPrice_min).toEqual(250);
    expect(result.finalPrice_max).toEqual(750);
  });
});
