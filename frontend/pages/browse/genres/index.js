import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import BackgroundProvider from "../../../src/components/BackgroundProvider";
import BrowseByGenre from "../../../src/components/Browse/BrowseByGenre";
import styles from "./index.styles";

/**
 * renders a page with quick links to browse titles for each genre
 */
export const GenresPage = props => {
  const classnames = GenresPage.classnames(props);

  return (
    <div className={classnames.root()}>
      <BackgroundProvider useDefault={true}>
        <BrowseByGenre />
      </BackgroundProvider>
    </div>
  );
};
GenresPage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}GenresPage`
);
GenresPage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // genre options
  genres: PropTypes.array
};
GenresPage.defaultProps = {
  classes: {}
};

// apply styles
export const StyledGenresPage = withWidth()(withStyles(styles)(GenresPage));

export default StyledGenresPage;
