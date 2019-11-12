const { articleReducer } = require("../../src/reducers/articleReducer");
const getFormattedUnixTime = require("../../lib/util/unixDateFormatter");

describe("articleReducer", () => {
  const mockedArticle = {
    gid: "1",
    appid: "2",
    date: 11111111,
    title: "foo",
    url: "bar",
    contents: "foobar"
  };
  const reducedArticle = articleReducer(mockedArticle);

  it("should map the provided gid to the id property", () => {
    expect(reducedArticle.id).toBe(mockedArticle.gid);
  });

  it("should map the provided appid to the appId property", () => {
    expect(reducedArticle.appId).toBe(mockedArticle.appid);
  });

  it("should map the provided date to the printDate property", () => {
    expect(reducedArticle.printDate).toBe(
      getFormattedUnixTime(mockedArticle.date)
    );
  });

  it("should map the provided title to the title property", () => {
    expect(reducedArticle.title).toBe(mockedArticle.title);
  });

  it("should map the provided url to the url property", () => {
    expect(reducedArticle.url).toBe(mockedArticle.url);
  });

  it("should map the provided contents to the contents property", () => {
    expect(reducedArticle.contents).toBe(mockedArticle.contents);
  });
});
