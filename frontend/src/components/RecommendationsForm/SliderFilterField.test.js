import { Slider } from "@material-ui/core";
import { SliderFilterField } from "./SliderFilterField";

describe("SliderFilterField", () => {
  const props = {
    classes: {
      root: "root",
      label: "label",
      sliderRoot: "sliderRoot",
      thumb: "thumb",
      track: "track",
      rail: "rail",
      valueLabelContainer: "valueLabelContainer"
    },
    name: "name",
    label: "label",
    min: 0,
    max: 100,
    minType: "discount_lte",
    maxType: "discount_gte",
    value: {
      gameFilters: {}
    },
    setFieldValue: jest.fn(),
    labelFormatHandler: jest.fn(x => `${x}%`)
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SliderFilterField {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should update the formik field value when a change occurs", () => {
    wrapper.find(Slider).prop("onChange")({}, [25, 75]);
    expect(props.setFieldValue).toHaveBeenCalledWith(props.name, {
      gameFilters: {
        [props.minType]: 25,
        [props.maxType]: 75
      }
    });
  });
});
