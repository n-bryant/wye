import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Link from "next/link";
import Icon from "@mdi/react";
import { mdiGithubCircle } from "@mdi/js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "./Header.styles.js";

/**
 * renders an AppBar with a Browse Menu and Toolbar with home, faq, and github links
 */
export const Header = props => {
  const classnames = Header.classnames(props);
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classnames.root()}>
      <Toolbar className={classnames.element("toolBar")}>
        <div className={classnames.element("mainNav")}>
          <Link href="/">
            <a
              className={classnames.element("link", {
                withNoHoverDecoration: true
              })}
            >
              <Typography className={classnames.element("title")} variant="h1">
                Wye
              </Typography>
            </a>
          </Link>
          <Button
            className={classnames.element("browseMenuButton")}
            aria-label="browse menu launcher"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            Browse
          </Button>
          <Menu
            id="menu-appbar"
            classes={{
              paper: classes.browseMenu
            }}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            open={open}
            onClose={handleClose}
          >
            <Typography
              className={classnames.element("menuSectionTitle")}
              variant="body1"
              gutterBottom={true}
            >
              Browse Featured:
            </Typography>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">Featured</Typography>
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse/advancedsearch">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">Advanced Search</Typography>
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse/top100">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">Top 100</Typography>
                </a>
              </Link>
            </MenuItem>
            <Typography
              className={classnames.element("menuSectionTitle")}
              variant="body1"
              gutterBottom={true}
            >
              Browse Sales:
            </Typography>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse/sales">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">All Sales</Typography>
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse/under10">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">Under $10</Typography>
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse/under5">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">Under $5</Typography>
                </a>
              </Link>
            </MenuItem>
            <Typography
              className={classnames.element("menuSectionTitle")}
              variant="body1"
              gutterBottom={true}
            >
              Browse by Category:
            </Typography>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse/publishers">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">Publishers</Typography>
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse/genres">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">Genres</Typography>
                </a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableGutters={true}>
              <Link href="/browse/tags">
                <a className={classnames.element("menuLink")}>
                  <Typography variant="body2">Tags</Typography>
                </a>
              </Link>
            </MenuItem>
          </Menu>
        </div>
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
    mainNav: PropTypes.string,
    browseLink: PropTypes.string,
    title: PropTypes.string,
    linksContainer: PropTypes.string,
    link: PropTypes.string,
    linkWithNoHoverDecoration: PropTypes.string,
    githubIcon: PropTypes.string,
    browseMenuButton: PropTypes.string,
    browseMenu: PropTypes.string,
    menuSectionTitle: PropTypes.string,
    menuLink: PropTypes.string
  })
};
Header.defaultProps = {
  classes: {}
};

// apply styles
export const StyledHeader = withStyles(styles)(Header);

export default StyledHeader;
