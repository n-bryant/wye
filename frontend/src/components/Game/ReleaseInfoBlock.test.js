import Icon from "@mdi/react";
import { mdiGoogleController, mdiGoogleControllerOff } from "@mdi/js";
import { ReleaseInfoBlock } from "./ReleaseInfoBlock";

describe("ReleaseInfoBlock", () => {
  const props = {
    classes: {
      root: "root",
      withAdjustedPadding: "withAdjustedPadding",
      headerImgContainer: "headerImgContainer",
      headerImg: "headerImg",
      headerImgHidden: "headerImgHidden",
      infoContainer: "infoContainer",
      infoType: "infoType",
      iconContainer: "iconContainer",
      link: "link",
      icon: "icon"
    },
    width: "sm",
    mdWidth: 5,
    data: {
      name: "name",
      headerImageUrl: "headerImageUrl",
      shortDescription: "shortDescription",
      platforms: ["windows", "mac", "linux", "fake"],
      controllerSupport: "full",
      developers: ["developer1", "developer2"],
      publishers: ["publishers"],
      releaseDate: "releaseDate",
      website: "website"
    }
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ReleaseInfoBlock {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should adjust the padding if the width prop value is 'xs' or 'sm'", () => {
    // sm/xs
    expect(
      wrapper.findWhere(n => n.hasClass(props.classes.withAdjustedPadding))
        .length
    ).toBe(1);
    wrapper.setProps({
      width: "xs"
    });
    wrapper.update();
    expect(
      wrapper.findWhere(n => n.hasClass(props.classes.withAdjustedPadding))
        .length
    ).toBe(1);

    // md
    wrapper.setProps({
      width: "md"
    });
    wrapper.update();
    expect(
      wrapper.findWhere(n => n.hasClass(props.classes.withAdjustedPadding))
        .length
    ).toBe(0);
  });

  it("should set the controller icon based on the controllerSupport value of the data prop", () => {
    // "full"
    expect(
      wrapper
        .find(Icon)
        .at(4)
        .prop("path")
    ).toBe(mdiGoogleController);

    // "partial"
    wrapper.setProps({
      data: {
        ...props.data,
        controllerSupport: "partial"
      }
    });
    wrapper.update();
    expect(
      wrapper
        .find(Icon)
        .at(4)
        .prop("path")
    ).toBe(mdiGoogleController);

    // undefined
    wrapper.setProps({
      data: {
        ...props.data,
        controllerSupport: undefined
      }
    });
    wrapper.update();
    expect(
      wrapper
        .find(Icon)
        .at(4)
        .prop("path")
    ).toBe(mdiGoogleControllerOff);
  });
});
