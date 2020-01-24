import { BrowsePage } from "./index";

describe("BrowsePage", () => {
  const props = {
    classes: {
      root: "root",
      container: "container",
      main: "main",
      heading: "heading",
      subHeading: "subHeading"
    }
  };

  it("should render successfully", () => {
    expect(toJson(shallow(<BrowsePage {...props} />))).toMatchSnapshot();
  });
});
