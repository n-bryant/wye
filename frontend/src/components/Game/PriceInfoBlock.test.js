import { PriceInfoBlock } from "./PriceInfoBlock";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      id: "1"
    }
  })
}));

describe("PriceInfoBlock", () => {
  const props = {
    classes: {
      root: "root",
      withSmScreen: "withSmScreen",
      priceContainer: "priceContainer",
      priceContainerWithSmScreen: "priceContainerWithSmScreen",
      priceWidget: "priceWidget",
      storeButton: "storeButton",
      link: "link",
      metacriticContainer: "metacriticContainer",
      metacriticContainerWithSmScreen: "metacriticContainerWithSmScreen",
      metacriticTitle: "metacriticTitle",
      metacriticScore: "metacriticScore",
      metacriticScoreNegative: "metacriticScoreNegative",
      icon: "icon"
    },
    data: {
      price: {
        freeToPlay: true,
        onSale: true,
        discountPercentage: 50,
        initialFormatted: "$10.00",
        finalFormatted: "$5.00"
      },
      metacritic: {
        score: 0,
        reviewsPageUrl: "url"
      }
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<PriceInfoBlock {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render a link with the metacritic score and way to navigate to the reviews page if the metacritic score is above 0", () => {
    const propsWithNonZeroScore = {
      ...props,
      data: {
        ...props.data,
        metacritic: {
          score: 99,
          url: "url"
        }
      }
    };
    const wrapperWithNonZeroScore = shallow(
      <PriceInfoBlock {...propsWithNonZeroScore} />
    );
    const metacriticScore = wrapperWithNonZeroScore.findWhere(n =>
      n.hasClass(props.classes.metacriticScore)
    );
    expect(metacriticScore.length).toBe(1);
    expect(toJson(metacriticScore)).toMatchSnapshot();
  });

  it("should set negative styling to the metacritic score if the score is less than 50", () => {
    const wrapper = shallow(<PriceInfoBlock {...props} />);
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.metacriticScore))
        .hasClass(props.classes.metacriticScoreNegative)
    ).toBeTruthy();
  });
});
