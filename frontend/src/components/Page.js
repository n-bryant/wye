import React from "react";
import PropTypes from "prop-types";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import theme from "../../lib/theme";

import Meta from "./Meta";
import Header from "./Header";

import styles from "./Page.styles";

/**
 * wraps page content with material-ui theme, css reset, and meta details
 */
export const Page = props => {
  const classnames = Page.classnames(props);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Meta />
        <div className={classnames.root()}>
          <Header />
          <div className={classnames.element("innerContent")}>
            {props.children}
          </div>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
};
Page.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}Page`);
Page.propTypes = {
  // styles applied to the Page
  classes: PropTypes.shape({
    root: PropTypes.string,
    innerContent: PropTypes.string
  })
};
Page.defaultProps = {
  classes: {}
};

export default withStyles(styles)(Page);
