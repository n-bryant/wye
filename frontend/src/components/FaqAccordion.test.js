import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { FaqAccordion, EXPAND_ALL_BUTTON_OPTIONS } from "./FaqAccordion";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "/faq"
  })
}));

describe("FaqAccordion", () => {
  const props = {
    classes: {
      root: "root",
      titleContainer: "titleContainer",
      title: "title",
      faqContainer: "faqContainer",
      expandAllButton: "expandAllButton",
      panel: "panel",
      expandIcon: "expandIcon",
      expandIconWithHovered: "expandIconWithHovered",
      panelSummary: "panelSummary",
      panelSummaryExpanded: "panelSummaryExpanded",
      panelSummaryText: "panelSummaryText",
      panelDetails: "panelDetails",
      link: "link"
    }
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FaqAccordion {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set the text of the expand all button based on the expandAll state value", () => {
    expect(
      wrapper.findWhere(n => n.hasClass(props.classes.expandAllButton)).text()
    ).toBe(EXPAND_ALL_BUTTON_OPTIONS.EXPAND);

    const expandAll = true;
    const setAllExpanded = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [expandAll, setAllExpanded]);
    const wrapperWithExpandAll = shallow(<FaqAccordion {...props} />);
    expect(
      wrapperWithExpandAll
        .findWhere(n => n.hasClass(props.classes.expandAllButton))
        .text()
    ).toBe(EXPAND_ALL_BUTTON_OPTIONS.COLLAPSE);
  });

  it("should toggle the expand all value when the expand/collapse all button is clicked", () => {
    const expandAll = false;
    const setAllExpanded = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [expandAll, setAllExpanded]);
    const wrapperWithExpandAll = shallow(<FaqAccordion {...props} />);
    wrapperWithExpandAll
      .findWhere(n => n.hasClass(props.classes.expandAllButton))
      .prop("onClick")();
    expect(setAllExpanded).toHaveBeenCalledWith(!expandAll);
  });

  it("should not expand any panel by default", () => {
    const expandAll = false;
    const setAllExpanded = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [expandAll, setAllExpanded]);
    const wrapperCollapsed = shallow(<FaqAccordion {...props} />);
    expect(
      wrapperCollapsed.findWhere(n => n.prop("expanded") === false).length
    ).toBe(wrapperCollapsed.find(Accordion).length);
  });

  it("should toggle a panel's expanded state when that panel experiences a change", () => {
    const expanded = false;
    const setExpanded = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [expanded, setExpanded]);
    const wrapperWithPanelState = shallow(<FaqAccordion {...props} />);
    wrapperWithPanelState
      .find(Accordion)
      .at(0)
      .prop("onChange")();
    expect(setExpanded).toHaveBeenCalled();
  });

  it("should add hover stylings to the expand icon when its parent panel is hovered", () => {
    const hovered = false;
    const setHovered = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(() => [hovered, setHovered]);
    const wrapperWithHoverState = shallow(<FaqAccordion {...props} />);
    wrapperWithHoverState
      .find(AccordionSummary)
      .at(0)
      .prop("onMouseEnter")();
    expect(setHovered).toHaveBeenCalledWith("panel1");
    wrapperWithHoverState
      .find(AccordionSummary)
      .at(0)
      .prop("onMouseLeave")();
    expect(setHovered).toHaveBeenCalledWith(false);
  });
});
