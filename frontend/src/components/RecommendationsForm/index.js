import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { Formik, Form } from "formik";
import { Typography } from "@material-ui/core";

import {
  AppContextConsumer,
  ACTIONS,
  CONTENT_OPTIONS
} from "../../../pages/index";
import UsersField from "./UsersField";
import ActionButton from "../ActionButton";
import styles from "./index.styles";

export const RECOMMENDATIONS_FORM_INITIAL_VALUES = {
  users: []
};

// set up a context provider for the form's context
const RecommendationsFormContext = React.createContext({});
export const RecommendationsFormContextProvider =
  RecommendationsFormContext.Provider;
export const RecommendationsFormContextConsumer =
  RecommendationsFormContext.Consumer;

/**
 * Renders a Formik form comprised of an input for user IDs
 */
export const RecommendationsForm = props => {
  const classnames = RecommendationsForm.classnames(props);
  const {
    dispatch,
    values: { users }
  } = props;

  // disable the submit button if no SteamIDs have been added
  const submitDisabled = !users || !users.length > 0;

  return (
    <Form className={classnames.root()}>
      <RecommendationsFormContextProvider value={props}>
        <Icon
          className={classnames.element("closeButton")}
          path={mdiClose}
          onClick={() =>
            dispatch({
              type: ACTIONS.SET_CONTENT,
              value: CONTENT_OPTIONS.WELCOME
            })
          }
        />
        <div className={classnames.element("formInstructions")}>
          <Typography className={classnames.element("title")} variant="h1">
            Getting Your Recommendations:
          </Typography>
          <Typography variant="body1">
            Wye will compare the libraries of each provided SteamID to generate
            multiplayer game recommendations. Use the field below to add up to
            six SteamIDs, then click "Go!".
          </Typography>
        </div>
        <div className={classnames.element("userFieldContainer")}>
          <UsersField />
        </div>
        <ActionButton
          className={classnames.element("submitButton")}
          disabled={submitDisabled}
          onClick={() => {
            dispatch({ type: ACTIONS.SET_USERS, value: users });
            dispatch({
              type: ACTIONS.SET_CONTENT,
              value: CONTENT_OPTIONS.RECOMMENDATIONS
            });
          }}
        />
      </RecommendationsFormContextProvider>
    </Form>
  );
};
RecommendationsForm.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}RecommendationsForm`
);
RecommendationsForm.propTypes = {
  // styles to apply to the form
  classes: PropTypes.shape({
    root: PropTypes.string,
    closeButton: PropTypes.string,
    formInstructions: PropTypes.string,
    title: PropTypes.string,
    userFieldContainer: PropTypes.string,
    submitButton: PropTypes.string
  }),
  // dispatch handler for updating state
  dispatch: PropTypes.func,
  // form values
  values: PropTypes.shape({
    users: PropTypes.array
  })
};
RecommendationsForm.defaultProps = {
  classes: {}
};

// Apply styles to the RecommendationsForm
export const StyledRecommendationsForm = withStyles(styles)(
  RecommendationsForm
);

/**
 * Renders a RecommendationsForm wrapped by Formik
 */
export const RecommendationsFormWithFormik = ({ initialValues, dispatch }) => {
  return (
    <Formik
      initialValues={initialValues || RECOMMENDATIONS_FORM_INITIAL_VALUES}
    >
      {props => <StyledRecommendationsForm dispatch={dispatch} {...props} />}
    </Formik>
  );
};
RecommendationsFormWithFormik.propTypes = {
  // The initial values to populate the form with
  initialValues: PropTypes.shape({})
};

/**
 * Renders a RecommendationsFormWithFormik with context from the index page
 */
export const RecommendationsFormWithContext = props => (
  <AppContextConsumer>
    {context => {
      const dispatch = get(context, "dispatch", () => {});
      return <RecommendationsFormWithFormik dispatch={dispatch} {...props} />;
    }}
  </AppContextConsumer>
);

export default RecommendationsFormWithContext;
