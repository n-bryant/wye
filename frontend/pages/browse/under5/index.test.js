import { Under5Page } from "./index";

describe("Under5Page", () => {
  const props = {
    classes: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    expect(toJson(shallow(<Under5Page {...props} />))).toMatchSnapshot();
  });
});
