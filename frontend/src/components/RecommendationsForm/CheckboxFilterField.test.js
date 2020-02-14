import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CheckboxFilterField } from "./CheckboxFilterField";

describe("CheckboxFilterField", () => {
  const props = {
    classes: {
      root: "root",
      checkbox: "checkbox",
      label: "label",
      optionsContainer: "optionsContainer",
      checkboxChecked: "checkboxChecked",
      options: "options"
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
  let currentPage;
  let setCurrentPage;
  beforeEach(() => {
    currentPage = 1;
    setCurrentPage = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [currentPage, setCurrentPage]);
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

  it("should increment the current page when scrolled to the offset value", () => {
    wrapper
      .find("div")
      .at(1)
      .prop("onScroll")({
      target: {
        scrollTop: 500,
        getBoundingClientRect: jest.fn(() => ({ height: 250 })),
        firstElementChild: {
          getBoundingClientRect: jest.fn(() => ({ height: 200 }))
        }
      }
    });
    expect(setCurrentPage).toHaveBeenCalledWith(currentPage + 1);
  });
});
