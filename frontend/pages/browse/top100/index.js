import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import GamesFilterWidget from "../../../src/components/Browse/GamesFilterWidget";
import styles from "./index.styles";

/**
 * renders a GamesFilterWidget, filtering for the top 100 games by recent playtime / user rating
 */
export const TopHundredPage = props => {
  const classnames = TopHundredPage.classnames(props);
  const config = {
    filters: { gameFilters: { userRating_gte: 75, ownersMin_gte: 2000000 } },
    orderBy: ["PLAYTIME_RECENT", "USER_RATING"],
    sortOrder: "DESC",
    first: 100
  };

  return (
    <div className={classnames.root()}>
      <GamesFilterWidget
        title="Top 100"
        subtitle="Browse the most popular by recent playtime"
        initialFilters={config}
      />
    </div>
  );
};
TopHundredPage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}TopHundredPage`
);
TopHundredPage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
TopHundredPage.defaultProps = {
  classes: {}
};

// apply styles
export const StyledTopHundredPage = withStyles(styles)(TopHundredPage);

export default StyledTopHundredPage;
