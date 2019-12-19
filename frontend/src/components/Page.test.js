import { Page } from "./Page";
import toJson from "enzyme-to-json";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

describe("Page", () => {
  it("should render its children wrapped with the material theme and css reset", () => {
    const props = {
      classes: {
        root: "root",
        innerContent: "innerContent"
      },
      children: () => <div>foo</div>
    };
    const wrapper = shallow(<Page {...props} />);
    expect(wrapper.find(ThemeProvider)).toHaveLength(1);
    expect(wrapper.find(CssBaseline)).toHaveLength(1);
    const content = toJson(
      wrapper.findWhere(n => n.hasClass(props.classes.root))
    );
    expect(content).toMatchSnapshot();
  });
});
