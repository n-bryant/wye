import { GenresPage } from "./index";

describe("GenresPage", () => {
  const props = {
    calsses: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<GenresPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
