import HeaderWithContext, { Header } from "./Header";
import { ACTIONS, CONTENT_OPTIONS } from "../../pages/_app";

describe("HeaderWithContext", () => {
  it("should pass a dispatch value from context to its rendered child", () => {
    const renderCallbackArgs = {
      dispatch: jest.fn()
    };
    const props = {
      fizz: "buzz"
    };

    const wrapper = shallow(<HeaderWithContext {...props} />);
    expect(wrapper.prop("children")(renderCallbackArgs).props.dispatch).toBe(
      renderCallbackArgs.dispatch
    );
    expect(wrapper.prop("children")(renderCallbackArgs).props.fizz).toBe(
      props.fizz
    );
  });
});

describe("Header", () => {
  const props = {
    classes: {
      root: "root",
      toolBar: "toolBar",
      title: "title",
      linksContainer: "linksContainer",
      link: "link",
      linkWithNoHoverDecoration: "linkWithNoHoverDecoration",
      githubIcon: "githubIcon"
    },
    dispatch: jest.fn()
  };

  it("should render successfully", () => {
    const wrapper = shallow(<Header {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set the content to the welcome content if the app title in the toolbar is clicked", () => {
    const wrapper = shallow(<Header {...props} />);
    wrapper.findWhere(n => n.hasClass(props.classes.title)).prop("onClick")();
    expect(props.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.SET_CONTENT,
      value: CONTENT_OPTIONS.WELCOME
    });
  });
});
