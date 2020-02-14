import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../lib/classNamePrefix";

import Container from "@material-ui/core/Container";

import WelcomeEmptyState from "../src/components/WelcomeEmptyState";
import IndexPageBackground from "../src/components/ScrollingBackground/IndexPageBackground";
import styles from "./index.styles";

/**
 * renders the index page's content
 */
export const Index = props => {
  const classnames = Index.classnames(props);

  return (
    <div className={classnames.root()}>
      <Container
        className={classnames.element("container")}
        maxWidth={false}
        disableGutters
      >
        <div className={classnames.element("main")}>
          <div className={classnames.element("contentContainer")}>
            <div className={classnames.element("content")}>
              <WelcomeEmptyState />
            </div>
          </div>
        </div>
      </Container>
      <IndexPageBackground />
    </div>
  );
};
Index.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}Index`);
Index.propTypes = {
  // styles applied
  classes: PropTypes.shape({
    root: PropTypes.string,
    container: PropTypes.string,
    main: PropTypes.string,
    contentContainer: PropTypes.string,
    content: PropTypes.string
  })
};
Index.defaultProps = {
  classes: {}
};

// apply styles
export const StyledIndex = withStyles(styles)(Index);

export default StyledIndex;
