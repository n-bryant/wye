import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";

import styles from "./Popper.styles";

export const constants = {
  POPPER_WIDTH: 300,
  POPPER_HEIGHT: 354,
  HEADER_HEIGHT: 56,
  POPPER_MARGIN: 12,
  ARROW_ORIENTATION: {
    LEFT: "left",
    RIGHT: "right"
  }
};

/**
 * determine the properties to apply to the popper
 * - based on the anchor's dimensions/positioning
 * @param {Object} anchorRect
 * @returns {Object}
 */
export const getPopperProps = anchorRect => {
  const {
    POPPER_WIDTH,
    POPPER_MARGIN,
    HEADER_HEIGHT,
    POPPER_HEIGHT,
    ARROW_ORIENTATION
  } = constants;

  // check to make sure if/where the popper has the requisite space to render
  const hasRoomRight =
    anchorRect.right + POPPER_WIDTH + POPPER_MARGIN < window.innerWidth;
  const hasRoomLeft = anchorRect.left > POPPER_WIDTH + POPPER_MARGIN;
  const hasRoomBottom = window.innerHeight - anchorRect.top > POPPER_HEIGHT;
  const hasRoomTop = window.innerHeight - HEADER_HEIGHT > POPPER_HEIGHT;

  // we don't want to render if there isn't space available
  let displayProperties = {
    style: {
      display: "none"
    }
  };
  if (!hasRoomTop) {
    return displayProperties;
  }

  // set initial arrow position
  let arrowStyle = {
    top: `calc(${anchorRect.height}px / 4)`
  };

  // set the left/right orientation of the popper relative to the anchor and based on available space
  if (hasRoomRight) {
    displayProperties = {
      arrowOrientation: ARROW_ORIENTATION.LEFT,
      arrowStyle,
      style: {
        left: `${anchorRect.width + POPPER_MARGIN}px`
      }
    };
  } else if (hasRoomLeft) {
    displayProperties = {
      arrowOrientation: ARROW_ORIENTATION.RIGHT,
      arrowStyle,
      style: {
        left: `-${POPPER_WIDTH + POPPER_MARGIN}px`
      }
    };
  }

  // calculate and apply vertical offset if there is not enough room below
  // the anchor to render the popper
  if (hasRoomBottom === false && displayProperties) {
    const offset =
      POPPER_HEIGHT -
      (window.innerHeight - anchorRect.bottom + anchorRect.height);
    displayProperties = {
      ...displayProperties,
      arrowStyle: {
        // make sure the arrow position is also adjusted
        top: `calc(${anchorRect.height}px / 4 + ${offset}px)`
      },
      style: {
        ...displayProperties.style,
        top: -offset
      }
    };
  }

  return displayProperties;
};

/**
 * renders a Popper with the provided content
 * - positioning based on screen dimensions and anchor positioning
 * - options for displaying arrow
 */
export const Popper = props => {
  const classnames = Popper.classnames(props);
  const { anchorEl, displayArrow } = props;
  const { POPPER_WIDTH, POPPER_HEIGHT, ARROW_ORIENTATION } = constants;
  const [displayProperties] = React.useState(
    getPopperProps(anchorEl.getBoundingClientRect())
  );

  return (
    <div
      className={classnames.element("root")}
      style={{
        ...displayProperties.style,
        width: POPPER_WIDTH,
        height: POPPER_HEIGHT
      }}
    >
      {displayArrow && (
        <div
          style={displayProperties.arrowStyle}
          className={classnames.element("arrow", {
            left: displayProperties.arrowOrientation === ARROW_ORIENTATION.LEFT,
            right:
              displayProperties.arrowOrientation === ARROW_ORIENTATION.RIGHT
          })}
        />
      )}
      <div className={classnames.element("content")}>{props.children}</div>
    </div>
  );
};
Popper.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}Popper`);
Popper.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    content: PropTypes.string,
    arrow: PropTypes.string,
    arrowLeft: PropTypes.string,
    arrowRight: PropTypes.string
  }),
  anchorEl: PropTypes.object.isRequired,
  displayArrow: PropTypes.bool
};
Popper.defaultProps = {
  classes: {},
  displayArrow: true
};

export default withStyles(styles)(Popper);
