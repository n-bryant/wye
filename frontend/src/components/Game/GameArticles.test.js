import { GameArticles } from "./GameArticles";

describe("GameArticles", () => {
  const props = {
    classes: {
      root: "root",
      link: "link",
      article: "article",
      articleTitle: "articleTitle",
      articleContents: "articleContents",
      subTitle: "subTitle"
    },
    articles: [
      {
        title: "title",
        author: "author",
        printDate: "date"
      }
    ]
  };

  it("should render successfully", () => {
    expect(toJson(shallow(<GameArticles {...props} />))).toMatchSnapshot();
  });
});
