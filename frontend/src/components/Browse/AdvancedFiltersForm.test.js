import BooleanFilterField from "../RecommendationsForm/BooleanFilterField";
import AdvancedFiltersFormWithFormik, {
  getCategoryOptions,
  getMinValue,
  getMaxValue,
  AdvancedFiltersForm,
  StyledAdvancedFiltersForm
} from "./AdvancedFiltersForm";

describe("AdvancedFiltersFormWithFormik", () => {
  const props = {
    initialValues: {}
  };

  const renderCallbackArgs = {
    foo: "bar"
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AdvancedFiltersFormWithFormik {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set some defaults for the initialValues passed to the Formik form", () => {
    expect(wrapper.prop("initialValues")).toMatchObject({
      users: [],
      filters: {},
      orderBy: [],
      sortOrder: "DESC"
    });
  });

  it("should pass formik props and any received props to its rendered child", () => {
    expect(wrapper.prop("children")(renderCallbackArgs).props.formik.foo).toBe(
      renderCallbackArgs.foo
    );
  });
});

const games = [
  {
    appid: "1",
    discount: 25,
    finalPrice: 1000,
    ownersMin: 500,
    ownersMax: 1000,
    genres: ["a"]
  },
  {
    appid: "2",
    discount: 15,
    finalPrice: 500,
    ownersMin: 5000,
    ownersMax: 10000,
    genres: ["a", "b"]
  },
  {
    appid: "3",
    discount: 50,
    finalPrice: 350,
    ownersMin: 1000,
    ownersMax: 2000,
    genres: ["a", "b", "c"]
  },
  {
    appid: "4",
    discount: 75,
    finalPrice: 250,
    ownersMin: 150,
    ownersMax: 300,
    genres: ["a", "b", "c", "d"]
  },
  {
    appid: "5",
    discount: 90,
    finalPrice: 1500,
    ownersMin: 2500,
    ownersMax: 5000,
    genres: ["a", "b", "c", "d", "e"]
  }
];

describe("getMinValue", () => {
  it("should return the minimum value out of a list of games for a given property", () => {
    expect(getMinValue(games, "discount")).toBe(15);
    expect(getMinValue(games, "finalPrice")).toBe(250);
    expect(getMinValue(games, "ownersMin")).toBe(150);
    expect(getMinValue(games, "ownersMax")).toBe(300);
  });
});

describe("getMaxValue", () => {
  it("should return the maximum value out of a list of games for a given property", () => {
    expect(getMaxValue(games, "discount")).toBe(90);
    expect(getMaxValue(games, "finalPrice")).toBe(1500);
    expect(getMaxValue(games, "ownersMin")).toBe(5000);
    expect(getMaxValue(games, "ownersMax")).toBe(10000);
  });
});

describe("getCategoryOptions", () => {
  it("should return a sorted list of unique category values for a game list", () => {
    expect(getCategoryOptions(games, "genres")).toEqual([
      "a",
      "b",
      "c",
      "d",
      "e"
    ]);
  });
});

describe("AdvancedFiltersForm", () => {
  const renderCallbackArgs = {
    filteredDataSet: {
      recommendations: {
        edges: [
          {
            node: {
              game: {
                appid: "1",
                discount: 25,
                finalPrice: 1000,
                ownersMin: 500,
                ownersMax: 1000,
                publishers: ["a", "b"],
                developers: ["a", "b", "c"],
                genres: ["a"]
              }
            }
          },
          {
            node: {
              game: {
                appid: "2",
                discount: 15,
                finalPrice: 500,
                ownersMin: 5000,
                ownersMax: 10000,
                publishers: ["a", "b"],
                developers: ["a", "b", "c"],
                genres: ["a"]
              }
            }
          },
          {
            node: {
              game: {
                appid: "3",
                discount: 50,
                finalPrice: 350,
                ownersMin: 1000,
                ownersMax: 2000,
                publishers: ["a", "b"],
                developers: ["a", "b", "c"],
                genres: ["a"]
              }
            }
          },
          {
            node: {
              game: {
                appid: "4",
                discount: 75,
                finalPrice: 250,
                ownersMin: 150,
                ownersMax: 300,
                publishers: ["a", "b"],
                developers: ["a", "b", "c"],
                genres: ["a"]
              }
            }
          },
          {
            node: {
              game: {
                appid: "5",
                discount: 90,
                finalPrice: 1500,
                ownersMin: 2500,
                ownersMax: 5000,
                publishers: ["a", "b"],
                developers: ["a", "b", "c"],
                genres: ["a"]
              }
            }
          }
        ]
      }
    }
  };

  const props = {
    classes: {
      root: "root",
      drawer: "drawer",
      drawerContent: "drawerContent",
      modal: "modal",
      paper: "paper",
      backdrop: "backdrop",
      closeButtonContainer: "closeButtonContainer",
      fieldsContainer: "fieldsContainer",
      fieldSection: "fieldSection",
      fieldSectionTitle: "fieldSectionTitle",
      menuPaper: "menuPaper",
      selectOption: "selectOption",
      submitButtonContainer: "submitButtonContainer"
    },
    drawerOpen: true,
    drawerCloseHandler: jest.fn(),
    formik: {
      setFieldValue: jest.fn(),
      values: {}
    },
    hiddenFields: []
  };

  let wrapper, drawer;
  beforeEach(() => {
    wrapper = shallow(<AdvancedFiltersForm {...props} />);
  });

  it("should render successfully", () => {
    expect(
      toJson(shallow(wrapper.prop("children")(renderCallbackArgs)))
    ).toMatchSnapshot();
  });

  it("should render the Player Filters section if a formik users value is defined and has length", () => {
    wrapper.setProps({
      formik: {
        ...props.formik,
        values: {
          users: ["a"]
        }
      }
    });
    wrapper.update();

    expect(
      shallow(wrapper.prop("children")(renderCallbackArgs)).findWhere(
        n => n.text() === "Player Filters:"
      ).length
    ).not.toBe(0);
  });

  it("should hide the Free to Play and On Sale BooleanFilterFields if the hiddenFields prop includes 'onSale'", () => {
    wrapper.setProps({
      hiddenFields: ["onSale"]
    });
    wrapper.update();

    expect(
      shallow(wrapper.prop("children")(renderCallbackArgs)).find(
        BooleanFilterField
      ).length
    ).toBe(0);
  });
});
