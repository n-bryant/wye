import Icon from "@mdi/react";
import { ButtonWithHoverFill } from "./ButtonWithHoverFill";
import { Typography } from "@material-ui/core";

describe("ButtonWithHoverFill", () => {
  const props = {
    classes: {
      root: "root",
      hovered: "hovered",
      icon: "icon",
      iconWithLabel: "iconWithLabel",
      iconHovered: "iconHovered",
      transformText: "transformText"
    },
    icon: "icon",
    label: "label",
    displayLabel: true,
    handleClick: jest.fn()
  };

  let wrapper;
  beforeEach(() => {
    const hovered = true;
    const setHovered = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [hovered, setHovered]);
    wrapper = shallow(<ButtonWithHoverFill {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should call the passed click handler when clicked", () => {
    wrapper.prop("onClick")();
    expect(props.handleClick).toHaveBeenCalled();
  });

  it("should apply a text transform if the transformText prop is truthy", () => {
    wrapper.setProps({
      transformText: true
    });
    wrapper.update();
    expect(wrapper.hasClass(props.classes.transformText)).toBeTruthy();
  });

  it("should not render the label if the displayLabel prop is falsy", () => {
    wrapper.setProps({
      displayLabel: false
    });
    wrapper.update();
    expect(wrapper.find(Typography).length).toBe(0);
  });

  it("should not render the icon if the icon prop is an empty string", () => {
    wrapper.setProps({
      icon: ""
    });
    wrapper.update();
    expect(wrapper.find(Icon).length).toBe(0);
  });
});
