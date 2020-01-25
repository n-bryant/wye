import { PriceWidget } from "./PriceWidget";

describe("PriceWidget", () => {
  const props = {
    classes: {
      root: "root",
      priceContainer: "priceContainer",
      priceContainerWithSmScreen: "priceContainerWithSmScreen",
      priceDetailsContainer: "priceDetailsContainer",
      priceDetailsContainerWithDiscount: "priceDetailsContainerWithDiscount",
      discountPercent: "discountPercent",
      discountPercentSkinny: "discountPercentSkinny",
      initialPrice: "initialPrice",
      finalPrice: "finalPrice",
      priceDetails: "priceDetails",
      priceFree: "priceFree"
    },
    data: {
      freeToPlay: true,
      onSale: true,
      discountPercentage: 50,
      initialFormatted: "$10.00",
      finalFormatted: "$5.00"
    },
    skinny: false
  };

  it("should render successfully", () => {
    const wrapper = shallow(<PriceWidget {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe("getPrice", () => {
    it("should render a price details container with sale details if the game is on sale", () => {
      const propsWithDiscount = {
        ...props,
        data: {
          ...props.data,
          freeToPlay: false
        }
      };
      const wrapperWithDiscount = shallow(
        <PriceWidget {...propsWithDiscount} />
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
          freeToPlay: false,
          onSale: false
        }
      };
      const wrapperWitouthDiscount = shallow(
        <PriceWidget {...propsWithoutDiscount} />
      );
      const priceDetailsContainer = wrapperWitouthDiscount.findWhere(n =>
        n.hasClass(props.classes.priceDetailsContainer)
      );
      expect(priceDetailsContainer.length).toBe(1);
      expect(toJson(priceDetailsContainer)).toMatchSnapshot();
    });

    it("should render a skinny version of the price widget if the skinny prop is truthy", () => {
      const propsWithSkinny = {
        ...props,
        data: {
          ...props.data,
          freeToPlay: false
        },
        skinny: true
      };
      const wrapperSkinny = shallow(<PriceWidget {...propsWithSkinny} />);
      const discountPercentSkinny = wrapperSkinny.findWhere(n =>
        n.hasClass(props.classes.discountPercentSkinny)
      );
      expect(discountPercentSkinny.length).toBe(1);
    });
  });
});
