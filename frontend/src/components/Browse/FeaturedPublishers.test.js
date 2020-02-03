import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

import FeaturedPublishersQuery, {
  FeaturedPublishers,
  StyledFeaturedPublishers,
  GET_FEATURED_PUBLISHERS_TOP_TITLE_QUERY
} from "./FeaturedPublishers";

const mockedResult = {
  getTopTitleForMostPopularPublishers: [
    {
      publisher: "1",
      topTitle: {
        appid: "1",
        name: "name",
        developers: ["a"],
        publishers: ["a"],
        ownersFormatted: "10,000 .. 20,000",
        userRating: 95,
        genres: ["a"],
        freeToPlay: false,
        onSale: true,
        discount: 25,
        initialPrice: 1000,
        finalPrice: 750,
        headerImage: "header",
        capsuleMd: "md"
      }
    },
    {
      publisher: "2",
      topTitle: {
        appid: "2",
        name: "name",
        developers: ["a"],
        publishers: ["a"],
        ownersFormatted: "10,000 .. 20,000",
        userRating: 95,
        genres: ["a"],
        freeToPlay: false,
        onSale: true,
        discount: 25,
        initialPrice: 1000,
        finalPrice: 750,
        headerImage: "header",
        capsuleMd: "md"
      }
    },
    {
      publisher: "3",
      topTitle: {
        appid: "3",
        name: "name",
        developers: ["a"],
        publishers: ["a"],
        ownersFormatted: "10,000 .. 20,000",
        userRating: 95,
        genres: ["a"],
        freeToPlay: false,
        onSale: true,
        discount: 25,
        initialPrice: 1000,
        finalPrice: 750,
        headerImage: "header",
        capsuleMd: "md"
      }
    },
    {
      publisher: "4",
      topTitle: {
        appid: "4",
        name: "name",
        developers: ["a"],
        publishers: ["a"],
        ownersFormatted: "10,000 .. 20,000",
        userRating: 95,
        genres: ["a"],
        freeToPlay: false,
        onSale: true,
        discount: 25,
        initialPrice: 1000,
        finalPrice: 750,
        headerImage: "header",
        capsuleMd: "md"
      }
    }
  ]
};

describe("FeaturedPublishersQuery", () => {
  it("should render successfully", () => {
    const mocks = [
      {
        request: {
          query: GET_FEATURED_PUBLISHERS_TOP_TITLE_QUERY
        },
        result: {
          data: mockedResult
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FeaturedPublishersQuery />
      </MockedProvider>
    );
    expect(toJson(wrapper.find(FeaturedPublishersQuery))).toMatchSnapshot();
  });

  it("should return a StyledFeaturedPublishers", async () => {
    const mocks = [
      {
        request: {
          query: GET_FEATURED_PUBLISHERS_TOP_TITLE_QUERY
        },
        result: {
          data: mockedResult
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FeaturedPublishersQuery />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0); // wait for response
      wrapper.update();
    });
    expect(wrapper.find(StyledFeaturedPublishers).length).toBe(1);
  });
});

describe("FeaturedPublishers", () => {
  const props = {
    classes: {
      root: "root",
      itemsContainer: "itemsContainer",
      item: "item"
    },
    items: mockedResult.getTopTitleForMostPopularPublishers,
    width: "xs"
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FeaturedPublishers {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should adjust the layout of the cards if the width is larger than xs or sm", () => {
    wrapper.setProps({
      width: "md"
    });
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
