import { FeaturedPublishers } from "./FeaturedPublishers";

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

describe("FeaturedPublishers", () => {
  const props = {
    classes: {
      root: "root",
      itemsContainer: "itemsContainer",
      item: "item",
      quickLinkContainer: "quickLinkContainer",
      paginationWidget: "paginationWidget"
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
