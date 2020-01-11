import { RecommendationsFormWithContext, RecommendationsForm } from "./index";
import { ACTIONS, CONTENT_OPTIONS } from "../../../pages/_app";

describe("RecommendationsFormWithContext", () => {
  it("should provide a dispatch function from context and pass any additional props to its rendered child", () => {
    const props = {
      foo: "bar"
    };

    const renderCallbackArgs = {
      dispatch: jest.fn()
    };

    const wrapper = shallow(<RecommendationsFormWithContext {...props} />);
    expect(wrapper.prop("children")(renderCallbackArgs).props.dispatch).toBe(
      renderCallbackArgs.dispatch
    );
    expect(wrapper.prop("children")(renderCallbackArgs).props.foo).toBe(
      props.foo
    );
  });
});

describe("RecommendationsForm", () => {
  const props = {
    classes: {
      root: "root",
      closeButton: "closeButton",
      formInstructions: "formInstructions",
      title: "title",
      userFieldContainer: "userFieldContainer",
      submitButton: "submitButton"
    },
    dispatch: jest.fn(),
    users: []
  };

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<RecommendationsForm {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should call the dispatch prop to show the welcome content when the close button is clicked", () => {
    wrapper
      .findWhere(n => n.hasClass(props.classes.closeButton))
      .simulate("click");
    expect(props.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.SET_CONTENT,
      value: CONTENT_OPTIONS.WELCOME
    });
  });

  it("should set the disabled value of the ActionButton based on whether the usersValue state value has length", () => {
    // without users length
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.submitButton))
        .prop("disabled")
    ).toBeTruthy();

    // usersValue defined and with length
    const usersValue = ["a"];
    const setUsersValue = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [usersValue, setUsersValue]);
    const wrapperWithState = shallow(<RecommendationsForm {...props} />);
    expect(
      wrapperWithState
        .findWhere(n => n.hasClass(props.classes.submitButton))
        .prop("disabled")
    ).toBeFalsy();
  });

  it("should call the dispatch prop to update the context's users value and set the content to recommendations when the ActionButton is clicked", () => {
    const usersValue = ["a"];
    const setUsersValue = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [usersValue, setUsersValue]);
    const wrapperWithState = shallow(<RecommendationsForm {...props} />);
    wrapperWithState
      .findWhere(n => n.hasClass(props.classes.submitButton))
      .prop("onClick")();
    expect(props.dispatch).toHaveBeenCalledTimes(2);
    expect(props.dispatch.mock.calls[0][0]).toEqual({
      type: ACTIONS.SET_USERS,
      value: usersValue
    });
    expect(props.dispatch.mock.calls[1][0]).toEqual({
      type: ACTIONS.SET_CONTENT,
      value: CONTENT_OPTIONS.RECOMMENDATIONS
    });
  });
});
