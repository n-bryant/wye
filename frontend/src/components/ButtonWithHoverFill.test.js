import { ButtonWithHoverFill } from "./ButtonWithHoverFill";

describe("ButtonWithHoverFill", () => {
  const props = {
    classes: {
      root: "root",
      hovered: "hovered",
      icon: "icon",
      iconWithLabel: "iconWithLabel",
      iconHovered: "iconHovered"
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
});
