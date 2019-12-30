import { mdiAccountPlus } from "@mdi/js";
import Chip from "@material-ui/core/Chip";
import UsersFieldWithContext, { UsersField } from "./UsersField";

describe("UsersFieldWithContext", () => {
  it("should provide a setFieldValue function and values from context and pass any additional props to its rendered child", () => {
    const props = {
      foo: "bar"
    };

    const renderCallbackArgs = {
      setFieldValue: jest.fn(),
      values: {
        users: []
      }
    };

    const wrapper = shallow(<UsersFieldWithContext {...props} />);
    expect(
      wrapper.prop("children")(renderCallbackArgs).props.setFieldValue
    ).toBe(renderCallbackArgs.setFieldValue);
    expect(wrapper.prop("children")(renderCallbackArgs).props.values).toEqual(
      renderCallbackArgs.values
    );
    expect(wrapper.prop("children")(renderCallbackArgs).props.foo).toBe(
      props.foo
    );
  });
});

describe("UsersField", () => {
  const props = {
    classes: {
      root: "root",
      fieldItemsContainer: "fieldItemsContainer",
      chipsLabel: "chipsLabel",
      chipsLabelHidden: "chipsLabelHidden",
      chip: "chip",
      deleteIcon: "deleteIcon",
      addUserfieldContainer: "addUserfieldContainer",
      addUserField: "addUserField",
      addUserButton: "addUserButton",
      addUserIcon: "addUserIcon",
      addUserIconEnabled: "addUserIconEnabled"
    },
    values: {
      users: []
    },
    setFieldValue: jest.fn()
  };

  let renderCallbackArgs = {
    field: {},
    form: {},
    meta: {}
  };

  const setTextFieldValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    renderCallbackArgs = {
      field: {},
      form: {},
      meta: {}
    };
  });

  it("should render successfully", () => {
    expect(toJson(shallow(<UsersField {...props} />))).toMatchSnapshot();
  });

  it("should render its child component successfully", () => {
    const wrapper = shallow(<UsersField {...props} />).prop("children")(
      renderCallbackArgs
    );
    expect(toJson(shallow(wrapper))).toMatchSnapshot();
  });

  it("should set the TextField disabled value to true if the length of the meta prop's value property is greater than or equal to the max user count", () => {
    renderCallbackArgs = {
      ...renderCallbackArgs,
      meta: {
        value: ["a", "b", "c", "d", "e", "f"]
      }
    };
    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const textField = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserField)
    );
    expect(textField.prop("disabled")).toBeTruthy();
  });

  it("should set the TextField disabled value to false if the length of the meta prop's value property is less than the max user count", () => {
    renderCallbackArgs = {
      ...renderCallbackArgs,
      meta: {
        value: ["a", "b", "c"]
      }
    };
    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const textField = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserField)
    );
    expect(textField.prop("disabled")).toBeFalsy();
  });

  it("should set the TextField value prop to the textFieldValue state value", () => {
    const textFieldValue = "foo";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const textField = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserField)
    );
    expect(textField.prop("value")).toBe(textFieldValue);
  });

  it("should call the setTextFieldValue state update handler with the event target's value when the TextField experiences a change", () => {
    const textFieldValue = "foo";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const textField = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserField)
    );
    const newValue = "bar";
    textField.prop("onChange")({ target: { value: newValue } });
    expect(setTextFieldValue).toHaveBeenCalledWith(newValue);
  });

  it("should add a user and reset the TextField when the Enter key is pressed and Textfield is not disabled", () => {
    const textFieldValue = "foo";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const textField = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserField)
    );

    const newValue = "bar";
    textField.prop("onKeyPress")({
      key: "Enter",
      target: { value: newValue },
      preventDefault: jest.fn()
    });
    expect(props.setFieldValue).toHaveBeenCalledWith("users", [newValue]);
    expect(setTextFieldValue).toHaveBeenCalledWith("");
  });

  it("should add a user when the add user button is clicked", () => {
    const textFieldValue = "foo";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const addUserButton = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserButton)
    );
    addUserButton.prop("onClick")();
    expect(props.setFieldValue).toHaveBeenCalledWith("users", [textFieldValue]);
  });

  it("should set the add user button to disabled if the text field value is blank", () => {
    const textFieldValue = "";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const addUserButton = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserButton)
    );
    expect(addUserButton.prop("disabled")).toBeTruthy();
  });

  it("should set the add user button to disabled if the max user count has been reached", () => {
    renderCallbackArgs = {
      ...renderCallbackArgs,
      meta: {
        value: ["a", "b", "c", "d", "e", "f"]
      }
    };
    const textFieldValue = "foo";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const addUserButton = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserButton)
    );
    expect(addUserButton.prop("disabled")).toBeTruthy();
  });

  it("should set enabled styles to the add user icon if the text field is not blank", () => {
    const textFieldValue = "foo";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const addUserIcon = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserIconEnabled)
    );
    expect(addUserIcon.prop("path")).toBe(mdiAccountPlus);
  });

  it("should hide the chips label if the formik field value is not defined", () => {
    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    const chipsLabel = wrapper.findWhere(n =>
      n.hasClass(props.classes.chipsLabelHidden)
    );
    expect(chipsLabel.length).toBe(1);
  });

  it("should render a Chip for each added user", () => {
    const users = ["a", "b", "c"];
    renderCallbackArgs = {
      ...renderCallbackArgs,
      field: {
        value: users
      }
    };
    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    expect(wrapper.find(Chip).length).toBe(users.length);
  });

  it("should set the Chips' label to the added user's SteamID", () => {
    const users = ["a", "b", "c"];
    renderCallbackArgs = {
      ...renderCallbackArgs,
      field: {
        value: users
      }
    };
    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    wrapper.find(Chip).forEach((chip, index) => {
      expect(chip.prop("label")).toBe(users[index]);
    });
  });

  it("should remove a user if the Chip's onDelete prop is called", () => {
    const users = ["a", "b"];
    renderCallbackArgs = {
      ...renderCallbackArgs,
      field: {
        value: users
      }
    };
    const newProps = {
      ...props,
      values: {
        users
      }
    };
    const wrapper = shallow(
      shallow(<UsersField {...newProps} />).prop("children")(renderCallbackArgs)
    );
    wrapper
      .find(Chip)
      .at(0)
      .prop("onDelete")();
    expect(newProps.setFieldValue).toHaveBeenCalledWith("users", [users[1]]);
  });

  it("should set outlined and deleteIcon classes for the Chips", () => {
    const users = ["a"];
    renderCallbackArgs = {
      ...renderCallbackArgs,
      field: {
        value: users
      }
    };
    const wrapper = shallow(
      shallow(<UsersField {...props} />).prop("children")(renderCallbackArgs)
    );
    expect(wrapper.find(Chip).prop("classes")).toEqual({
      outlined: props.classes.chip,
      deleteIcon: props.classes.deleteIcon
    });
  });
});
