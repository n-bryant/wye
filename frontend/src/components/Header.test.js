import Button from "@material-ui/core/Button";
import { Header } from "./Header";

describe("Header", () => {
  const props = {
    classes: {
      root: "root",
      toolBar: "toolBar",
      title: "title",
      linksContainer: "linksContainer",
      link: "link",
      linkWithNoHoverDecoration: "linkWithNoHoverDecoration",
      githubIcon: "githubIcon",
      mainNav: "mainNav",
      browseMenuButton: "browseMenuButton",
      browseMenu: "browseMenu",
      menuSectionTitle: "menuSectionTitle",
      menuLink: "menuLink"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<Header {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should open the Browse menu if the browseMenuButton is clicked", () => {
    const anchorEl = {};
    const setAnchorEl = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [anchorEl, setAnchorEl]);
    const wrapper = shallow(<Header {...props} />);
    wrapper.find(Button).prop("onClick")({
      currentTarget: {}
    });
    expect(setAnchorEl).toHaveBeenCalled();
  });
});
