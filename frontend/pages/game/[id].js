import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";

import styles from "./[id].styles";

/**
 * renders a game page
 */
export const Game = props => {
  const classnames = Game.classnames(props);
  const router = useRouter();

  return (
    <div className={classnames.root()}>
      <h1>{router.query.id}</h1>
      <p>Placeholder game page content.</p>
    </div>
  );
};
Game.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}Game`);
Game.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
Game.defaultProps = {
  classes: {}
};

export default withStyles(styles)(Game);
