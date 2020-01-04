const {
  sortRecommendations,
  sortRecommendationsByPlaytime
} = require("./sortRecommendations");

describe("sortRecommendationsByPlaytime", () => {
  it("should sort each element in the provided list by their combined hours played", () => {
    const a = {
      node: {
        playtime: [
          {
            id: "1",
            hoursPlayed: 5
          }
        ]
      }
    };
    const b = {
      node: {
        playtime: [
          {
            id: "1",
            hoursPlayed: 2
          },
          {
            id: "2",
            hoursPlayed: 1
          }
        ]
      }
    };
    const c = {
      node: {
        playtime: [
          {
            id: "1",
            hoursPlayed: 6
          }
        ]
      }
    };
    const d = {
      node: {
        playtime: [
          {
            id: "1",
            hoursPlayed: 1
          }
        ]
      }
    };
    const list = [a, b, c, d];
    expect(sortRecommendationsByPlaytime(list, "DESC")).toEqual([c, a, b, d]);
    expect(sortRecommendationsByPlaytime(list, "ASC")).toEqual([d, b, a, c]);
  });
});

describe("sortRecommendations", () => {
  const a = {
    node: {
      game: {
        appid: "1",
        name: "foo",
        freeToPlay: true,
        onSale: true,
        discount: 10,
        finalPrice: 10,
        userRating: 25
      },
      ownedBy: ["user1"],
      recentlyPlayedBy: ["user1"]
    }
  };
  const b = {
    node: {
      game: {
        appid: "2",
        name: "bar",
        freeToPlay: false,
        onSale: false,
        discount: 0,
        finalPrice: 0,
        userRating: 5
      },
      ownedBy: ["user1", "user2", "user3"],
      recentlyPlayedBy: ["user1", "user2", "user3"]
    }
  };
  const c = {
    node: {
      game: {
        appid: "3",
        name: "fizz",
        freeToPlay: true,
        onSale: true,
        discount: 60,
        finalPrice: 60,
        userRating: 50
      },
      ownedBy: ["user1", "user3"],
      recentlyPlayedBy: ["user1", "user3"]
    }
  };
  const d = {
    node: {
      game: {
        appid: "4",
        name: "buzz",
        freeToPlay: false,
        onSale: false,
        discount: 50,
        finalPrice: 50,
        userRating: 35
      },
      ownedBy: ["user1", "user2", "user3"],
      recentlyPlayedBy: ["user1", "user2", "user3"]
    }
  };

  const mockRecommendations = [a, b, c, d];

  it("should sort the given list by the game's name", () => {
    // game name
    const sortByNameDesc = [{ prop: "node.game.name", direction: -1 }];
    expect(sortRecommendations(sortByNameDesc, mockRecommendations)).toEqual([
      a,
      c,
      d,
      b
    ]);
    const sortByNameAsc = [{ prop: "node.game.name", direction: 1 }];
    expect(sortRecommendations(sortByNameAsc, mockRecommendations)).toEqual([
      b,
      d,
      c,
      a
    ]);
  });

  it("should sort the given list by whether the game is free to play", () => {
    // game freeToPlay
    const sortByFreeToPlayDesc = [
      { prop: "node.game.freeToPlay", direction: -1 }
    ];
    expect(
      sortRecommendations(sortByFreeToPlayDesc, mockRecommendations)
    ).toEqual([c, a, b, d]);
    const sortByFreeToPlayAsc = [
      { prop: "node.game.freeToPlay", direction: 1 }
    ];
    expect(
      sortRecommendations(sortByFreeToPlayAsc, mockRecommendations)
    ).toEqual([b, d, c, a]);
  });

  it("should sort the given list by whether the game is on sale", () => {
    // game onSale
    const sortByOnSaleDesc = [{ prop: "node.game.onSale", direction: -1 }];
    expect(sortRecommendations(sortByOnSaleDesc, mockRecommendations)).toEqual([
      c,
      a,
      b,
      d
    ]);
    const sortByOnSaleAsc = [{ prop: "node.game.onSale", direction: 1 }];
    expect(sortRecommendations(sortByOnSaleAsc, mockRecommendations)).toEqual([
      b,
      d,
      c,
      a
    ]);
  });

  it("should sort the given list by whether the game discount", () => {
    // game discount
    const sortByDiscountDesc = [{ prop: "node.game.discount", direction: -1 }];
    expect(
      sortRecommendations(sortByDiscountDesc, mockRecommendations)
    ).toEqual([c, d, a, b]);
    const sortByDiscountAsc = [{ prop: "node.game.discount", direction: 1 }];
    expect(
      sortRecommendations(sortByDiscountAsc, mockRecommendations)
    ).toEqual([b, a, d, c]);
  });

  it("should sort the given list by whether the game final price", () => {
    // game final price
    const sortByFinalPriceDesc = [
      { prop: "node.game.finalPrice", direction: -1 }
    ];
    expect(
      sortRecommendations(sortByFinalPriceDesc, mockRecommendations)
    ).toEqual([c, d, a, b]);
    const sortByFinalPriceAsc = [
      { prop: "node.game.finalPrice", direction: 1 }
    ];
    expect(
      sortRecommendations(sortByFinalPriceAsc, mockRecommendations)
    ).toEqual([b, a, d, c]);
  });

  it("should sort the given list by the number of a game's owners", () => {
    // owned by
    const sortByOwnedByDesc = [{ prop: "node.ownedBy.length", direction: -1 }];
    expect(
      sortRecommendations(sortByOwnedByDesc, mockRecommendations)
    ).toEqual([b, d, c, a]);
    const sortByOwnedByAsc = [{ prop: "node.ownedBy.length", direction: 1 }];
    expect(sortRecommendations(sortByOwnedByAsc, mockRecommendations)).toEqual([
      a,
      c,
      b,
      d
    ]);
  });

  it("should sort the given list by the number of users that have recently played it", () => {
    // owned by
    const sortByRecentlyPlayedByDesc = [
      { prop: "node.recentlyPlayedBy.length", direction: -1 }
    ];
    expect(
      sortRecommendations(sortByRecentlyPlayedByDesc, mockRecommendations)
    ).toEqual([b, d, c, a]);
    const sortByRecentlyPlayedByAsc = [
      { prop: "node.recentlyPlayedBy.length", direction: 1 }
    ];
    expect(
      sortRecommendations(sortByRecentlyPlayedByAsc, mockRecommendations)
    ).toEqual([a, c, b, d]);
  });
});
