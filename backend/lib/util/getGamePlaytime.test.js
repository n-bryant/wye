const getGamePlaytime = require("./getGamePlaytime");

describe("getGameByPlaytime", () => {
  const mockGame = {
    appid: "1"
  };
  const mockUserOwnedGamesList = {
    a: {
      games: [
        { id: "1", hoursPlayed: 5 },
        { id: "2", hoursPlayed: 15 },
        { id: "3", hoursPlayed: 25 }
      ]
    },
    b: {
      games: [
        { id: "1", hoursPlayed: 75 },
        { id: "3", hoursPlayed: 10 }
      ]
    },
    c: {
      games: [{ id: "3", hoursPlayed: 90 }]
    },
    d: {
      games: [
        { id: "2", hoursPlayed: 23 },
        { id: "4", hoursPlayed: 46 }
      ]
    }
  };

  it("should return a list of individual user playtimes for a game", () => {
    expect(
      getGamePlaytime(mockGame, mockUserOwnedGamesList).playtimeByUser
    ).toEqual([
      {
        steamId: "a",
        hoursPlayed: 5
      },
      {
        steamId: "b",
        hoursPlayed: 75
      },
      {
        steamId: "c",
        hoursPlayed: 0
      },
      {
        steamId: "d",
        hoursPlayed: 0
      }
    ]);
  });

  it("should return the combined playtime for a game", () => {
    expect(getGamePlaytime(mockGame, mockUserOwnedGamesList).totalHours).toBe(
      80
    );
  });
});
