import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import GamesFilterWidget from "../../../src/components/Browse/GamesFilterWidget";
import styles from "./index.styles";

/**
 * renders a GamesFilterWidget, filtering for games under $10
 */
export const Under10Page = props => {
  const classnames = Under10Page.classnames(props);
  const config = {
    filters: {
      gameFilters: {
        freeToPlay: false,
        finalPrice_lte: 999
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
Under10Page.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}Under10Page`
);
Under10Page.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
Under10Page.defaultProps = {
  classes: {}
};

// apply styles
export const StyledUnder10Page = withStyles(styles)(Under10Page);

export default StyledUnder10Page;
