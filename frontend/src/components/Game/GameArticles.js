import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import styles from "./GameArticles.styles";

/**
 * renders a list of article cards for a game's articles
 */
export const GameArticles = props => {
  const classnames = GameArticles.classnames(props);
  const { data } = props;

  return <div className={classnames.root()}>GameArticles</div>;
};
GameArticles.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}GameArticles`
);
GameArticles.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // article info for a game
  data: PropTypes.array
};
GameArticles.defaultProps = {
  classes: {}
};

export default withStyles(styles)(GameArticles);
