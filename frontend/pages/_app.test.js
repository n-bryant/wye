import {
  ACTIONS,
  CONTENT_OPTIONS,
  INITIAL_STATE,
  reducer,
  WyeWithState,
  WyeApp
} from "./_app";

describe("WyeWithState", () => {
  it("should render successfully", () => {
    const props = {
      Component: () => <div></div>,
      apollo: jest.fn(),
      pageProps: {}
    };

    const wrapper = shallow(<WyeWithState {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("WyeApp", () => {
  it("should render successfully", () => {
    const wrapper = shallow(<WyeApp />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("reducer", () => {
  it("should throw by default", () => {
    expect(reducer).toThrow();
  });

  it("should update the users state value if the action type is to set users", () => {
    const users = ["foo"];
    expect(
      reducer(INITIAL_STATE, { type: ACTIONS.SET_USERS, value: users })
    ).toMatchObject({
      content: INITIAL_STATE.content,
      users
    });
  });

  it("should update the content state value if the action type is to set content", () => {
    expect(
      reducer(INITIAL_STATE, {
        type: ACTIONS.SET_CONTENT,
        value: CONTENT_OPTIONS.RECOMMENDATIONS
      })
    ).toMatchObject({
      content: CONTENT_OPTIONS.RECOMMENDATIONS,
      users: INITIAL_STATE.users
    });
  });
});
