import ActionButton from "./ActionButton";
import WelcomeEmptyStateWithContext, {
  WelcomeEmptyState
} from "./WelcomeEmptyState";

describe("WelcomeEmptyStateWithContext", () => {
  it("should provide a dispatch function from context and pass any additional props to its rendered child", () => {
    const props = {
      foo: "bar"
    };

    const renderCallbackArgs = {
      dispatch: jest.fn()
    };

    const wrapper = shallow(<WelcomeEmptyStateWithContext {...props} />);
    expect(wrapper.prop("children")(renderCallbackArgs).props.dispatch).toBe(
      renderCallbackArgs.dispatch
    );
    expect(wrapper.prop("children")(renderCallbackArgs).props.foo).toBe(
      props.foo
    );
  });
});

describe("WelcomeEmptyState", () => {
  const props = {
    classes: {
      root: "root",
      welcomeMessageContainer: "welcomeMessageContainer",
      title: "title",
      message: "message",
      instructionsContainer: "instructionsContainer",
      link: "link"
    },
    dispatch: jest.fn()
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WelcomeEmptyState {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should call the dispatch prop to set the form display to true when the ActionButton is clicked", () => {
    wrapper.find(ActionButton).simulate("click");
    expect(props.dispatch).toHaveBeenCalledWith({
      type: "setShowForm",
      value: true
    });
  });
});
