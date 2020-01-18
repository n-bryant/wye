import { CONTENT_OPTIONS, ACTIONS } from "./_app";
import { Index } from "./index";
import RecommendationsForm from "../src/components/RecommendationsForm";
import RecommendationsGrid from "../src/components/RecommendationsGrid";

describe("index", () => {
  const props = {
    classes: {
      root: "root",
      container: "container",
      form: "form",
      main: "main",
      contentContainer: "contentContainer",
      content: "content"
    },
    content: CONTENT_OPTIONS.WELCOME
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const wrapper = shallow(<Index {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render the recommendations form if the content state value is set to the form content option", () => {
    const propsWithFormContent = {
      ...props,
      content: CONTENT_OPTIONS.FORM
    };
    const wrapper = shallow(<Index {...propsWithFormContent} />);
    expect(wrapper.find(RecommendationsForm).length).toBe(1);
  });

  it("should render the recommendations grid if the content state value is set to the recommendations content option", () => {
    const propsWithFormContent = {
      ...props,
      content: CONTENT_OPTIONS.RECOMMENDATIONS
    };
    const wrapper = shallow(<Index {...propsWithFormContent} />);
    expect(wrapper.find(RecommendationsGrid).length).toBe(1);
  });
});
