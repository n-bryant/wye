import { Under10Page } from "./index";

describe("Under10Page", () => {
  const props = {
    classes: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    expect(toJson(shallow(<Under10Page {...props} />))).toMatchSnapshot();
  });
});
