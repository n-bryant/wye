import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

import LoadingState from "../LoadingState";
import MostPopularFeaturedQuery, {
  GET_MOST_POPULAR_FEATURED_QUERY,
  MostPopularFeatured,
  StyledMostPopularFeatured
} from "./MostPopularFeatured";

const mockedData = {
  recommendations: {
    edges: [
      {
        node: {
          game: {
            appid: "1",
            name: "name",
            developers: ["a", "b"],
            publishers: ["a"],
            ownersFormatted: "10,000 .. 20,000",
            userRating: 95,
            genres: ["c"],
            freeToPlay: false,
            onSale: true,
            discount: 25,
            initialPrice: 1000,
            finalPrice: 7500,
            headerImage: "header",
            capsuleLg: "lg",
            capsuleSm: "sm"
          }
        }
      },
      {
        node: {
          game: {
            appid: "2",
            name: "name",
            developers: ["a", "b"],
            publishers: ["a"],
            ownersFormatted: "10,000 .. 20,000",
            userRating: 95,
            genres: ["c"],
            freeToPlay: false,
            onSale: true,
            discount: 25,
            initialPrice: 1000,
            finalPrice: 7500,
            headerImage: "header",
            capsuleLg: "lg",
            capsuleSm: "sm"
          }
        }
      },
      {
        node: {
          game: {
            appid: "3",
            name: "name",
            developers: ["a", "b"],
            publishers: ["a"],
            ownersFormatted: "10,000 .. 20,000",
            userRating: 95,
            genres: ["c"],
            freeToPlay: false,
            onSale: true,
            discount: 25,
            initialPrice: 1000,
            finalPrice: 7500,
            headerImage: "header",
            capsuleLg: "lg",
            capsuleSm: "sm"
          }
        }
      },
      {
        node: {
          game: {
            appid: "4",
            name: "name",
            developers: ["a", "b"],
            publishers: ["a"],
            ownersFormatted: "10,000 .. 20,000",
            userRating: 95,
            genres: ["c"],
            freeToPlay: false,
            onSale: true,
            discount: 25,
            initialPrice: 1000,
            finalPrice: 7500,
            headerImage: "header",
            capsuleLg: "lg",
            capsuleSm: "sm"
          }
        }
      },
      {
        node: {
          game: {
            appid: "5",
            name: "name",
            developers: ["a", "b"],
            publishers: ["a"],
            ownersFormatted: "10,000 .. 20,000",
            userRating: 95,
            genres: ["c"],
            freeToPlay: false,
            onSale: true,
            discount: 25,
            initialPrice: 1000,
            finalPrice: 7500,
            headerImage: "header",
            capsuleLg: "lg",
            capsuleSm: "sm"
          }
        }
      }
    ]
  }
};

describe("MostPopularFeatured", () => {
  const props = {
    classes: {
      featuredItemContainer: "featuredItemContainer",
      featuredItem: "featuredItem",
      featuredItemContent: "featuredItemContent",
      subFeaturedItemsContainer: "subFeaturedItemsContainer",
      subFeaturedItem: "subFeaturedItem",
      featuredItemContainer: "featuredItemContainer",
      featuredItem: "featuredItem",
      paginationWidget: "paginationWidget",
      featuredItemFullWidth: "featuredItemFullWidth"
    },
    items: [
      {
        appid: "1"
      },
      {
        appid: "2"
      },
      {
        appid: "3"
      },
      {
        appid: "4"
      },
      {
        appid: "5"
      }
    ],
    width: "md"
  };

  it("should render successfully", () => {
    expect(
      toJson(shallow(<MostPopularFeatured {...props} />))
    ).toMatchSnapshot();
  });

  it("should render a full width card with pagination widget if the width is xs or sm", () => {
    const smallWidths = ["xs", "sm"];
    smallWidths.forEach(width => {
      let propsWithSmallWidth = {
        ...props,
        width
      };

      const wrapper = shallow(<MostPopularFeatured {...propsWithSmallWidth} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});

describe("MostPopularFeaturedQuery", () => {
  it("should render successfully", () => {
    const mocks = [
      {
        request: {
          query: GET_MOST_POPULAR_FEATURED_QUERY
        },
        result: {
          data: mockedData
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MostPopularFeaturedQuery />
      </MockedProvider>
    );
    expect(
      wrapper.find(MostPopularFeaturedQuery).find(LoadingState).length
    ).toBe(1);
  });

  it("should return a StyledMostPopularFeatured", async () => {
    const mocks = [
      {
        request: {
          query: GET_MOST_POPULAR_FEATURED_QUERY
        },
        result: {
          data: mockedData
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MostPopularFeaturedQuery />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0); // wait for response
      wrapper.update();
    });

    expect(wrapper.find(StyledMostPopularFeatured).length).toBe(1);
  });
});
