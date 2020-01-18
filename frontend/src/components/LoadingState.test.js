import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("should render successfully", () => {
    const props = {
      classes: {
        root: "root",
        progressIndicator: "progressIndicator"
      }
    };
    expect(toJson(shallow(<LoadingState {...props} />))).toMatchSnapshot();
  });
});
