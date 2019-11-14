const getFormattedUnixTime = require("../../lib/util/unixDateFormatter");
const {
  userReducer,
  getUserOnlineStatus
} = require("../../src/reducers/userReducer");
const { ONLINE_STATUS_MAP } = require("../../src/reducers/constants");

describe("getUserOnlineStatus", () => {
  it("should return ONLINE_STATUS_MAP[`${status}`] if the status provided exists in the status map", () => {
    Object.keys(ONLINE_STATUS_MAP).forEach(key => {
      expect(getUserOnlineStatus(key)).toBe(ONLINE_STATUS_MAP[`${key}`]);
    });
  });

  it(`it should return ${
    ONLINE_STATUS_MAP[0]
  } if the status provided doesn't exist in the status map`, () => {
    expect(getUserOnlineStatus(Object.keys(ONLINE_STATUS_MAP).length)).toBe(
      ONLINE_STATUS_MAP[0]
    );
  });
});

describe("userReducer", () => {
  const mockUser = {
    steamid: "1",
    personaname: "foo",
    personastate: 0,
    lastlogoff: 11111111,
    profileurl: "bar",
    avatar: "foobar"
  };

  it("should map the provided user's steamid to the id property", () => {
    expect(userReducer(mockUser).id).toBe(mockUser.steamid);
  });

  it("should map the provided user's personaname to the avatarName property", () => {
    expect(userReducer(mockUser).avatarName).toBe(mockUser.personaname);
  });

  it("should map the provided user's personastate to the onlineStatus property", () => {
    expect(userReducer(mockUser).onlineStatus).toBe(
      getUserOnlineStatus(mockUser.personastate)
    );
  });

  it("should map the provided user's lastlogoff to the lastOnlineTime property", () => {
    expect(userReducer(mockUser).lastOnlineTime).toBe(
      getFormattedUnixTime(mockUser.lastlogoff)
    );
  });

  it("should map the provided user's profileurl to the profileUrl property", () => {
    expect(userReducer(mockUser).profileUrl).toBe(mockUser.profileurl);
  });

  it("should map the provided user's avatar to the avatarImageUrl property", () => {
    expect(userReducer(mockUser).avatarImageUrl).toBe(mockUser.avatar);
  });
});
