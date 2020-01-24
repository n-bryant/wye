import GameDetailsWithContext, { GameDetails } from "./GameDetails";
import MediaCarousel from "./MediaCarousel";
import { ACTIONS, CONTENT_OPTIONS } from "../../../pages/_app";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe("GameDetailsWithContext", () => {
  it("should pass a users value and a dispatch value from context to its rendered child", () => {
    const renderCallbackArgs = {
      state: {
        users: ["foo"]
      },
      dispatch: jest.fn()
    };
    const props = {
      fizz: "buzz"
    };

    const wrapper = shallow(<GameDetailsWithContext {...props} />);
    expect(wrapper.prop("children")(renderCallbackArgs).props.users).toBe(
      renderCallbackArgs.state.users
    );
    expect(wrapper.prop("children")(renderCallbackArgs).props.dispatch).toBe(
      renderCallbackArgs.dispatch
    );
    expect(wrapper.prop("children")(renderCallbackArgs).props.fizz).toBe(
      props.fizz
    );
  });
});

describe("GameDetails", () => {
  const props = {
    classes: {
      root: "root",
      loaded: "loaded",
      backgroundPlaceholder: "backgroundPlaceholder",
      detailsContainer: "detailsContainer",
      detailsContainerWithMaxWidth: "detailsContainerWithMaxWidth",
      recommendationsButton: "recommendationsButton",
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
    users: [],
    dispatch: jest.fn(),
    width: "md"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const wrapper = shallow(<GameDetails {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set the content to the form when the recommendations button is clicked if there are no users", () => {
    const wrapper = shallow(<GameDetails {...props} />);
    wrapper
      .findWhere(n =>
        n.hasClass(`wye-GameDetails__${props.classes.recommendationsButton}`)
      )
      .prop("onClick")();
    expect(props.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.SET_CONTENT,
      value: CONTENT_OPTIONS.FORM
    });
  });

  it("should set the content to recommendations when the recommendations button is clicked if there are users", () => {
    const wrapper = shallow(<GameDetails {...props} />);
    wrapper.setProps({
      users: ["foo"]
    });
    wrapper.update();
    wrapper
      .findWhere(n =>
        n.hasClass(`wye-GameDetails__${props.classes.recommendationsButton}`)
      )
      .prop("onClick")();
    expect(props.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.SET_CONTENT,
      value: CONTENT_OPTIONS.RECOMMENDATIONS
    });
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
