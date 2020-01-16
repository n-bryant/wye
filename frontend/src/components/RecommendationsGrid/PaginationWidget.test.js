import { PaginationWidget } from "./PaginationWidget";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiPageFirst,
  mdiPageLast
} from "@mdi/js";

describe("PaginationWidget", () => {
  const props = {
    classes: {
      root: "root",
      paddlesWrapper: "paddlesWrapper",
      paddle: "paddle",
      paddleIcon: "paddleIcon",
      paddleIconDisabled: "paddleIconDisabled",
      pageIndicator: "pageIndicator",
      pagingValuesContainer: "pagingValuesContainer",
      goToPageInput: "goToPageInput"
    },
    currentPage: 1,
    setCurrentPage: jest.fn(),
    totalPages: 3
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PaginationWidget {...props} />);
  });

  it("should render successfully", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should set the first page button and prev page button to disabled if the current page is the first page", () => {
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.paddle))
        .at(0)
        .prop("disabled")
    ).toBeTruthy();
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.paddle))
        .at(1)
        .prop("disabled")
    ).toBeTruthy();
  });

  it("should set disabled styling to the paddle icon of the prev and first page buttons when the button is disabled", () => {
    expect(
      wrapper
        .findWhere(n => n.prop("path") === mdiPageFirst)
        .hasClass(props.classes.paddleIconDisabled)
    ).toBeTruthy();
    expect(
      wrapper
        .findWhere(n => n.prop("path") === mdiChevronLeft)
        .hasClass(props.classes.paddleIconDisabled)
    ).toBeTruthy();
  });

  it("should set the last page button and next page button to disabled if the current page is the last page", () => {
    wrapper.setProps({
      currentPage: props.totalPages
    });
    wrapper.update();
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.paddle))
        .at(2)
        .prop("disabled")
    ).toBeTruthy();
    expect(
      wrapper
        .findWhere(n => n.hasClass(props.classes.paddle))
        .at(3)
        .prop("disabled")
    ).toBeTruthy();
  });

  it("should set disabled styling to the paddle icon of the next and last page buttons when the button is disabled", () => {
    wrapper.setProps({
      currentPage: props.totalPages
    });
    wrapper.update();
    expect(
      wrapper
        .findWhere(n => n.prop("path") === mdiPageLast)
        .hasClass(props.classes.paddleIconDisabled)
    ).toBeTruthy();
    expect(
      wrapper
        .findWhere(n => n.prop("path") === mdiChevronRight)
        .hasClass(props.classes.paddleIconDisabled)
    ).toBeTruthy();
  });
});
