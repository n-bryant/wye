import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/react-testing";
import { ThemeProvider } from "@material-ui/core/styles";
import wait from "waait";
import theme from "../../../../lib/theme";

import {
  FilterGamesQuery,
  GamesFilterWidget,
  GAMES_FILTER_QUERY,
  MainContent
} from "./index";

describe("FilterGamesQuery", () => {
  const mockedResult = {
    recommendations: {
      pageInfo: {
        totalCount: 1
      },
      filterOptions: {
        publishers: ["a"],
        developers: ["a"],
        tags: ["a"],
        genres: ["a"],
        userRating_min: 95,
        userRating_max: 95,
        discount_min: 25,
        discount_max: 25,
        finalPrice_min: 750,
        finalPrice_max: 750
      },
      edges: [
        {
          node: {
            game: {
              appid: "1",
              name: "name",
              developers: ["a"],
              publishers: ["a"],
              ownersFormatted: "10,000 .. 20,000",
              userRating: 95,
              genres: ["a"],
              tags: ["a"],
              freeToPlay: false,
              onSale: true,
              discount: 25,
              initialPrice: 1000,
              finalPrice: 750,
              headerImage: "header",
              capsuleLg: "capsuleLg",
              backgroundImage: "background"
            },
            ownedBy: [],
            recentlyPlayedBy: [],
            playtime: []
          }
        }
      ],
      userDetails: [
        {
          id: "1",
          profileUrl: "url",
          avatarName: "name",
          avatarImageUrl: "img",
          onlineStatus: "Online",
          lastOnlineTime: "then"
        }
      ]
    }
  };

  const props = {
    classnames: {
      element: jest.fn(),
      root: jest.fn()
    },
    onDataReceived: jest.fn(),
    title: "title",
    subtitle: "subtitle",
    initialValues: {
      filters: {}
    }
  };

  it("should render successfully", () => {
    const mocks = [
      {
        request: {
          query: GAMES_FILTER_QUERY
        },
        result: {
          data: mockedResult
        }
      }
    ];
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <FilterGamesQuery {...props} />
        </MockedProvider>
      </ThemeProvider>
    );
    expect(toJson(wrapper.find(FilterGamesQuery))).toMatchSnapshot();
  });

  it("should render a MainContent once the query has loaded", async () => {
    const mocks = [
      {
        request: {
          query: GAMES_FILTER_QUERY
        },
        result: {
          data: mockedResult
        }
      }
    ];
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <FilterGamesQuery {...props} />
        </MockedProvider>
      </ThemeProvider>
    );

    await act(async () => {
      await wait(0);
      wrapper.update();
    });
    expect(wrapper.find(MainContent).length).toBe(1);
  });
});

describe("GamesFilterWidget", () => {
  const props = {
    classes: {
      root: "root"
    },
    title: "title",
    subtitle: "subtitle"
  };

  it("should render successfully", () => {
    expect(toJson(shallow(<GamesFilterWidget {...props} />))).toMatchSnapshot();
  });

  it("should pass any received filter options to the rendered FilterGamesQuery", () => {
    const propsWithFilters = {
      ...props,
      initialFilters: {
        orderBy: ["USER_RATING"],
        sortOrder: "DESC"
      }
    };
    const wrapper = shallow(<GamesFilterWidget {...propsWithFilters} />);
    expect(wrapper.find(FilterGamesQuery).prop("variables")).toMatchObject(
      propsWithFilters.initialFilters
    );
  });
});

describe("MainContent", () => {
  const props = {
    classnames: {
      root: jest.fn(),
      element: jest.fn()
    },
    featuredBackgroundUrl: "url",
    title: "title",
    subtitle: "subtitle"
  };

  it("should render successfully", () => {
    expect(toJson(shallow(<MainContent {...props} />))).toMatchSnapshot();
  });
});
