import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CheckboxFilterField } from "./CheckboxFilterField";

describe("CheckboxFilterField", () => {
  const props = {
    classes: {
      root: "root",
      checkbox: "checkbox",
      label: "label",
      optionsContainer: "optionsContainer",
      checkboxChecked: "checkboxChecked"
    },
    name: "name",
    category: "gameFilters",
    label: "label",
    type: "ownedBy",
    value: {
      gameFilters: {}
    },
    setFieldValue: jest.fn(),
    options: ["optionA", "optionB"]
  };

  let wrapper;
  beforeEach(() => {
    const checkedOptions = {
      optionA: false,
      optionB: false
    };
    const setCheckedOptions = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [checkedOptions, setCheckedOptions]);
    wrapper = shallow(<CheckboxFilterField {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should update the formik field value when a change occurs", () => {
    shallow(
      wrapper
        .find(FormControlLabel)
        .at(0)
        .prop("control")
    ).prop("onChange")({ target: { checked: true } });
    expect(props.setFieldValue).toHaveBeenCalledWith(props.name, {
      gameFilters: {
        [props.type]: ["optionA"]
      }
    });
  });
});
