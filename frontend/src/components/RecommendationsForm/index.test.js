import { Formik } from "formik";
import {
  RecommendationsFormWithContext,
  RecommendationsFormWithFormik,
  RECOMMENDATIONS_FORM_INITIAL_VALUES,
  RecommendationsForm
} from "./index";
import { ACTIONS, CONTENT_OPTIONS } from "../../../pages";

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

describe("RecommendationsFormWithFormik", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RecommendationsFormWithFormik />);
  });

  it("should render a Formik and pass it initialValues from props or a default initialValues prop matching RECOMMENDATIONS_FORM_INITIAL_VALUES", () => {
    expect(wrapper.find(Formik).prop("initialValues")).toMatchObject(
      RECOMMENDATIONS_FORM_INITIAL_VALUES
    );

    const newProps = {
      initialValues: {
        users: ["foo", "bar"]
      }
    };
    wrapper.setProps(newProps);
    wrapper.update();
    expect(wrapper.find(Formik).prop("initialValues")).toMatchObject(
      newProps.initialValues
    );
  });

  it("should pass a dispatch prop to its rendered child", () => {
    const props = {
      dispatch: jest.fn()
    };
    wrapper.setProps(props);
    expect(wrapper.prop("children")().props.dispatch).toBe(props.dispatch);
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
    values: {
      users: []
    }
  };

  let wrapper;
  beforeEach(() => {
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

  it("should set the disabled value of the ActionButton based on whether the users value of the values prop is defined and has length", () => {
    // without users length
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.submitButton))
        .prop("disabled")
    ).toBeTruthy();

    // undefined users
    wrapper.setProps({
      values: {}
    });
    wrapper.update();
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.submitButton))
        .prop("disabled")
    ).toBeTruthy();

    // users defined and with length
    wrapper.setProps({
      values: {
        users: ["foo"]
      }
    });
    wrapper.update();
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.submitButton))
        .prop("disabled")
    ).toBeFalsy();
  });
});
