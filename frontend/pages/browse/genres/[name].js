import React from "react";
import PropTypes from "prop-types";

import { useRouter } from "next/router";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import GamesFilterWidget from "../../../src/components/Browse/GamesFilterWidget";
import styles from "./[name].styles";

/**
 * renders a GamesFilterWidget, filtering for games of the provided genre
 */
export const GenrePage = props => {
  const classnames = GenrePage.classnames(props);
  const router = useRouter();

  const genre = router.query.name;
  const subtitle = `Browse ${genre} titles`;
  const config = {
    filters: {
      gameFilters: {
        genres_in: [genre]
      }
    },
    orderBy: ["USER_RATING"],
    sortOrder: "DESC"
  };

  return (
    <div className={classnames.root()}>
      <GamesFilterWidget
        title={genre}
        subtitle={subtitle}
        initialFilters={config}
      />
    </div>
  );
};
GenrePage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}GenrePage`
);
GenrePage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
GenrePage.defaultProps = {
  classes: {}
};

// apply styles
export const StyledGenrePage = withStyles(styles)(GenrePage);

export default StyledGenrePage;
