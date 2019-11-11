const { userGameReducer } = require("../../src/reducers/userGameReducer");
const {
  USER_GAME_IMG_BASE_URL,
  USER_GAME_STORE_BASE_URL
} = require("../../src/reducers/constants");

describe("userGameReducer", () => {
  const mockGame = {
    appid: "1",
    name: "foo",
    playtime_forever: 0,
    img_icon_url: 11111111,
    img_logo_url: "bar"
  };

  it("should map the provided game's appid to the id property", () => {
    expect(userGameReducer(mockGame).id).toBe(mockGame.appid);
  });

  it("should map the provided game's name to the name property", () => {
    expect(userGameReducer(mockGame).name).toBe(mockGame.name);
  });

  it("should map the provided game's playtime_forever to the playtime property", () => {
    expect(userGameReducer(mockGame).playtime).toBe(mockGame.playtime_forever);
  });

  it("should construct an icon url based on USER_GAME_IMG_BASE_URL, the provided game's appid and its img_icon_url", () => {
    expect(userGameReducer(mockGame).icon).toBe(
      `${USER_GAME_IMG_BASE_URL}${mockGame.appid}/${mockGame.img_icon_url}.jpg`
    );
  });

  it("should construct a logo url based on USER_GAME_IMG_BASE_URL, the provided game's appid and its img_logo_url", () => {
    expect(userGameReducer(mockGame).logo).toBe(
      `${USER_GAME_IMG_BASE_URL}${mockGame.appid}/${mockGame.img_logo_url}.jpg`
    );
  });
});
