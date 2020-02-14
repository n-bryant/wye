import { BrowseByGenre } from "./BrowseByGenre";
import QuickLink from "../QuickLink";

describe("BrowseByGenre", () => {
  it("should render successfully", () => {
    const props = {
      classes: {
        root: "root",
        title: "title"
      },
      genres: ["foo"]
    };
    expect(toJson(shallow(<BrowseByGenre {...props} />))).toMatchSnapshot();
  });

  it("should change the label to MMO if the genre is Massively Multiplayer", () => {
    const props = {
      classes: {
        root: "root",
        title: "title"
      },
      genres: ["Massively Multiplayer"]
    };
    const wrapper = shallow(<BrowseByGenre {...props} />);
    expect(wrapper.find(QuickLink).prop("label")).toBe("MMO");
  });
});
