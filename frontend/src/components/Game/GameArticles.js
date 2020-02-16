import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import styles from "./GameArticles.styles";

/**
 * renders a list of article cards for a game's articles
 */
export const GameArticles = props => {
  const classnames = GameArticles.classnames(props);
  const { articles } = props;

  return (
    <div className={classnames.root()}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom={true}>
            Recent News:
          </Typography>
        </Grid>
        {articles.map((article, index) => (
          <Grid key={index} item xs={12} md={6}>
            <Link href={article.url} prefetch={false}>
              <a className={classnames.element("link")} target="_blank">
                <div className={classnames.element("article")}>
                  <Typography
                    className={classnames.element("articleTitle")}
                    variant="h2"
                    gutterBottom={true}
                  >
                    {article.title}
                  </Typography>
                  <div className={classnames.element("articleContents")}>
                    <Typography variant="body1" gutterBottom={true}>
                      <span className={classnames.element("subTitle")}>
                        Author:{" "}
                      </span>
                      {article.author}
                    </Typography>
                    <Typography variant="body1">
                      <span className={classnames.element("subTitle")}>
                        Published:{" "}
                      </span>
                      {article.printDate}
                    </Typography>
                  </div>
                </div>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
GameArticles.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}GameArticles`
);
GameArticles.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    link: PropTypes.string,
    article: PropTypes.string,
    articleTitle: PropTypes.string,
    articleContents: PropTypes.string,
    subTitle: PropTypes.string
  }),
  // article info for a game
  articles: PropTypes.array
};
GameArticles.defaultProps = {
  classes: {}
};

export default withStyles(styles)(GameArticles);
