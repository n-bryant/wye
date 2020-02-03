import { HeroImage } from "./HeroImage";

describe("HeroImage", () => {
  const props = {
    classes: {
      image: "image",
      imageSquaredBottom: "imageSquaredBottom",
      imageHidden: "imageHidden",
      placeholder: "placeholder",
      placeholderHidden: "placeholderHidden"
    },
    altText: "alt",
    src: "src"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const wrapper = shallow(<HeroImage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should update the src of the image if the image fails to load", () => {
    const hasBrokenSrc = false;
    const setHasBrokenSrc = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [hasBrokenSrc, setHasBrokenSrc]);
    const wrapperWithState = shallow(<HeroImage {...props} />);
    const image = wrapperWithState.findWhere(n =>
      n.hasClass(props.classes.image)
    );
    image.prop("onError")();
    expect(setHasBrokenSrc).toHaveBeenCalledWith(true);
  });

  it("should update the loaded status of the image once the image has loaded", () => {
    const loaded = false;
    const setLoaded = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [loaded, setLoaded]);

    const wrapperWithState = shallow(<HeroImage {...props} />);
    const image = wrapperWithState.findWhere(n =>
      n.hasClass(props.classes.image)
    );
    image.prop("onLoad")();
    expect(setLoaded).toHaveBeenCalledWith(true);
  });
});
