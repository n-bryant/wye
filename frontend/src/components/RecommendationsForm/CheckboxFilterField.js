import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

import styles from "./CheckboxFilterField.styles";

/**
 * renders a field for electing a selection of values in the form of a checkbox list
 */
export const CheckboxFilterField = props => {
  const classnames = CheckboxFilterField.classnames(props);
  const {
    classes,
    name,
    category,
    type,
    label,
    setFieldValue,
    value,
    options
  } = props;

  // set up initial state values
  let initialState = {};
  options.forEach(option => {
    initialState[option] = false;
  });
  const [checkedOptions, setCheckedOptions] = React.useState(initialState);

  /**
   * handle changes to the CheckBox options,
   * and update formik field value
   * @param {String} option
   */
  const handleChange = option => event => {
    const newValue = { ...checkedOptions, [option]: event.target.checked };
    setCheckedOptions(newValue);
    setFieldValue(name, {
      ...value,
      [category]: {
        ...value[category],
        [type]: Object.keys(newValue).filter(key => Boolean(newValue[key]))
      }
    });
  };

  const optionsCount = Object.keys(checkedOptions).length;
  const selectedOptionsCount = Object.keys(checkedOptions).filter(
    key => !!checkedOptions[key]
  ).length;
  return (
    <div className={classnames.root()}>
      <Typography
        className={classnames.element("label")}
        variant="body2"
        gutterBottom={true}
      >
        {`${label} ${optionsCount} ${
          selectedOptionsCount > 0 ? `- (${selectedOptionsCount} selected)` : ""
        }`}
      </Typography>
      <div className={classnames.element("optionsContainer")}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                classes={{
                  root: classes.checkbox,
                  checked: classes.checkboxChecked
                }}
                checked={checkedOptions[option]}
                color="default"
                onChange={handleChange(option)}
                value={option}
                inputProps={{ "aria-label": `${name}-option_${option}` }}
              />
            }
            label={option}
          />
        ))}
      </div>
    </div>
  );
};
CheckboxFilterField.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}CheckboxFilterField`
);
CheckboxFilterField.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    checkbox: PropTypes.string,
    label: PropTypes.string,
    optionsContainer: PropTypes.string,
    checkboxChecked: PropTypes.string
  }),
  // Formik field name
  name: PropTypes.string,
  // which filter category is the field for
  category: PropTypes.oneOf(["gameFilters", "playerFilters"]),
  // which filter type is it
  type: PropTypes.oneOf([
    "ownedBy",
    "recentlyPlayedBy",
    "publishers_in",
    "developers_in",
    "genres_in",
    "tags_in"
  ]).isRequired,
  // the label to display for the field
  label: PropTypes.string,
  // playerFilters field value from Formik form
  value: PropTypes.object,
  // handler for updating users field value
  setFieldValue: PropTypes.func,
  // the available steamids to select
  options: PropTypes.array
};
CheckboxFilterField.defaultProps = {
  classes: {}
};

// apply styles
export default withStyles(styles)(CheckboxFilterField);
