import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import HeroImage from "../Game/HeroImage";
import Popper from "../Popper";
import HighlightTrailerQuery, {
  BrowseCard,
  StyledBrowseCard,
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
      media: "media",
      mediaHeader: "mediaHeader",
      mediaSm: "mediaSm",
      mediaMd: "mediaMd",
      mediaLg: "mediaLg",
      mediaLib: "mediaLib",
      content: "content",
      title: "title",
      category: "category",
      genresContainer: "genresContainer",
      chip: "chip",
      chipLabel: "chipLabel",
      trailer: "trailer",
      actionArea: "actionArea",
      priceWidget: "priceWidget"
    },
    data: {
      appid: "1",
      name: "foo",
      publishers: ["a", "b"],
      developers: ["a", "b"],
      userRating: 93,
      owners: {
        formatted: "10,000 .. 20,000"
      },
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

  it("should render successfully", () => {
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
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HighlightTrailerQuery {...props} />
      </MockedProvider>
    );
    expect(toJson(wrapper.find(HighlightTrailerQuery))).toMatchSnapshot();
  });
});
