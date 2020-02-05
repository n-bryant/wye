import {
  getOffsetStart,
  getPageDifferential,
  getOffsetCount,
  getTotalCountModPageLimit,
  getOffsetEnd,
  getTotalPages
} from "./pagingUtilities";

describe("getOffsetStart", () => {
  it("should return the difference between a list length, the remaining items beyond the current page, and the remainder of the list length divided by the per page limit", () => {
    expect(getOffsetStart(1, 500, 20)).toBe(0);
    expect(getOffsetStart(2, 500, 20)).toBe(20);
    expect(getOffsetStart(26, 510, 20)).toBe(500);
  });
});

describe("getPageDifferential", () => {
  it("should return the difference between the total number of pages and the current page number", () => {
    expect(getPageDifferential(10, 1)).toBe(9);
    expect(getPageDifferential(10, 10)).toBe(0);
  });
});

describe("getOffsetCount", () => {
  it("should return the product of the per page limit and the difference between total pages and current page number", () => {
    expect(getOffsetCount(20, 5)).toBe(100);
  });
});

describe("getTotalCountModPageLimit", () => {
  it("should return the remainder between the length of the list and the per page limit", () => {
    expect(getTotalCountModPageLimit(100, 20)).toBe(0);
    expect(getTotalCountModPageLimit(20, 3)).toBe(2);
  });
});

describe("getOffsetEnd", () => {
  it("should return the product of the current page number and the per page limit", () => {
    expect(getOffsetEnd(5, 20)).toBe(100);
  });
});

describe("getTotalPages", () => {
  it("should return the quotient of the list length and the per page limit, rounded up", () => {
    expect(getTotalPages(100, 20)).toBe(5);
    expect(getTotalPages(100, 33)).toBe(4);
  });
});
