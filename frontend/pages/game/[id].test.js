import { MockedProvider } from "@apollo/react-testing";
import { Game, GET_GAME_QUERY } from "./[id]";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      id: "1"
    }
  })
}));

describe("Game", () => {
  const props = {
    classes: {
      root: "root"
    }
  };

  const mocks = [
    {
      request: {
        query: GET_GAME_QUERY,
        variables: {
          gameId: "1"
        }
      },
      result: {
        data: {
          details: {},
          articles: []
        }
      }
    }
  ];

  it("should render successfully", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Game {...props} />
      </MockedProvider>
    );
    expect(toJson(wrapper.find(Game))).toMatchSnapshot();
  });
});
