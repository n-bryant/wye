import { Index } from "./index";
describe("index", () => {
  const props = {
    classes: {
      root: "root",
      container: "container",
      form: "form",
      main: "main",
      contentContainer: "contentContainer",
      content: "content"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<Index {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
