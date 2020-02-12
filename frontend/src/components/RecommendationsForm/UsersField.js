import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Icon from "@mdi/react";
import { mdiAccountPlus, mdiAccountPlusOutline } from "@mdi/js";
import Chip from "@material-ui/core/Chip";

import styles from "./UsersField.styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// setting a max user count for performance gains
export const MAX_USER_COUNT = 6;

/**
 * renders a TextField that allows for inputting
 * multiple SteamID values that are rendered as removable Chips
 */
export const UsersField = props => {
  const classnames = UsersField.classnames(props);
  const { classes, name, setFieldValue, value } = props;
  const [textFieldValue, setTextFieldValue] = React.useState("");

  /**
   * adds a user to the users field value
   * @param {String} user
   */
  const addUser = user => {
    setFieldValue(name, value.concat([user]));
    setTextFieldValue("");
  };

  /**
   * removes a user from the users field value at the specified index
   * @param {Int} index
   */
  const removeUser = index => {
    setFieldValue(
      name,
      value.filter((_el, elIndex) => elIndex !== index)
    );
  };

  // should not be able to add a user if the text field is blank,
  // or if the allowed number of users has already been added
  const addUserDisabled =
    !textFieldValue.length ||
    value.length >= MAX_USER_COUNT ||
    value.some(val => val === textFieldValue);
  const textFieldDisabled = value.length >= MAX_USER_COUNT;

  return (
    <div className={classnames.root()}>
      <div className={classnames.element("addUserfieldContainer")}>
        <TextField
          className={classnames.element("addUserField")}
          InputLabelProps={{
            classes: {
              disabled: props.classes.fieldRoot
            }
          }}
          label="Add a SteamID:"
          placeholder="e.g. - 76561197975995523"
          autoFocus={true}
          disabled={textFieldDisabled}
          value={textFieldValue}
          onChange={event => {
            setTextFieldValue(event.target.value);
          }}
          onKeyPress={event => {
            // allow for usage of the enter key to add a user
            if (event.key === "Enter") {
              event.preventDefault();

              if (!addUserDisabled) {
                addUser(event.target.value);
              }
            }
          }}
        />
        <Button
          className={classnames.element("addUserButton")}
          onClick={() => {
            addUser(textFieldValue);
          }}
          disabled={addUserDisabled}
        >
          <Icon
            className={classnames.element("addUserIcon", {
              enabled: !addUserDisabled,
              disabled: addUserDisabled
            })}
            path={
              !addUserDisabled && textFieldValue.length
                ? mdiAccountPlus
                : mdiAccountPlusOutline
            }
          />
        </Button>
      </div>
      <div className={classnames.element("fieldItemsContainer")}>
        {value &&
          value.map((_user, index) => {
            return (
              <Chip
                key={index}
                label={value[index]}
                onDelete={() => removeUser(index)}
                className={classnames.element("chip")}
                variant="outlined"
                classes={{
                  outlined: classes.chip,
                  deleteIcon: classes.deleteIcon
                }}
              />
            );
          })}
      </div>
    </div>
  );
};
UsersField.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}UsersField`
);
UsersField.propTypes = {
  // styles to apply to the form
  classes: PropTypes.shape({
    root: PropTypes.string,
    fieldItemsContainer: PropTypes.string,
    chip: PropTypes.string,
    deleteIcon: PropTypes.string,
    addUserfieldContainer: PropTypes.string,
    addUserField: PropTypes.string,
    addUserButton: PropTypes.string,
    addUserIcon: PropTypes.string,
    addUserIconEnabled: PropTypes.string
  }),
  // Formik field name
  name: PropTypes.string,
  // users field value from Formik form
  value: PropTypes.array,
  // handler for updating users field value
  setFieldValue: PropTypes.func
};
UsersField.defaultProps = {
  classes: {}
};

// apply styles
export default withStyles(styles)(UsersField);
