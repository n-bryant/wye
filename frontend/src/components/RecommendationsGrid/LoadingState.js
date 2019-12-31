import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import styles from "./LoadingState.styles";

/**
 * renders a loading state
 */
export const LoadingState = props => {
  const classnames = LoadingState.classnames(props);

  return <div className={classnames.root()}></div>;
};
LoadingState.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}LoadingState`
);
LoadingState.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
LoadingState.defaultProps = {
  classes: {}
};

export default withStyles(styles)(LoadingState);
