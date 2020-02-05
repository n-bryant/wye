import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withWidth } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

import GamesFilterWidget from "../../../src/components/Browse/GamesFilterWidget";
import styles from "./index.styles";

/**
 * renders the Sales browse page
 */
export const BrowseSalesPage = props => {
  const classnames = BrowseSalesPage.classnames(props);
  const config = {
    filters: {
      gameFilters: {
        onSale: true
      }
    },
    orderBy: ["DISCOUNT", "USER_RATING"],
    sortOrder: "DESC"
  };

  return (
    <div className={classnames.root()}>
      <GamesFilterWidget
        title={"Sales"}
        subtitle={"Browse titles available at a discount"}
        initialFilters={config}
      />
    </div>
  );
};
BrowseSalesPage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BrowseSalesPage`
);
BrowseSalesPage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
BrowseSalesPage.defaultProps = {
  classes: {}
};

export default withWidth()(withStyles(styles)(BrowseSalesPage));
