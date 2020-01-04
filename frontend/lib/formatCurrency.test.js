import { formatCurrency, amountWithCommas } from "./formatCurrency";

describe("amountWithCommas", () => {
  it("should add commas where there are three numbers in sequence before a decimal place to a given dollar amount", () => {
    const testData = [
      {
        value: "1.00",
        expectedResult: "1.00"
      },
      {
        value: "1.004575",
        expectedResult: "1.004575"
      },
      {
        value: "1000.25",
        expectedResult: "1,000.25"
      },
      {
        value: "1000000.25",
        expectedResult: "1,000,000.25"
      }
    ];
    testData.forEach(test => {
      expect(amountWithCommas(test.value)).toEqual(test.expectedResult);
    });
  });
});

describe("formatCurremncy", () => {
  it("should return a given Int value as a formatted dollar amount String", () => {
    const testData = [
      {
        value: "100",
        expectedResult: "$1.00"
      },
      {
        value: "3333",
        expectedResult: "$33.33"
      },
      {
        value: "999999",
        expectedResult: "$9,999.99"
      }
    ];
    testData.forEach(test => {
      expect(formatCurrency(test.value)).toEqual(test.expectedResult);
    });
  });
});
