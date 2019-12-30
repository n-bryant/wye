import { ActionButton } from "./ActionButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

describe("ActionButton", () => {
  const props = {
    classes: {
      root: "root",
      button: "button",
      buttonBorder: "buttonBorder",
      buttonBorderDisabled: "buttonBorderDisabled"
    },
    label: "foo",
    onClick: jest.fn(),
    disabled: false
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ActionButton {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should call the onClick prop when clicked", () => {
    wrapper.find(Button).simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });

  it("should set disabled styles if the disabled prop is truthy", () => {
    // falsy disabled value
    expect(
      wrapper.findWhere(n => n.hasClass(props.classes.buttonBorderDisabled))
        .length
    ).toBe(0);

    // truthy disabled value
    wrapper.setProps({
      disabled: true
    });
    wrapper.update();
    expect(
      wrapper.findWhere(n => n.hasClass(props.classes.buttonBorderDisabled))
        .length
    ).toBe(1);
  });

  it("should set the button's text to the value of the label prop", () => {
    expect(wrapper.find(Typography).text()).toBe(props.label);
  });
});
