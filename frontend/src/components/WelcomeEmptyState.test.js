import { WelcomeEmptyState } from "./WelcomeEmptyState";

describe("WelcomeEmptyState", () => {
  const props = {
    classes: {
      root: "root",
      welcomeMessageContainer: "welcomeMessageContainer",
      title: "title",
      message: "message",
      instructionsContainer: "instructionsContainer",
      link: "link"
    }
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WelcomeEmptyState {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
