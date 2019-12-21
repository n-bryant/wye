import { Index } from "./index";
import toJson from "enzyme-to-json";

describe("index", () => {
  const props = {
    classes: {
      root: "root",
      container: "container",
      appBar: "appBar",
      toolBar: "toolBar",
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
