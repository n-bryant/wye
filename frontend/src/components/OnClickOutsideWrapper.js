import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";
import createClassNameGenerator from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";

// supply a root classname here
const styles = theme => ({
  root: {}
});

/**
 * Wrapper component for handling on click outside interactions with the provided children
 */
export class OnClickOutsideWrapper extends Component {
  componentDidMount = () => {
    document.addEventListener("click", this.checkIfOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener("click", this.checkIfOutside);
  };

  /**
   * Set the wrapper ref
   */
  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  /**
   * Check if a click has occurred outside of the children and call the passed handler if it has
   */
  checkIfOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.props.handleClickOutside();
    }
  };

  render() {
    const { classes } = this.props;
    const classnames = OnClickOutsideWrapper.classnames({ classes });
    return (
      <div ref={this.setWrapperRef} className={classnames.root()}>
        {this.props.children}
      </div>
    );
  }
}
OnClickOutsideWrapper.classnames = createClassNameGenerator(
  `${JSS_CLASS_NAME_PREFIX}OnClickOutsideWrapper`
);
OnClickOutsideWrapper.propTypes = {
  // root classname
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // what to render inside the wrapper
  children: PropTypes.element.isRequired,
  // the function to call when a click occurrs outside the provided children
  handleClickOutside: PropTypes.func.isRequired
};

export default withStyles(styles)(OnClickOutsideWrapper);
