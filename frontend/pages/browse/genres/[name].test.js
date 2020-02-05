import { GenrePage } from "./[name]";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      name: "name"
    }
  })
}));

describe("GenrePage", () => {
  const props = {
    calsses: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<GenrePage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
