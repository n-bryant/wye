import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import BrowseByPublisher from "../../../src/components/Browse/BrowseByPublisher";
import styles from "./index.styles";

/**
 * renders a page with quick links to browse titles for each publisher
 */
export const PublishersPage = props => {
  const classnames = PublishersPage.classnames(props);

  return (
    <div className={classnames.root()}>
      <BrowseByPublisher />
    </div>
  );
};
PublishersPage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}PublishersPage`
);
PublishersPage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
PublishersPage.defaultProps = {
  classes: {}
};

// apply styles
export const StyledPublishersPage = withWidth()(
  withStyles(styles)(PublishersPage)
);

export default StyledPublishersPage;
