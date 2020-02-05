import { TopHundredPage } from "./index";

describe("TopHundredPage", () => {
  const props = {
    calsses: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<TopHundredPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
