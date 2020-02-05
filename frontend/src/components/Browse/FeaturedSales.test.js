import { FeaturedSales } from "./FeaturedSales";

describe("FeaturedSales", () => {
  const props = {
    classes: {
      root: "root",
      featuredSaleContainer: "featuredSaleContainer",
      featuredSale: "featuredSale",
      subFeaturedSaleContainer: "subFeaturedSaleContainer",
      subFeaturedSale: "subFeaturedSale",
      paginationWidget: "paginationWidget",
      quickLinksContainer: "quickLinksContainer",
      quickLink: "quickLink",
      spacer: "spacer"
    },
    items: [
      {
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
        libraryCapsule: "lib"
      },
      {
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
        libraryCapsule: "lib"
      },
      {
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
        libraryCapsule: "lib"
      },
      {
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
        libraryCapsule: "lib"
      },
      {
        appid: "5",
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
        libraryCapsule: "lib"
      },
      {
        appid: "6",
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
        libraryCapsule: "lib"
      }
    ],
    width: "xs"
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FeaturedSales {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should adjust the presentation of the cards if the width is md+", () => {
    wrapper.setProps({
      width: "md"
    });
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
