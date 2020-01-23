import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

// import FaqAccordion from "../../src/components/FaqAccordion";
import styles from "./index.styles";

/**
 * renders the Browse page
 */
export const BrowsePage = props => {
  const classnames = BrowsePage.classnames(props);

  return <div className={classnames.root()}>browse page</div>;
};
BrowsePage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BrowsePage`
);
BrowsePage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
BrowsePage.defaultProps = {
  classes: {}
};

export default withStyles(styles)(BrowsePage);
