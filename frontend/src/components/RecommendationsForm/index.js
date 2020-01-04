import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { Typography } from "@material-ui/core";

import {
  AppContextConsumer,
  ACTIONS,
  CONTENT_OPTIONS
} from "../../../pages/index";
import UsersField from "./UsersField";
import ActionButton from "../ActionButton";
import styles from "./index.styles";

/**
 * renders instructions for how to start getting recommendations and an input for user IDs
 */
export const RecommendationsForm = props => {
  const classnames = RecommendationsForm.classnames(props);
  const { dispatch, users } = props;
  const [usersValue, setUsersValue] = React.useState(users);

  // disable the submit button if no SteamIDs have been added
  const submitDisabled = !usersValue.length > 0;

  return (
    <div className={classnames.root()}>
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
          your recommendations. By default, Wye will recommend the top rated
          multiplayer game owned by the majority of the entered SteamIDs, but
          additional filters will become available after the initial search. Use
          the field below to add up to six SteamIDs, then click "Go!".
        </Typography>
      </div>
      <div className={classnames.element("userFieldContainer")}>
        <UsersField usersValue={usersValue} setUsersValue={setUsersValue} />
      </div>
      <ActionButton
        className={classnames.element("submitButton")}
        disabled={submitDisabled}
        onClick={() => {
          dispatch({ type: ACTIONS.SET_USERS, value: usersValue });
          dispatch({
            type: ACTIONS.SET_CONTENT,
            value: CONTENT_OPTIONS.RECOMMENDATIONS
          });
        }}
      />
    </div>
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
  // users value from context
  users: PropTypes.array
};
RecommendationsForm.defaultProps = {
  classes: {}
};

// Apply styles to the RecommendationsForm
export const StyledRecommendationsForm = withStyles(styles)(
  RecommendationsForm
);

/**
 * Renders a StyledRecommendationsForm with context from the index page
 */
export const RecommendationsFormWithContext = props => (
  <AppContextConsumer>
    {context => {
      const dispatch = get(context, "dispatch", () => {});
      const users = get(context, ["state", "users"], []);
      return (
        <StyledRecommendationsForm
          dispatch={dispatch}
          users={users}
          {...props}
        />
      );
    }}
  </AppContextConsumer>
);

export default RecommendationsFormWithContext;
