import {
  Index,
  reducer,
  INITIAL_STATE,
  CONTENT_OPTIONS,
  ACTIONS
} from "./index";
import RecommendationsForm from "../src/components/RecommendationsForm";
import RecommendationsGrid from "../src/components/RecommendationsGrid";

describe("index", () => {
  const props = {
    classes: {
      root: "root",
      container: "container",
      appBar: "appBar",
      toolBar: "toolBar",
      title: "title",
      linksContainer: "linksContainer",
      link: "link",
      githubIcon: "githubIcon",
      form: "form",
      main: "main",
      contentContainer: "contentContainer",
      content: "content"
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const wrapper = shallow(<Index {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render the welcome content if the app title in the toolbar is clicked", () => {
    // set up useReducer hook mocking
    const state = {
      content: CONTENT_OPTIONS.FORM,
      users: []
    };
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, "useReducer");
    useReducerSpy.mockImplementation(() => [state, dispatch]);
    const wrapper = shallow(<Index {...props} />);
    wrapper.findWhere(n => n.hasClass(props.classes.title)).prop("onClick")();
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTIONS.SET_CONTENT,
      value: CONTENT_OPTIONS.WELCOME
    });
  });

  it("should render the recommendations form if the content state value is set to the form content option", () => {
    // set up useReducer hook mocking
    const state = {
      content: CONTENT_OPTIONS.FORM,
      users: []
    };
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, "useReducer");
    useReducerSpy.mockImplementation(() => [state, dispatch]);

    const wrapper = shallow(<Index {...props} />);
    expect(wrapper.find(RecommendationsForm).length).toBe(1);
  });

  it("should render the recommendations grid if the content state value is set to the recommendations content option", () => {
    // set up useReducer hook mocking
    const state = {
      content: CONTENT_OPTIONS.RECOMMENDATIONS,
      users: []
    };
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, "useReducer");
    useReducerSpy.mockImplementation(() => [state, dispatch]);

    const wrapper = shallow(<Index {...props} />);
    expect(wrapper.find(RecommendationsGrid).length).toBe(1);
  });
});

describe("reducer", () => {
  it("should throw an Error by default", () => {
    expect(reducer).toThrow();
  });

  it("should set the content state value to the passed action's value when the action type is setContent", () => {
    expect(
      reducer(INITIAL_STATE, {
        type: ACTIONS.SET_CONTENT,
        value: CONTENT_OPTIONS.WELCOME
      })
    ).toEqual({
      ...INITIAL_STATE,
      content: CONTENT_OPTIONS.WELCOME
    });
  });

  it("should set the users state value to the passed action's value when the action type is setUsers", () => {
    expect(
      reducer(INITIAL_STATE, {
        type: ACTIONS.SET_USERS,
        value: ["a"]
      })
    ).toEqual({
      ...INITIAL_STATE,
      users: ["a"]
    });
  });
});
