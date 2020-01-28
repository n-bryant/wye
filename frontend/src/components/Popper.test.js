import { getPopperProps, constants, Popper } from "./Popper";

describe("Popper", () => {
  const props = {
    classes: {
      root: "root",
      content: "content",
      arrow: "arrow",
      arrowLeft: "arrowLeft",
      arrowRight: "arrowRight"
    },
    anchorEl: {
      getBoundingClientRect: jest.fn(() => ({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: 0,
        width: 0
      }))
    },
    displayArrow: true,
    children: "foo"
  };

  let wrapper;
  beforeEach(() => {
    const displayProperties = {
      style: {},
      arrowStyle: {},
      arrowOrientation: constants.ARROW_ORIENTATION.LEFT
    };
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [displayProperties]);
    wrapper = shallow(<Popper {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set the arrow styles based on the arrow orientation value", () => {
    expect(
      wrapper.findWhere(n => n.hasClass(props.classes.arrowLeft)).length
    ).toBe(1);

    const displayProperties = {
      style: {},
      arrowStyle: {},
      arrowOrientation: constants.ARROW_ORIENTATION.RIGHT
    };
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [displayProperties]);
    const wrapperWithRightArrow = shallow(<Popper {...props} />);
    expect(
      wrapperWithRightArrow.findWhere(n => n.hasClass(props.classes.arrowRight))
        .length
    ).toBe(1);
  });
});

describe("getPopperProps", () => {
  let anchorRect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 250,
    height: 250
  };

  it("should return a style object with display none if there is no room on top", () => {
    window.innerHeight = constants.POPPER_HEIGHT - 1;
    expect(getPopperProps(anchorRect)).toMatchObject({
      style: {
        display: "none"
      }
    });
  });

  it("should set a left oriented arrow and appropriate styles if there is room to the right", () => {
    window.innerHeight = constants.POPPER_HEIGHT * 2;
    expect(getPopperProps(anchorRect)).toMatchObject({
      arrowOrientation: constants.ARROW_ORIENTATION.LEFT,
      arrowStyle: {
        top: `calc(${anchorRect.height}px / 4)`
      },
      style: {
        left: `${anchorRect.width + constants.POPPER_MARGIN}px`
      }
    });
  });

  it("should set a right oriented arrow and appropriate styles if there is no room to the right, but is room to the left", () => {
    window.innerHeight = constants.POPPER_HEIGHT * 2;
    window.innerWidth = constants.POPPER_WIDTH + 2;
    anchorRect = {
      ...anchorRect,
      left: constants.POPPER_WIDTH + constants.POPPER_MARGIN + 2,
      right: constants.POPPER_WIDTH + constants.POPPER_MARGIN + 1
    };
    expect(getPopperProps(anchorRect)).toMatchObject({
      arrowOrientation: constants.ARROW_ORIENTATION.RIGHT,
      arrowStyle: {
        top: `calc(${anchorRect.height}px / 4)`
      },
      style: {
        left: `-${constants.POPPER_WIDTH + constants.POPPER_MARGIN}px`
      }
    });
  });

  it("should set offsets and adjust styles if there is not room on the bottom", () => {
    window.innerHeight = constants.POPPER_HEIGHT + constants.HEADER_HEIGHT + 5;
    window.innerWidth = constants.POPPER_WIDTH + 2;
    anchorRect = {
      ...anchorRect,
      top: constants.POPPER_HEIGHT,
      left: constants.POPPER_WIDTH + constants.POPPER_MARGIN + 2,
      right: constants.POPPER_WIDTH + constants.POPPER_MARGIN + 1
    };
    expect(getPopperProps(anchorRect)).toMatchObject({
      arrowOrientation: "right",
      arrowStyle: { top: "calc(250px / 4 + -311px)" },
      style: { left: "-312px", top: 311 }
    });
  });
});
