import { Container } from "@material-ui/core";
import BooleanFilterField from "../RecommendationsForm/BooleanFilterField";
import AdvancedFiltersFormWithFormik, {
  getCategoryOptions,
  getMinValue,
  getMaxValue,
  AdvancedFiltersForm
} from "./AdvancedFiltersForm";

describe("AdvancedFiltersFormWithFormik", () => {
  const props = {
    initialValues: {},
    items: [
      {
        node: {
          game: {
            appid: "1",
            name: "foo",
            publishers: ["a"],
            developers: ["a"],
            genres: ["a"],
            tags: ["a"]
          }
        }
      }
    ]
  };

  const gamesFilterWidgetRenderCallbackArgs = {
    setFilterOptions: jest.fn()
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      shallow(<AdvancedFiltersFormWithFormik {...props} />).prop("children")(
        gamesFilterWidgetRenderCallbackArgs
      )
    );
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set some defaults for the initialValues passed to the Formik form", () => {
    expect(wrapper.prop("value").initialValues).toMatchObject({
      users: [],
      filters: {},
      orderBy: [],
      sortOrder: "DESC"
    });
  });

  it("should pass formik props and any received props to its rendered child", () => {
    expect(wrapper.prop("children").props.formik).toBeDefined();
  });
});

const games = [
  {
    appid: "1",
    discount: 25,
    finalPrice: 1000,
    ownersMin: 500,
    ownersMax: 1000,
    genres: ["a"],
    tags: ["a"]
  },
  {
    appid: "2",
    discount: 15,
    finalPrice: 500,
    ownersMin: 5000,
    ownersMax: 10000,
    genres: ["a", "b"],
    tags: ["a"]
  },
  {
    appid: "3",
    discount: 50,
    finalPrice: 350,
    ownersMin: 1000,
    ownersMax: 2000,
    genres: ["a", "b", "c"],
    tags: ["a"]
  },
  {
    appid: "4",
    discount: 75,
    finalPrice: 250,
    ownersMin: 150,
    ownersMax: 300,
    genres: ["a", "b", "c", "d"],
    tags: ["a"]
  },
  {
    appid: "5",
    discount: 90,
    finalPrice: 1500,
    ownersMin: 2500,
    ownersMax: 5000,
    genres: ["a", "b", "c", "d", "e"],
    tags: ["a"]
  }
];

describe("AdvancedFiltersForm", () => {
  const props = {
    classes: {
      root: "root",
      closing: "closing",
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
    gameList: games,
    drawerCloseHandler: jest.fn(),
    formik: {
      setFieldValue: jest.fn(),
      values: {}
    },
    hiddenFields: []
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AdvancedFiltersForm {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
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
      wrapper.findWhere(n => n.text() === "Player Filters:").length
    ).not.toBe(0);
  });

  it("should hide the Free to Play and On Sale BooleanFilterFields if the hiddenFields prop includes 'onSale'", () => {
    wrapper.setProps({
      hiddenFields: ["onSale"]
    });
    wrapper.update();

    expect(wrapper.find(BooleanFilterField).length).toBe(0);
  });
});
