import { OnClickOutsideWrapper } from "./OnClickOutsideWrapper";

const props = {
  classes: {
    root: "root"
  },
  children: <p>foo</p>,
  handleClickOutside: jest.fn()
};
describe("OnClickOutsideWrapper", () => {
  it("should render a div containing the children provided", () => {
    expect(
      toJson(shallow(<OnClickOutsideWrapper {...props} />))
    ).toMatchSnapshot();
  });

  it("should set a ref on the root element", () => {
    expect(
      mount(<OnClickOutsideWrapper {...props} />).instance().wrapperRef
    ).toBeDefined();
  });

  it("should call the handleClickOutside prop when something is clicked outside the children", () => {
    const wrapper = mount(<OnClickOutsideWrapper {...props} />, {
      attachTo: document.body
    });
    const event = {
      target: document.createElement("div")
    };
    wrapper
      .find(OnClickOutsideWrapper)
      .instance()
      .checkIfOutside(event);
    expect(props.handleClickOutside).toHaveBeenCalled();
  });
});
