import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import get from "lodash.get";
import { Field } from "formik";
import Icon from "@mdi/react";
import { mdiAccountPlus, mdiAccountPlusOutline } from "@mdi/js";
import Chip from "@material-ui/core/Chip";

import { RecommendationsFormContextConsumer } from "./index";
import styles from "./UsersField.styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// setting a max user count for performance gains
export const MAX_USER_COUNT = 6;

/**
 * renders a formik Field wrapping a TextField that allows for inputting
 * multiple SteamID values that are rendered as removable Chips
 */
export const UsersField = props => {
  const classnames = UsersField.classnames(props);
  const { classes, setFieldValue, values } = props;
  const [textFieldValue, setTextFieldValue] = React.useState("");

  /**
   * adds a user to the formik users field value
   * @param {String} value
   */
  const addUser = value => {
    if (values.users && values.users.length) {
      setFieldValue("users", values.users.concat([value]));
    } else {
      setFieldValue("users", [value]);
    }
    setTextFieldValue("");
  };

  /**
   * removes a user from the formik users field value at the specified index
   * @param {Int} index
   */
  const removeUser = index => {
    setFieldValue(
      "users",
      values.users.filter((_el, elIndex) => elIndex !== index)
    );
  };

  return (
    <Field name="users">
      {({ field, form, meta }) => {
        // should not be able to add a user if the text field is blank,
        // or if the allowed number of users has already been added
        const addUserDisabled =
          !textFieldValue.length ||
          (meta.value && meta.value.length >= MAX_USER_COUNT);
        const textFieldDisabled =
          meta.value && meta.value.length >= MAX_USER_COUNT;

        return (
          <div className={classnames.root()}>
            <div className={classnames.element("addUserfieldContainer")}>
              <TextField
                className={classnames.element("addUserField")}
                label="Add a SteamID:"
                placeholder="e.g. - 76561197975995523"
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
                    enabled: textFieldValue.length
                  })}
                  path={
                    textFieldValue.length
                      ? mdiAccountPlus
                      : mdiAccountPlusOutline
                  }
                />
              </Button>
            </div>
            <div className={classnames.element("fieldItemsContainer")}>
              <Typography
                className={classnames.element("chipsLabel", {
                  hidden: !field.value || !field.value.length
                })}
              >
                SteamIDs:
              </Typography>
              {field.value &&
                field.value.map((_user, index) => {
                  return (
                    <Chip
                      key={index}
                      label={field.value[index]}
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
      }}
    </Field>
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
    chipsLabel: PropTypes.string,
    chipsLabelHidden: PropTypes.string,
    chip: PropTypes.string,
    deleteIcon: PropTypes.string,
    addUserfieldContainer: PropTypes.string,
    addUserField: PropTypes.string,
    addUserButton: PropTypes.string,
    addUserIcon: PropTypes.string,
    addUserIconEnabled: PropTypes.string
  }),
  // Formik values
  values: PropTypes.object,
  // method to explicitly set a Formik field value
  setFieldValue: PropTypes.func
};
UsersField.defaultProps = {
  classes: {}
};

// apply styles
export const StyledUsersField = withStyles(styles)(UsersField);

/**
 * Renders a StyledUsersField with context from the RecommendationsForm
 */
export const UsersFieldWithContext = props => (
  <RecommendationsFormContextConsumer>
    {context => {
      const setFieldValue = get(context, "setFieldValue", () => {});
      const values = get(context, "values", () => {});
      return (
        <StyledUsersField
          setFieldValue={setFieldValue}
          values={values}
          {...props}
        />
      );
    }}
  </RecommendationsFormContextConsumer>
);

export default UsersFieldWithContext;