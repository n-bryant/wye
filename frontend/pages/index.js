import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../lib/classNamePrefix";

import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

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
        <AppBar position="static" className={classnames.element("appBar")}>
          <Toolbar className={classnames.element("toolBar")}>
            <Typography variant="h1">Wye</Typography>
          </Toolbar>
        </AppBar>
        <div className={classnames.element("main")}>
          {/* welcome copy with faq link / recommendations table goes here */}
          <div className={classnames.element("contentContainer")}>
            <div className={classnames.element("content")}></div>
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
    appBar: PropTypes.string,
    toolBar: PropTypes.string,
    main: PropTypes.string,
    contentContainer: PropTypes.string,
    content: PropTypes.string
  })
};
Index.defaultProps = {
  classes: {}
};

export default withStyles(styles)(Index);
