import Link from "next/link";
import { QuickLink } from "./QuickLink";

describe("QuickLink", () => {
  const props = {
    classes: {
      root: "root",
      button: "button",
      fixed: "fixed"
    },
    label: "label",
    linkHref: "linkHref"
  };

  it("should render successfully", () => {
    const wrapper = shallow(<QuickLink {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render a Link with an as prop value matching the provided linkAs, if linkAs is defined", () => {
    const propsWithLinkAs = {
      ...props,
      linkAs: "linkAs"
    };
    const wrapper = shallow(<QuickLink {...propsWithLinkAs} />);
    expect(wrapper.find(Link).prop("as")).toBe(propsWithLinkAs.linkAs);
  });

  it("should add fixed stylings if the fixedDimensions prop is truthy", () => {
    const propsWithFixed = {
      ...props,
      fixedDimensions: true
    };
    const wrapper = shallow(<QuickLink {...propsWithFixed} />);
    expect(wrapper.findWhere(n => n.hasClass(props.classes.fixed)).length).toBe(
      1
    );
  });
});
