import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Link from "next/link";
import Icon from "@mdi/react";
import { mdiGithubCircle } from "@mdi/js";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import { AppContextConsumer, ACTIONS, CONTENT_OPTIONS } from "../../pages/_app";
import styles from "./Header.styles.js";

/**
 * renders an AppBar with home, faq, and github links
 */
export const Header = props => {
  const classnames = Header.classnames(props);
  const { dispatch } = props;

  return (
    <AppBar position="static" className={classnames.root()}>
      <Toolbar className={classnames.element("toolBar")}>
        <Link href="/">
          <a
            className={classnames.element("link", {
              withNoHoverDecoration: true
            })}
          >
            <Typography
              className={classnames.element("title")}
              variant="h1"
              onClick={() =>
                dispatch({
                  type: ACTIONS.SET_CONTENT,
                  value: CONTENT_OPTIONS.WELCOME
                })
              }
            >
              Wye
            </Typography>
          </a>
        </Link>
        <div className={classnames.element("linksContainer")}>
          <Link href="/faq">
            <a className={classnames.element("link")}>faq</a>
          </Link>
          <Link href="https://github.com/n-bryant/wye" prefetch={false}>
            <a className={classnames.element("link")} target="_blank">
              <Icon
                className={classnames.element("githubIcon")}
                path={mdiGithubCircle}
              />
            </a>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};
Header.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}Header`);
Header.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    toolBar: PropTypes.string,
    title: PropTypes.string,
    linksContainer: PropTypes.string,
    link: PropTypes.string,
    linkWithNoHoverDecoration: PropTypes.string,
    githubIcon: PropTypes.string
  })
};
Header.defaultProps = {
  classes: {}
};

export const StyledHeader = withStyles(styles)(Header);

/**
 * Renders a StyledHeader with app context
 */
export const HeaderWithContext = props => (
  <AppContextConsumer>
    {({ dispatch }) => {
      return <StyledHeader dispatch={dispatch} {...props} />;
    }}
  </AppContextConsumer>
);

export default HeaderWithContext;
