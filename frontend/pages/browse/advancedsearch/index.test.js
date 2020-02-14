import { AdvancedSearchPage } from "./index";

describe("AdvancedSearchPage", () => {
  const props = {
    classes: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    expect(
      toJson(shallow(<AdvancedSearchPage {...props} />))
    ).toMatchSnapshot();
  });
});
