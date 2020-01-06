import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import styles from "./GameDetails.styles";

/**
 * renders a game's details
 */
export const GameDetails = props => {
  const classnames = GameDetails.classnames(props);
  const { data } = props;

  return <div className={classnames.root()}>GameDetails</div>;
};
GameDetails.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}GameDetails`
);
GameDetails.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // detailed info for a game
  data: PropTypes.object
};
GameDetails.defaultProps = {
  classes: {}
};

export default withStyles(styles)(GameDetails);
