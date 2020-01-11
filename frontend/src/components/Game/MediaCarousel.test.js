import Icon from "@mdi/react";
import { mdiPlay } from "@mdi/js";
import Button from "@material-ui/core/Button";
import { MediaCarousel, MEDIA_TYPES } from "./MediaCarousel";

describe("MediaCarousel", () => {
  const props = {
    classes: {
      root: "root",
      featuredItemContainer: "featuredItemContainer",
      featuredItemSpacer: "featuredItemSpacer",
      featuredItem: "featuredItem",
      featuredItemHidden: "featuredItemHidden",
      featuredItemWrapper: "featuredItemWrapper",
      thumbnailsContainer: "thumbnailsContainer",
      setFeaturedButtonContainer: "setFeaturedButtonContainer",
      setFeaturedButton: "setFeaturedButton",
      thumbnail: "thumbnail",
      playIconContainer: "playIconContainer",
      playIcon: "playIcon"
    },
    media: [
      {
        id: "1",
        thumbnailUrl: "thumb1",
        fullsizeUrl: "full1",
        title: "title1"
      },
      {
        id: "2",
        thumbnailUrl: "thumb2",
        fullsizeUrl: "full2"
      }
    ]
  };

  let setFeaturedItem;
  beforeEach(() => {
    const featuredItem = {
      item: {
        ...props.media[0]
      },
      type: MEDIA_TYPES.VIDEO
    };
    setFeaturedItem = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [featuredItem, setFeaturedItem]);
  });

  it("should render successfully", () => {
    const wrapper = shallow(<MediaCarousel {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should display a play icon on video thumbnails", () => {
    const wrapper = shallow(<MediaCarousel {...props} />);
    expect(
      wrapper
        .find(Button)
        .at(0)
        .find(Icon)
        .prop("path")
    ).toBe(mdiPlay);
    expect(
      wrapper
        .find(Button)
        .at(1)
        .find(Icon).length
    ).toBe(0);
  });

  it("should update the featured item when a thumbnail is clicked", () => {
    const wrapper = shallow(<MediaCarousel {...props} />);
    wrapper
      .find(Button)
      .at(1)
      .prop("onClick")();
    expect(setFeaturedItem).toHaveBeenCalledWith({
      item: props.media[1],
      type: MEDIA_TYPES.IMG
    });
  });
});
