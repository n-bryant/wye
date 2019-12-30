import { Index, reducer, INITIAL_STATE } from "./index";
import RecommendationsForm from "../src/components/RecommendationsForm/RecommendationsForm";

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

  it("should render the recommendations form if the showForm state value is truthy", () => {
    // set up useReducer hook mocking
    const state = {
      showForm: true,
      users: []
    };
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, "useReducer");
    useReducerSpy.mockImplementation(() => [state, dispatch]);

    const wrapper = shallow(<Index {...props} />);
    expect(wrapper.find(RecommendationsForm).length).toBe(1);
  });
});

describe("reducer", () => {
  it("should throw an Error by default", () => {
    expect(reducer).toThrow();
  });

  it("should set the showForm state value to the passed action's value when the action type is setShowForm", () => {
    expect(
      reducer(INITIAL_STATE, {
        type: "setShowForm",
        value: true
      })
    ).toEqual({
      ...INITIAL_STATE,
      showForm: true
    });
  });

  it("should set the users state value to the passed action's value when the action type is setUsers", () => {
    expect(
      reducer(INITIAL_STATE, {
        type: "setUsers",
        value: ["a"]
      })
    ).toEqual({
      ...INITIAL_STATE,
      users: ["a"]
    });
  });
});
