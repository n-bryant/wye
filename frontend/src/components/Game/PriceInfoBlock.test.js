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
      priceDetailsContainer: "priceDetailsContainer",
      priceDetailsContainerWithDiscount: "priceDetailsContainerWithDiscount",
      discountPercent: "discountPercent",
      initialPrice: "initialPrice",
      finalPrice: "finalPrice",
      priceDetails: "priceDetails",
      priceFree: "priceFree",
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

  it("should render a price details container with sale details if the game is on sale", () => {
    const propsWithDiscount = {
      ...props,
      data: {
        ...props.data,
        price: {
          ...props.data.price,
          freeToPlay: false
        }
      }
    };
    const wrapperWithDiscount = shallow(
      <PriceInfoBlock {...propsWithDiscount} />
    );
    const priceDetailsContainer = wrapperWithDiscount.findWhere(n =>
      n.hasClass(props.classes.priceDetailsContainerWithDiscount)
    );
    expect(priceDetailsContainer.length).toBe(1);
    expect(toJson(priceDetailsContainer)).toMatchSnapshot();
  });

  it("should render a price details container with the sole final price value if the game is not on sale", () => {
    const propsWithoutDiscount = {
      ...props,
      data: {
        ...props.data,
        price: {
          ...props.data.price,
          freeToPlay: false,
          onSale: false
        }
      }
    };
    const wrapperWitouthDiscount = shallow(
      <PriceInfoBlock {...propsWithoutDiscount} />
    );
    const priceDetailsContainer = wrapperWitouthDiscount.findWhere(n =>
      n.hasClass(props.classes.priceDetailsContainer)
    );
    expect(priceDetailsContainer.length).toBe(1);
    expect(toJson(priceDetailsContainer)).toMatchSnapshot();
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
