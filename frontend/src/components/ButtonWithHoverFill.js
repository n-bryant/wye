import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Icon from "@mdi/react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import styles from "./ButtonWithHoverFill.styles";

/**
 * renders an Button with hover state for an Icon if provided
 */
export const ButtonWithHoverFill = props => {
  const classnames = ButtonWithHoverFill.classnames(props);
  const { icon, label, displayLabel, handleClick, transformText } = props;
  const [hovered, setHovered] = React.useState(false);

  return (
    <Button
      className={classnames.root({
        transformText
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      aria-label={label}
    >
      {displayLabel && <Typography variant="body1">{label}</Typography>}
      {icon.length && (
        <Icon
          className={classnames.element("icon", {
            hovered,
            withLabel: displayLabel
          })}
          path={icon}
        />
      )}
    </Button>
  );
};
ButtonWithHoverFill.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}ButtonWithHoverFill`
);
ButtonWithHoverFill.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    hovered: PropTypes.string,
    icon: PropTypes.string,
    iconWithLabel: PropTypes.string,
    iconHovered: PropTypes.string
  }),
  // the icon to render
  icon: PropTypes.string,
  // the label for the Button
  label: PropTypes.string.isRequired,
  // whether to display the label text on the button
  displayLabel: PropTypes.bool,
  // click handler for the IconButton
  handleClick: PropTypes.func.isRequired,
  // whether to transform the text
  transformText: PropTypes.bool
};
ButtonWithHoverFill.defaultProps = {
  classes: {},
  handleClick: () => {}
};

export default withStyles(styles)(ButtonWithHoverFill);
