import { BrowseSalesPage } from "./index";

describe("BrowseSalesPage", () => {
  const props = {
    calsses: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<BrowseSalesPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
