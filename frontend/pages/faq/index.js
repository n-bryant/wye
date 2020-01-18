import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import FaqAccordion from "../../src/components/FaqAccordion";
import styles from "./index.styles";

/**
 * renders an FAQ page
 */
export const FaqPage = props => {
  const classnames = FaqPage.classnames(props);

  return (
    <div className={classnames.root()}>
      <FaqAccordion />
    </div>
  );
};
FaqPage.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}FaqPage`);
FaqPage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
FaqPage.defaultProps = {
  classes: {}
};

export default withStyles(styles)(FaqPage);
