import { MockedProvider } from "@apollo/react-testing";

import LoadingState from "./LoadingState";
import RecommendationsGridWithContext, {
  RecommendationsGrid,
  GET_RECOMMENDATIONS_QUERY
} from "./index";

describe("RecommendationsGrid", () => {
  const props = {
    classes: {
      root: "root"
    },
    users: ["foo"]
  };

  const mocks = [
    {
      request: {
        query: GET_RECOMMENDATIONS_QUERY,
        variables: {
          users: props.users
        }
      },
      result: {
        data: {
          recommendations: {
            pageInfo: {
              totalCount: 1
            },
            userDetails: [
              {
                id: "foo",
                profileUrl: "url",
                avatarName: "name",
                avatarImageUrl: "imagePath",
                onlineStatus: "offline",
                lastOnlineTime: "time"
              }
            ],
            edges: [
              {
                node: {
                  game: {
                    appid: "1",
                    name: "game",
                    developers: ["Valve"],
                    publishers: ["Valve"],
                    genres: ["Action"],
                    tags: ["Multiplayer"],
                    freeToPlay: false,
                    onSale: false,
                    discount: 0,
                    initialPrice: 350,
                    finalPrice: 350,
                    userRating: 93,
                    logoImageUrl: "logo",
                    heroImageUrl: "hero"
                  },
                  ownedBy: ["foo"],
                  recentlyPlayedBy: ["foo"],
                  playtime: [
                    {
                      id: "foo",
                      hoursPlayed: 20
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  ];

  it("should render successfully", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecommendationsGrid {...props} />
      </MockedProvider>
    );
    expect(toJson(wrapper.find(RecommendationsGrid))).toMatchSnapshot();
    expect(wrapper.find(LoadingState).length).toBe(1);
  });
});

describe("RecommendationsGridWithContext", () => {
  it("should pass a users value from context to its rendered child", () => {
    const renderCallbackArgs = {
      state: {
        users: ["foo"]
      }
    };
    const props = {
      fizz: "buzz"
    };

    const wrapper = shallow(<RecommendationsGridWithContext {...props} />);
    expect(wrapper.prop("children")(renderCallbackArgs).props.users).toBe(
      renderCallbackArgs.state.users
    );
    expect(wrapper.prop("children")(renderCallbackArgs).props.fizz).toBe(
      props.fizz
    );
  });
});
