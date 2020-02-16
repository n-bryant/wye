import MediaCarousel from "./MediaCarousel";
import RequirementsBlock from "./RequirementsBlock";
import GameArticles from "./GameArticles";
import { GameDetails } from "./GameDetails";

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
        videos: [],
        requirements: {
          minimum: ""
        }
      },
      articles: [
        {
          url: "url",
          title: "title",
          printDate: "date"
        }
      ]
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

  it("should not render the requirements block if there is no requirements info", () => {
    const propsWithoutRequirements = {
      ...props,
      data: {
        ...props.data,
        details: {
          ...props.data.details,
          requirements: null
        }
      }
    };
    const wrapper = shallow(<GameDetails {...propsWithoutRequirements} />);
    expect(wrapper.find(RequirementsBlock).length).toBe(0);
  });

  it("should not render the articles block if there are no articles", () => {
    const propsWithoutArticles = {
      ...props,
      data: {
        ...props.data,
        articles: []
      }
    };
    const wrapper = shallow(<GameDetails {...propsWithoutArticles} />);
    expect(wrapper.find(GameArticles).length).toBe(0);
  });
});
