import { IndexPageBackground } from "./IndexPageBackground";
import toJson from "enzyme-to-json";

describe("IndexPageBackground", () => {
  const props = {
    classes: {
      root: "root",
      panel: "panel",
      scrollContainer: "scrollContainer",
      scrollContainerStaggered: "scrollContainerStaggered",
      scrollForward: "scrollForward",
      scrollBackward: "scrollBackward"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<IndexPageBackground {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
