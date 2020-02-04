import PaginationWidget from "../../PaginationWidget";
import { FilteredGameList } from "./FilteredGameList";

describe("FilteredGameList", () => {
  const props = {
    classes: {
      root: "root",
      item: "item"
    },
    items: [
      {
        node: {
          game: {
            appid: "1"
          }
        }
      }
    ]
  };

  it("should render successfully", () => {
    const wrapper = shallow(<FilteredGameList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render pagination widgets if the number of pages is greater than 1", () => {
    let mockedItems = [];
    for (let i = 0; i < 22; i++) {
      mockedItems.push({
        node: {
          game: {
            appid: `${i}`
          }
        }
      });
    }
    const propsWithPages = {
      ...props,
      items: mockedItems
    };
    const wrapper = shallow(<FilteredGameList {...propsWithPages} />);
    expect(wrapper.find(PaginationWidget).length).toBe(2);
  });
});
