import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Link from "next/link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import styles from "./QuickLink.styles";

/**
 * renders a Button wrapped with a Link that serves as a Quick Link
 */
export const QuickLink = props => {
  const classnames = QuickLink.classnames(props);
  const { label, linkHref, linkAs } = props;

  return (
    <React.Fragment>
      {linkAs ? (
        <Link href={linkHref} as={linkAs}>
          <a className={classnames.root()}>
            <Button className={classnames.element("button")}>
              <Typography variant="body1">{label}</Typography>
            </Button>
          </a>
        </Link>
      ) : (
        <Link href={linkHref}>
          <a className={classnames.root()}>
            <Button className={classnames.element("button")}>
              <Typography variant="body1">{label}</Typography>
            </Button>
          </a>
        </Link>
      )}
    </React.Fragment>
  );
};
QuickLink.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}QuickLink`
);
QuickLink.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    button: PropTypes.string
  }),
  // the label to display on the Button
  label: PropTypes.string.isRequired,
  // the href value for the Link
  linkHref: PropTypes.string.isRequired,
  // the as value for the Link
  linkAs: PropTypes.string
};
QuickLink.defaultProps = {
  classes: {}
};

// apply styles
export const StyledQuickLink = withStyles(styles)(QuickLink);

export default StyledQuickLink;
