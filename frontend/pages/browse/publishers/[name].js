import React from "react";
import PropTypes from "prop-types";

import { useRouter } from "next/router";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import GamesFilterWidget from "../../../src/components/Browse/GamesFilterWidget";
import styles from "./[name].styles";

/**
 * renders a GamesFilterWidget, filtering for games of the provided publisher
 */
export const PublisherPage = props => {
  const classnames = PublisherPage.classnames(props);
  const router = useRouter();

  const publisher = router.query.name;
  const subtitle = `Browse ${publisher} titles`;
  const config = {
    filters: {
      gameFilters: {
        publishers_in: [publisher]
      }
    },
    orderBy: ["USER_RATING"],
    sortOrder: "DESC"
  };

  return (
    <div className={classnames.root()}>
      <GamesFilterWidget
        title={publisher}
        subtitle={subtitle}
        initialFilters={config}
      />
    </div>
  );
};
PublisherPage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}PublisherPage`
);
PublisherPage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
PublisherPage.defaultProps = {
  classes: {}
};

// apply styles
export const StyledPublisherPage = withStyles(styles)(PublisherPage);

export default StyledPublisherPage;
