import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

import styles from "./BooleanFilterField.styles";

/**
 * renders a field for electing a boolean value in the form of a Switch
 */
export const BooleanFilterField = props => {
  const classnames = BooleanFilterField.classnames(props);
  const { classes, name, type, label, setFieldValue, value } = props;
  const [checked, setChecked] = React.useState(false);

  /**
   * handle changes to the Switch,
   * and update formik field value
   * @param {String} option
   */
  const handleChange = event => {
    setChecked(event.target.checked);
    setFieldValue(name, {
      ...value,
      gameFilters: {
        ...value.gameFilters,
        [type]: event.target.checked
      }
    });
  };

  return (
    <div className={classnames.root()}>
      <Typography
        className={classnames.element("label")}
        variant="body2"
        gutterBottom={true}
      >
        {label}
      </Typography>
      <div>
        <Switch
          classes={{
            switchBase: classes.switch,
            checked: classes.switchChecked,
            track: classes.switch
          }}
          checked={checked}
          onChange={handleChange}
          value={label}
          color="primary"
          inputProps={{ "aria-label": `${type}-checkbox` }}
        />
      </div>
    </div>
  );
};
BooleanFilterField.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BooleanFilterField`
);
BooleanFilterField.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    label: PropTypes.string,
    switch: PropTypes.string,
    switchChecked: PropTypes.string
  }),
  // Formik field name
  name: PropTypes.string,
  // the label to display for the field
  label: PropTypes.string,
  // the type of field
  type: PropTypes.oneOf(["freeToPlay", "onSale"]).isRequired,
  // gameFilters field value from Formik form
  value: PropTypes.object,
  // handler for updating users field value
  setFieldValue: PropTypes.func
};
BooleanFilterField.defaultProps = {
  classes: {}
};

// apply styles
export default withStyles(styles)(BooleanFilterField);
