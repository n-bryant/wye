import { mdiAccountPlus } from "@mdi/js";
import Chip from "@material-ui/core/Chip";
import { UsersField } from "./UsersField";

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
      addUserIconEnabled: "addUserIconEnabled",
      addUserIconDisabled: "addUserIconDisabled"
    },
    name: "field",
    value: [],
    setFieldValue: jest.fn()
  };

  const setTextFieldValue = jest.fn();

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<UsersField {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set the TextField disabled value to true if the length of the usersValue prop is greater than or equal to the max user count", () => {
    const textField = wrapper.findWhere(n =>
      n.hasClass(props.classes.addUserField)
    );
    expect(textField.prop("disabled")).toBeFalsy();

    wrapper.setProps({
      ...props,
      value: ["a", "b", "c", "d", "e", "f"]
    });
    wrapper.update();
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.addUserField))
        .prop("disabled")
    ).toBeTruthy();
  });

  it("should set the TextField value prop to the textFieldValue state value", () => {
    const textFieldValue = "foo";
    const setTextFieldValue = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapperWithState = shallow(<UsersField {...props} />);
    const textField = wrapperWithState.findWhere(n =>
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

    const wrapperWithState = shallow(<UsersField {...props} />);
    const textField = wrapperWithState.findWhere(n =>
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

    const wrapperWithState = shallow(<UsersField {...props} />);
    const textField = wrapperWithState.findWhere(n =>
      n.hasClass(props.classes.addUserField)
    );

    const newValue = "bar";
    textField.prop("onKeyPress")({
      key: "Enter",
      target: { value: newValue },
      preventDefault: jest.fn()
    });
    expect(props.setFieldValue).toHaveBeenCalledWith(props.name, [newValue]);
  });

  it("should add a user when the add user button is clicked", () => {
    const textFieldValue = "foo";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapperWithState = shallow(<UsersField {...props} />);
    const addUserButton = wrapperWithState.findWhere(n =>
      n.hasClass(props.classes.addUserButton)
    );
    addUserButton.prop("onClick")();
    expect(props.setFieldValue).toHaveBeenCalledWith(props.name, [
      textFieldValue
    ]);
  });

  it("should set the add user button to disabled if the text field value is blank", () => {
    const textFieldValue = "";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapperWithState = shallow(<UsersField {...props} />);
    const addUserButton = wrapperWithState.findWhere(n =>
      n.hasClass(props.classes.addUserButton)
    );
    expect(addUserButton.prop("disabled")).toBeTruthy();
  });

  it("should set the add user button to disabled if the max user count has been reached", () => {
    const newProps = {
      ...props,
      value: ["a", "b", "c", "d", "e", "f"]
    };
    const textFieldValue = "foo";
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [
      textFieldValue,
      setTextFieldValue
    ]);

    const wrapperWithState = shallow(<UsersField {...newProps} />);
    const addUserButton = wrapperWithState.findWhere(n =>
      n.hasClass(newProps.classes.addUserButton)
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

    const wrapperWithState = shallow(<UsersField {...props} />);

    const addUserIcon = wrapperWithState.findWhere(n =>
      n.hasClass(props.classes.addUserIconEnabled)
    );
    expect(addUserIcon.prop("path")).toBe(mdiAccountPlus);
  });

  it("should render a Chip for each added user", () => {
    const value = ["a", "b", "c"];
    wrapper.setProps({
      value
    });
    wrapper.update();

    expect(wrapper.find(Chip).length).toBe(value.length);
  });

  it("should set the Chips' label to the added user's SteamID", () => {
    const value = ["a", "b", "c"];
    wrapper.setProps({
      value
    });
    wrapper.update();
    wrapper.find(Chip).forEach((chip, index) => {
      expect(chip.prop("label")).toBe(value[index]);
    });
  });

  it("should set outlined and deleteIcon classes for the Chips", () => {
    const value = ["a"];
    wrapper.setProps({
      value
    });
    wrapper.update();
    expect(wrapper.find(Chip).prop("classes")).toEqual({
      outlined: props.classes.chip,
      deleteIcon: props.classes.deleteIcon
    });
  });
});
