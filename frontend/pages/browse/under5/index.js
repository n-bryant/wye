import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import GamesFilterWidget from "../../../src/components/Browse/GamesFilterWidget";
import styles from "./index.styles";

/**
 * renders a GamesFilterWidget, filtering for games under $5
 */
export const Under5Page = props => {
  const classnames = Under5Page.classnames(props);
  const config = {
    filters: {
      gameFilters: {
        freeToPlay: false,
        finalPrice_lte: 499
      }
    },
    orderBy: ["FINAL_PRICE", "USER_RATING"],
    sortOrder: "DESC"
  };

  return (
    <div className={classnames.root()}>
      <GamesFilterWidget initialFilters={config} />
    </div>
  );
};
Under5Page.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}Under5Page`
);
Under5Page.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
Under5Page.defaultProps = {
  classes: {}
};

// apply styles
export const StyledUnder5Page = withStyles(styles)(Under5Page);

export default StyledUnder5Page;
