import { PublishersPage } from "./index";

describe("PublishersPage", () => {
  const props = {
    calsses: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<PublishersPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
