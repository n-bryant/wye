import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";

import Link from "next/link";
import Typography from "@material-ui/core/Typography";

import { AppContextConsumer } from "../../pages/index";
import ActionButton from "./ActionButton";
import styles from "./WelcomeEmptyState.styles";

/**
 * renders welcome/instruction messages and a button to get started
 * with recommendations
 */
export const WelcomeEmptyState = props => {
  const classnames = WelcomeEmptyState.classnames(props);
  const { dispatch } = props;
  const buttonLabel = "Get Started";

  return (
    <div className={classnames.root()}>
      <div className={classnames.element("welcomeMessageContainer")}>
        <Typography variant="h1" className={classnames.element("title")}>
          Welcome!
        </Typography>
        <Typography variant="body1" className={classnames.element("message")}>
          A wye is a plumbing component used to join together multiple branches
          of piping. Similarly, Wye is a third party tool that seeks to bring
          friends together by answering that age old question...
        </Typography>
        <Typography variant="h2">What should we play together?</Typography>
      </div>
      <div className={classnames.element("instructionsContainer")}>
        <Typography variant="body1" className={classnames.element("message")}>
          Wye uses your{" "}
          <Link href="/faq/#steamid">
            <a className={classnames.element("link")}>SteamID</a>
          </Link>{" "}
          and Steam's public{" "}
          <Link
            href="https://developer.valvesoftware.com/wiki/Steam_Web_API"
            prefetch={false}
          >
            <a className={classnames.element("link")} target="_blank">
              API
            </a>
          </Link>{" "}
          to recommend games for you and your friends to play based on your
          Steam libraries. To get started, make sure you have your SteamIDs
          handy and your Steam profiles set to public. Then, click the "
          {buttonLabel}" button below!
        </Typography>
        <Link href="/faq/#profile">
          <a className={classnames.element("link")}>
            Why do our Steam profiles need to be set to public?
          </a>
        </Link>
        <ActionButton
          label={buttonLabel}
          onClick={() => {
            dispatch({ type: "setShowForm", value: true });
          }}
        />
      </div>
    </div>
  );
};
WelcomeEmptyState.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}WelcomeEmptyState`
);
WelcomeEmptyState.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    welcomeMessageContainer: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    instructionsContainer: PropTypes.string,
    link: PropTypes.string
  }),
  dispatch: PropTypes.func
};
WelcomeEmptyState.defaultProps = {
  classes: {}
};

// apply styles
export const StyledWelcomeEmptyState = withStyles(styles)(WelcomeEmptyState);

/**
 * Renders a StyledWelcomeEmptyState with context from the index page
 */
export const WelcomeEmptyStateWithContext = props => (
  <AppContextConsumer>
    {context => {
      const dispatch = get(context, "dispatch", () => {});
      return <StyledWelcomeEmptyState dispatch={dispatch} {...props} />;
    }}
  </AppContextConsumer>
);

export default WelcomeEmptyStateWithContext;
