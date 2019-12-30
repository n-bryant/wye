import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "./ActionButton.styles";

/**
 * renders an animated Button with a given label and click handler
 */
export const ActionButton = props => {
  const classnames = ActionButton.classnames(props);
  const { label, onClick, disabled } = props;
  return (
    <div className={classnames.root()}>
      <Button
        className={classnames.element("button")}
        onClick={onClick}
        disabled={disabled}
      >
        <svg
          className={classnames.element("buttonBorder", { disabled })}
          width="180px"
          height="60px"
          viewBox="0 0 180 60"
        >
          <polyline points="179,1 179,59 1,59 1,1 179,1" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" />
        </svg>
        <Typography variant="body1">{label}</Typography>
      </Button>
    </div>
  );
};
ActionButton.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}ActionButton`
);
ActionButton.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    button: PropTypes.string,
    buttonBorder: PropTypes.string,
    buttonBorderDisabled: PropTypes.string
  }),
  // the label text for the button
  label: PropTypes.string,
  // the click handler for the button
  onClick: PropTypes.func,
  // whether the button should be disabled
  disabled: PropTypes.bool
};
ActionButton.defaultProps = {
  classes: {},
  label: "Go!",
  onClick: () => {}
};

export default withStyles(styles)(ActionButton);
