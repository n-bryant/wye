import { GameDetails } from "./GameDetails";
import MediaCarousel from "./MediaCarousel";

jest.mock("next/router", () => ({
  useRouter: () => ({
    back: jest.fn()
  })
}));

describe("GameDetails", () => {
  const props = {
    classes: {
      root: "root",
      detailsContainer: "detailsContainer",
      detailsInnerContainer: "detailsInnerContainer",
      detailsInnerContainerWithMaxWidth: "detailsInnerContainerWithMaxWidth",
      detailsContainerWithMdWidth: "detailsContainerWithMdWidth",
      detailsContainerWithMaxWidth: "detailsContainerWithMaxWidth",
      priceContainer: "priceContainer",
      priceContainerWithSmWidth: "priceContainerWithSmWidth",
      backButton: "backButton",
      icon: "icon"
    },
    data: {
      details: {
        highlightedVideos: [{}],
        screenshots: [],
        videos: []
      },
      articles: []
    },
    width: "md"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const wrapper = shallow(<GameDetails {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should not render the MediaCarousel if there is no media to render", () => {
    const wrapper = shallow(<GameDetails {...props} />);
    wrapper.setProps({
      data: {
        details: {
          ...props.data.details,
          highlightedVideos: []
        }
      }
    });
    wrapper.update();
    expect(wrapper.find(MediaCarousel).length).toBe(0);
  });
});
