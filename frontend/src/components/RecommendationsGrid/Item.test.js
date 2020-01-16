import { Grid, Typography } from "@material-ui/core/";
import { mdiThumbUpOutline, mdiThumbDownOutline } from "@mdi/js";

import { Item } from "./Item";

describe("Item", () => {
  const props = {
    classes: {
      root: "root",
      gamePageLink: "gamePageLink",
      paper: "paper",
      titleBar: "titleBar",
      titleBarHidden: "titleBarHidden",
      gameTitle: "gameTitle",
      gameImage: "gameImage",
      paperOverlayContainer: "paperOverlayContainer",
      paperOverlayContainerHidden: "paperOverlayContainerHidden",
      userReviewContainer: "userReviewContainer",
      userReviewIcon: "userReviewIcon",
      userReviewIconNegative: "userReviewIconNegative",
      playerContainer: "playerContainer",
      avatar: "avatar",
      playerInfo: "playerInfo",
      playerInfoType: "playerInfoType",
      playerInfoTypeEmpty: "playerInfoTypeEmpty",
      categoriesContainer: "categoriesContainer",
      categoryTitle: "categoryTitle",
      priceContainer: "priceContainer",
      discountPercent: "discountPercent",
      discountPercentHidden: "discountPercentHidden",
      prices: "prices",
      initialPrice: "initialPrice",
      initialPriceHidden: "initialPriceHidden",
      finalPrice: "finalPrice"
    },
    data: {
      game: {
        appid: "1",
        name: "foo",
        userRating: 100,
        developers: ["dev1"],
        publishers: ["pub1", "pub2"],
        genres: ["genre1", "genre2", "genre3"],
        tags: ["tag1", "tag2"],
        onSale: true,
        freeToPlay: false,
        discount: 25,
        initialPrice: 1000,
        finalPrice: 7500
      },
      ownedBy: ["1"],
      recentlyPlayedBy: ["1"]
    },
    userDetails: [{ id: "1", avatarImageUrl: "avatarUrl" }],
    featured: true
  };

  it("should render successfully", () => {
    const wrapper = shallow(<Item {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set the item size based on whether it is a featured item or not", () => {
    const wrapper = shallow(<Item {...props} />);
    expect(
      wrapper
        .find(Grid)
        .at(0)
        .prop("md")
    ).toBe(10);

    wrapper.setProps({
      ...props,
      featured: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(Grid)
        .at(0)
        .prop("md")
    ).toBe(6);
  });

  it("should show the overlay when hovered", () => {
    const showOverlay = false;
    const setShowOverlay = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [showOverlay, setShowOverlay]);
    const wrapper = shallow(<Item {...props} />);
    wrapper
      .findWhere(n => n.hasClass(props.classes.paper))
      .prop("onMouseEnter")();
    expect(setShowOverlay).toHaveBeenCalledWith(true);
  });

  it("should hide the overlay when no longer hovered", () => {
    const showOverlay = true;
    const setShowOverlay = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [showOverlay, setShowOverlay]);
    const wrapper = shallow(<Item {...props} />);
    wrapper
      .findWhere(n => n.hasClass(props.classes.paper))
      .prop("onMouseLeave")();
    expect(setShowOverlay).toHaveBeenCalledWith(false);
  });

  describe("overlay", () => {
    let wrapper;
    beforeEach(() => {
      const showOverlay = true;
      const setShowOverlay = jest.fn();
      const useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation(() => [showOverlay, setShowOverlay]);
      wrapper = shallow(<Item {...props} />);
    });

    it("should show render a mdiThumbUpOutline if the game has a positive rating", () => {
      expect(
        wrapper
          .findWhere(n => n.hasClass(props.classes.userReviewIcon))
          .prop("path")
      ).toBe(mdiThumbUpOutline);
    });

    it("should render 'n/a' for owned by and recently played by if those values are empty", () => {
      const newProps = {
        classes: {
          root: "root",
          gamePageLink: "gamePageLink",
          paper: "paper",
          titleBar: "titleBar",
          titleBarHidden: "titleBarHidden",
          gameTitle: "gameTitle",
          gameImage: "gameImage",
          paperOverlayContainer: "paperOverlayContainer",
          paperOverlayContainerHidden: "paperOverlayContainerHidden",
          userReviewContainer: "userReviewContainer",
          userReviewIcon: "userReviewIcon",
          userReviewIconNegative: "userReviewIconNegative",
          playerContainer: "playerContainer",
          avatar: "avatar",
          playerInfo: "playerInfo",
          playerInfoType: "playerInfoType",
          playerInfoTypeEmpty: "playerInfoTypeEmpty",
          categoriesContainer: "categoriesContainer",
          categoryTitle: "categoryTitle",
          priceContainer: "priceContainer",
          discountPercent: "discountPercent",
          discountPercentHidden: "discountPercentHidden",
          prices: "prices",
          initialPrice: "initialPrice",
          initialPriceHidden: "initialPriceHidden",
          finalPrice: "finalPrice"
        },
        data: {
          game: {
            appid: "1",
            name: "foo",
            userRating: 4,
            developers: ["dev1"],
            publishers: ["pub1", "pub2"],
            genres: ["genre1", "genre2", "genre3"],
            tags: ["tag1", "tag2"],
            onSale: true,
            freeToPlay: false,
            discount: 25,
            initialPrice: 1000,
            finalPrice: 7500
          },
          ownedBy: ["1"],
          recentlyPlayedBy: ["1"]
        },
        userDetails: [{ id: "1", avatarImageUrl: "avatarUrl" }],
        featured: true
      };
      const newWrapper = shallow(<Item {...newProps} />);
      expect(
        newWrapper
          .findWhere(n => n.hasClass(newProps.classes.userReviewIcon))
          .prop("path")
      ).toBe(mdiThumbDownOutline);
    });

    it("should hide the discount and initial price info if the game is not on sale", () => {
      const newProps = {
        classes: {
          root: "root",
          gamePageLink: "gamePageLink",
          paper: "paper",
          titleBar: "titleBar",
          titleBarHidden: "titleBarHidden",
          gameTitle: "gameTitle",
          gameImage: "gameImage",
          paperOverlayContainer: "paperOverlayContainer",
          paperOverlayContainerHidden: "paperOverlayContainerHidden",
          userReviewContainer: "userReviewContainer",
          userReviewIcon: "userReviewIcon",
          userReviewIconNegative: "userReviewIconNegative",
          playerContainer: "playerContainer",
          avatar: "avatar",
          playerInfo: "playerInfo",
          playerInfoType: "playerInfoType",
          playerInfoTypeEmpty: "playerInfoTypeEmpty",
          categoriesContainer: "categoriesContainer",
          categoryTitle: "categoryTitle",
          priceContainer: "priceContainer",
          discountPercent: "discountPercent",
          discountPercentHidden: "discountPercentHidden",
          prices: "prices",
          initialPrice: "initialPrice",
          initialPriceHidden: "initialPriceHidden",
          finalPrice: "finalPrice"
        },
        data: {
          game: {
            appid: "1",
            name: "foo",
            userRating: 4,
            developers: ["dev1"],
            publishers: ["pub1", "pub2"],
            genres: ["genre1", "genre2", "genre3"],
            tags: ["tag1", "tag2"],
            onSale: false,
            freeToPlay: false,
            discount: 0,
            initialPrice: 7500,
            finalPrice: 7500
          },
          ownedBy: ["1"],
          recentlyPlayedBy: ["1"]
        },
        userDetails: [{ id: "1", avatarImageUrl: "avatarUrl" }],
        featured: true
      };
      const newWrapper = shallow(<Item {...newProps} />);
      expect(
        newWrapper.findWhere(n =>
          n.hasClass(newProps.classes.discountPercentHidden)
        ).length
      ).toBe(1);
      expect(
        newWrapper.findWhere(n =>
          n.hasClass(newProps.classes.initialPriceHidden)
        ).length
      ).toBe(1);
    });

    it("should render 'Free to Play' for the price if the game is free", () => {
      const newProps = {
        classes: {
          root: "root",
          gamePageLink: "gamePageLink",
          paper: "paper",
          titleBar: "titleBar",
          titleBarHidden: "titleBarHidden",
          gameTitle: "gameTitle",
          gameImage: "gameImage",
          paperOverlayContainer: "paperOverlayContainer",
          paperOverlayContainerHidden: "paperOverlayContainerHidden",
          userReviewContainer: "userReviewContainer",
          userReviewIcon: "userReviewIcon",
          userReviewIconNegative: "userReviewIconNegative",
          playerContainer: "playerContainer",
          avatar: "avatar",
          playerInfo: "playerInfo",
          playerInfoType: "playerInfoType",
          playerInfoTypeEmpty: "playerInfoTypeEmpty",
          categoriesContainer: "categoriesContainer",
          categoryTitle: "categoryTitle",
          priceContainer: "priceContainer",
          discountPercent: "discountPercent",
          discountPercentHidden: "discountPercentHidden",
          prices: "prices",
          initialPrice: "initialPrice",
          initialPriceHidden: "initialPriceHidden",
          finalPrice: "finalPrice"
        },
        data: {
          game: {
            appid: "1",
            name: "foo",
            userRating: 4,
            developers: ["dev1"],
            publishers: ["pub1", "pub2"],
            genres: ["genre1", "genre2", "genre3"],
            tags: ["tag1", "tag2"],
            onSale: true,
            freeToPlay: true,
            discount: 0,
            initialPrice: 0,
            finalPrice: 0
          },
          ownedBy: ["1"],
          recentlyPlayedBy: ["1"]
        },
        userDetails: [{ id: "1", avatarImageUrl: "avatarUrl" }],
        featured: true
      };
      const newWrapper = shallow(<Item {...newProps} />);
      expect(
        newWrapper
          .findWhere(n => n.hasClass(newProps.classes.finalPrice))
          .find(Typography)
          .text()
      ).toBe("Free to Play");
    });
  });
});
