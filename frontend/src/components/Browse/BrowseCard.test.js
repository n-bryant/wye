import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/react-testing";

import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";

import HeroImage from "../Game/HeroImage";
import Popper from "../Popper";
import HighlightTrailerQuery, {
  BrowseCard,
  VARIANTS_MAP,
  GET_HIGHLIGHT_TRAILER
} from "./BrowseCard";

describe("BrowseCard", () => {
  const props = {
    classes: {
      root: "root",
      header: "header",
      sm: "sm",
      md: "md",
      lg: "lg",
      lib: "lib",
      maxSize: "maxSize",
      media: "media",
      gameLinkHeader: "gameLinkHeader",
      gameLinkSm: "gameLinkSm",
      gameLinkMd: "gameLinkMd",
      gameLinkLg: "gameLinkLg",
      gameLinkLib: "gameLinkLib",
      gameLinkMaxSize: "gameLinkMaxSize",
      content: "content",
      title: "title",
      category: "category",
      genresContainer: "genresContainer",
      chip: "chip",
      chipLabel: "chipLabel",
      trailer: "trailer",
      actionArea: "actionArea",
      priceWidget: "priceWidget",
      gameLink: "gameLink",
      actionsContainer: "actionsContainer",
      actionLink: "actionLink",
      actionLinkLabel: "actionLinkLabel",
      horizontal: "horizontal",
      gameLinkHorizontal: "gameLinkHorizontal",
      gameLinkHorizontalWide: "gameLinkHorizontalWide",
      horizontalContent: "horizontalContent",
      horizontalContentWide: "horizontalContentWide",
      contentWrapper: "contentWrapper",
      horizontalTitle: "horizontalTitle",
      horizontalSubContent: "horizontalSubContent",
      usersContainer: "usersContainer"
    },
    data: {
      appid: "1",
      name: "foo",
      publishers: ["a", "b"],
      developers: ["a", "b"],
      userRating: 93,
      ownersFormatted: "10,000 .. 20,000",
      genres: ["a", "b", "c", "d", "e"],
      freeToPlay: true,
      onSale: false,
      discount: 0,
      initialPrice: 0,
      finalPrice: 0,
      headerImage: "header",
      capsuleSm: "small capsule",
      capsuleMd: "md capsule",
      capsuleLg: "lg capsule",
      libraryCapsule: "lib capsule"
    },
    variant: "header",
    trailerPath: "trailer"
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BrowseCard {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should apply variant styling based on the variant prop", () => {
    Object.keys(VARIANTS_MAP).forEach(variant => {
      wrapper.setProps({
        variant
      });
      wrapper.update();
      expect(wrapper.find(Card).hasClass(variant)).toBeTruthy();
      const heroImage = wrapper.find(HeroImage);
      expect(
        heroImage
          .props()
          .className.toLowerCase()
          .indexOf(`media${variant}`)
      ).toBeTruthy();
    });
  });

  it("should render a horizontal CardContent if the variant is horizontal", () => {
    wrapper.setProps({
      variant: "horizontal",
      userDetails: [
        {
          id: "1",
          profileUrl: "url",
          avatarName: "name",
          avatarImageUrl: "img",
          onlineStatus: "Online"
        }
      ],
      playtimeAndOwnershipData: {
        ownedBy: ["1"],
        recentlyPlayedBy: ["1"],
        playtime: [
          {
            steamId: "1",
            hoursPlayed: 3.5
          }
        ]
      }
    });
    wrapper.update();
    const horizontalContent = wrapper.findWhere(n =>
      n.hasClass(props.classes.horizontalContent)
    );
    expect(horizontalContent.length).toBe(1);
    expect(toJson(horizontalContent)).toMatchSnapshot();
  });

  it("should set the image src for the HeroImage based on the variant", () => {
    Object.keys(VARIANTS_MAP).forEach(variant => {
      wrapper.setProps({
        variant
      });
      wrapper.update();
      const heroImage = wrapper.find(HeroImage);
      expect(heroImage.prop("imageSrc")).toBe(
        props.data[VARIANTS_MAP[variant].image]
      );
    });
  });

  it("should render CardActions if the cardActionLabel, cardActionLinkPath, and cardActionHref props are defined", () => {
    wrapper.setProps({
      cardActionLabel: "label",
      cardActionLinkPath: "path",
      cardActionHref: "href"
    });
    wrapper.update();
    const cardActions = wrapper.find(CardActions);
    expect(cardActions.length).toBe(1);
    expect(toJson(cardActions)).toMatchSnapshot();
  });

  describe("popper content", () => {
    let wrapperWithState;
    beforeEach(() => {
      const anchorEl = {};
      const setAnchorEl = jest.fn();
      const useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation(() => [anchorEl, setAnchorEl]);
      wrapperWithState = shallow(<BrowseCard {...props} />);
    });

    it("should only render a Popper if an anchorEl is defined", () => {
      expect(wrapper.find(Popper).length).toBe(0);

      expect(wrapperWithState.find(Popper).length).toBe(1);
      expect(wrapperWithState.find(Popper)).toMatchSnapshot();
    });

    it("should render the headerImage if the trailerPath is not available", () => {
      expect(wrapperWithState.find("video").length).toBe(1);
      expect(wrapperWithState.find(Popper).find("img").length).toBe(0);

      wrapperWithState.setProps({
        trailerPath: ""
      });
      wrapperWithState.update();
      expect(wrapperWithState.find("video").length).toBe(0);
      const trailerSubstitute = wrapperWithState.find(Popper).find("img");
      expect(trailerSubstitute.prop("src")).toBe(props.data.headerImage);
    });

    it("should only render the first three genres available", () => {
      expect(wrapperWithState.find(Chip).length).toBe(3);
    });
  });
});

describe("HighlightTrailerQuery", () => {
  const props = {
    data: {
      appid: "foo"
    }
  };

  it("should render successfully", async () => {
    const mocks = [
      {
        request: {
          query: GET_HIGHLIGHT_TRAILER,
          variables: {
            gameId: "1"
          }
        },
        result: {
          data: {
            getHighlightTrailer: props.data.appid
          }
        }
      }
    ];
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <HighlightTrailerQuery {...props} />
        </MockedProvider>
      );
    });
    expect(toJson(wrapper.find(HighlightTrailerQuery))).toMatchSnapshot();
  });
});
