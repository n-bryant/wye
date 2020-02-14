import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withWidth } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

import GamesFilterWidget from "../../../src/components/Browse/GamesFilterWidget";
import styles from "./index.styles";

/**
 * renders the Advanced Search browse page
 */
export const AdvancedSearchPage = props => {
  const classnames = AdvancedSearchPage.classnames(props);
  const config = {
    filters: {
      gameFilters: {}
    },
    orderBy: ["OWNER_COUNT_MAX", "USER_RATING", "NAME"],
    sortOrder: "DESC"
  };

  return (
    <div className={classnames.root()}>
      <GamesFilterWidget
        title={"Advanced Search"}
        subtitle={"Browse all titles"}
        initialFilters={config}
        fullSearch={true}
      />
    </div>
  );
};
AdvancedSearchPage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}AdvancedSearchPage`
);
AdvancedSearchPage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
AdvancedSearchPage.defaultProps = {
  classes: {}
};

export default withWidth()(withStyles(styles)(AdvancedSearchPage));
