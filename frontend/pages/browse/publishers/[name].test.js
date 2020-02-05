import { PublisherPage } from "./[name]";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      name: "name"
    }
  })
}));

describe("PublisherPage", () => {
  const props = {
    calsses: {
      root: "root"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<PublisherPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
