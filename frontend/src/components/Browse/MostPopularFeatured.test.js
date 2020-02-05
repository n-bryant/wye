import { MostPopularFeatured } from "./MostPopularFeatured";

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
      featuredItemFullWidth: "featuredItemFullWidth",
      quickLinkContainer: "quickLinkContainer"
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
