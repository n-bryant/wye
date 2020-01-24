import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";
import BackgroundQuery, {
  GET_MOST_POPULAR_BACKGROUND_QUERY,
  BackgroundProvider
} from "./BackgroundProvider";

describe("BackgroundProvider", () => {
  const props = {
    classes: {
      root: "root",
      loaded: "loaded",
      backgroundPlaceholder: "backgroundPlaceholder"
    },
    backgroundUrl: "foo",
    children: "bar"
  };

  it("should render successfully", () => {
    expect(
      toJson(shallow(<BackgroundProvider {...props} />))
    ).toMatchSnapshot();
  });

  it("should set the loaded styles to the root element and hide the background placeholder once the background image has loaded", () => {
    const loaded = true;
    const setLoaded = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [loaded, setLoaded]);
    const wrapperWithState = shallow(<BackgroundProvider {...props} />);
    expect(
      wrapperWithState.findWhere(n => n.hasClass(props.classes.loaded)).length
    ).toBe(1);
    expect(
      wrapperWithState.findWhere(n =>
        n.hasClass(props.classes.backgroundPlaceholder)
      ).length
    ).toBe(0);
  });
});

describe("BackgroundQuery", () => {
  it("should render successfully", () => {
    const mocks = [
      {
        request: {
          query: GET_MOST_POPULAR_BACKGROUND_QUERY
        },
        result: {
          data: {
            mostPopularBackgroundSrc: "foo"
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BackgroundQuery />
      </MockedProvider>
    );
    expect(toJson(wrapper.find(BackgroundQuery))).toMatchSnapshot();
  });

  it("should render a BackgroundProvider once the query has loaded", async () => {
    const mocks = [
      {
        request: {
          query: GET_MOST_POPULAR_BACKGROUND_QUERY
        },
        result: {
          data: {
            mostPopularBackgroundSrc: "foo"
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BackgroundQuery />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0); // wait for response
      wrapper.update();
    });
    expect(toJson(wrapper.find(BackgroundQuery))).toMatchSnapshot();
    expect(wrapper.find(BackgroundProvider).prop("backgroundUrl")).toBe(
      mocks[0].result.data.mostPopularBackgroundSrc
    );
  });

  it("should set the backgroundUrl prop passed to the BackgroundProvider to the provided src prop value if a src is provided", async () => {
    const props = {
      src: "bar"
    };
    const mocks = [
      {
        request: {
          query: GET_MOST_POPULAR_BACKGROUND_QUERY
        },
        result: {
          data: {
            mostPopularBackgroundSrc: "foo"
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BackgroundQuery {...props} />
      </MockedProvider>
    );

    await act(async () => {
      await wait(0); // wait for response
      wrapper.update();
    });
    expect(wrapper.find(BackgroundProvider).prop("backgroundUrl")).toBe(
      props.src
    );
  });
});
