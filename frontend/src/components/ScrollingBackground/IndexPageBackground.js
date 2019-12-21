import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import styles from "./IndexPageBackground.styles";

/**
 * renders an animated background comprised of top multiplayer game header images
 */
export const IndexPageBackground = props => {
  const classnames = IndexPageBackground.classnames(props);

  return (
    <div className={classnames.root()}>
      <div className={classnames.element("panel")}>
        <div className={classnames.element("scrollContainer")}>
          <div className={classnames.element("scrollForward")}></div>
        </div>
        <div className={classnames.element("scrollContainer")}>
          <div className={classnames.element("scrollBackward")}></div>
        </div>
        <div className={classnames.element("scrollContainer")}>
          <div className={classnames.element("scrollForward")}></div>
        </div>
        <div className={classnames.element("scrollContainer")}>
          <div className={classnames.element("scrollBackward")}></div>
        </div>
      </div>
    </div>
  );
};
IndexPageBackground.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}IndexPageBackground`
);
IndexPageBackground.propTypes = {
  // styles applied to the IndexPageBackground
  classes: PropTypes.shape({
    root: PropTypes.string,
    panel: PropTypes.string,
    scrollContainer: PropTypes.string,
    scrollForward: PropTypes.string,
    scrollBackward: PropTypes.string
  })
};
IndexPageBackground.defaultProps = {
  classes: {}
};

export default withStyles(styles)(IndexPageBackground);
