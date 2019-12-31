import { MockedProvider } from "@apollo/react-testing";

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
          pageInfo: {
            totalCount: 1
          },
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
                    playtime: 20
                  }
                ]
              }
            }
          ]
        }
      }
    }
  ];

  it("should render successfully", () => {
    const wrapper = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecommendationsGrid {...props} />
      </MockedProvider>
    ).find(RecommendationsGrid);
    expect(toJson(wrapper)).toMatchSnapshot();
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
