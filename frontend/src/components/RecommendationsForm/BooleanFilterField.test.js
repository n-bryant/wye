import Switch from "@material-ui/core/Switch";
import { BooleanFilterField } from "./BooleanFilterField";

describe("BooleanFilterField", () => {
  const props = {
    classes: {
      root: "root",
      label: "label",
      switch: "switch",
      switchChecked: "switchChecked"
    },
    name: "name",
    label: "label",
    type: "freeToPlay",
    value: {
      gameFilters: {}
    },
    setFieldValue: jest.fn()
  };

  let wrapper;
  beforeEach(() => {
    const checked = false;
    const setChecked = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [checked, setChecked]);
    wrapper = shallow(<BooleanFilterField {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should update the formik field value when a change occurs", () => {
    wrapper.find(Switch).prop("onChange")({ target: { checked: true } });
    expect(props.setFieldValue).toHaveBeenCalledWith(props.name, {
      gameFilters: {
        [props.type]: true
      }
    });
  });
});
