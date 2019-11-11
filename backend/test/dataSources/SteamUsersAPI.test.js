const SteamUsersAPI = require("../../src/dataSources/SteamUsersAPI");
const { userReducer } = require("../../src/reducers/userReducer");
const {
  STEAM_USERS_API_BASE_URL,
  STEAM_USERS_API_USERS_ENDPOINT
} = require("../../src/dataSources/constants");

describe("SteamUsersAPI", () => {
  process.env.API_KEY = "foo";
  const userId = "1";
  let steamUsersAPI;
  beforeEach(() => {
    steamUsersAPI = new SteamUsersAPI();
    steamUsersAPI.get = jest.fn();
  });

  afterEach(() => {
    steamUsersAPI.get.mockReset();
  });

  it(`should have a baseURL property matching: ${STEAM_USERS_API_BASE_URL}`, () => {
    expect(steamUsersAPI.baseURL).toBe(STEAM_USERS_API_BASE_URL);
  });

  describe("getUserSummaryById", () => {
    it("should have a getUserSummaryById method", () => {
      expect(steamUsersAPI.getUserSummaryById).toBeDefined();
    });

    it(`should have the getUserSummaryById method call to ${STEAM_USERS_API_USERS_ENDPOINT}
    with a key query paramater of process.env.API_KEY and a steamids parameter matching the passed userId`, () => {
      steamUsersAPI.getUserSummaryById(userId);
      expect(steamUsersAPI.get).toBeCalledWith(STEAM_USERS_API_USERS_ENDPOINT, {
        key: process.env.API_KEY,
        steamids: userId
      });
    });

    it("should have the getUserSummaryById method return an empty object if no players array is returned by the call for data", async () => {
      steamUsersAPI.get.mockReturnValueOnce({});
      const data = await steamUsersAPI.getUserSummaryById(userId);
      expect(data).toMatchObject({});
    });

    it("should have the getUserSummaryById method return an object matching the first players element returned by the call for data if user info is available", async () => {
      const mockedUserResponse = {
        response: {
          players: [
            {
              steamid: "1",
              personaname: "foo",
              personastate: 0,
              lastlogoff: 11111111,
              profileurl: "bar",
              avatar: "foobar"
            }
          ]
        }
      };
      steamUsersAPI.get.mockReturnValueOnce(mockedUserResponse);
      const data = await steamUsersAPI.getUserSummaryById(userId);
      expect(data).toMatchObject(
        userReducer(mockedUserResponse.response.players[0])
      );
    });
  });
});
