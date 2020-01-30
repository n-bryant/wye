import { FeaturedWidget } from "./FeaturedWidget";

describe("FeaturedWidget", () => {
  const props = {
    classes: {
      root: "root",
      heading: "heading",
      subHeading: "subHeading",
      content: "content",
      seeMoreButtonContainer: "seeMoreButtonContainer"
    },
    title: "title",
    subTitle: "subTitle",
    seeMorePath: "path"
  };

  it("should render successfully", () => {
    expect(toJson(shallow(<FeaturedWidget {...props} />))).toMatchSnapshot();
  });

  it("should not render the see more button if seeMorePath is falsy", () => {
    let propsWithoutSeeMorePath = {
      ...props
    };
    delete propsWithoutSeeMorePath.seeMorePath;
    const wrapper = shallow(<FeaturedWidget {...propsWithoutSeeMorePath} />);
    expect(
      wrapper.findWhere(n => n.hasClass(props.seeMoreButtonContainer)).length
    ).toBe(0);
  });
});
