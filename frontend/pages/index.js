import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../lib/classNamePrefix";

import Icon from "@mdi/react";
import { mdiGithubCircle } from "@mdi/js";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

import Link from "next/link";
import WelcomeEmptyState from "../src/components/WelcomeEmptyState";
import RecommendationsForm from "../src/components/RecommendationsForm/RecommendationsForm";
import IndexPageBackground from "../src/components/ScrollingBackground/IndexPageBackground";
import styles from "./index.styles";

// set up a context provider
const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

// initial state values
export const INITIAL_STATE = {
  showForm: false,
  users: []
};
/**
 * reducer for updating state values
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "setShowForm":
      return {
        ...state,
        showForm: action.value
      };
    case "setUsers":
      return {
        ...state,
        users: action.value
      };
    default:
      throw new Error();
  }
};

/**
 * renders the index page's content,
 * dynamically displaying either the welcome content or the recommendations form
 */
export const Index = props => {
  const classnames = Index.classnames(props);
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <AppContextProvider
      value={{
        state,
        dispatch
      }}
    >
      <div className={classnames.root()}>
        <Container
          className={classnames.element("container")}
          maxWidth={false}
          disableGutters
        >
          <AppBar position="static" className={classnames.element("appBar")}>
            <Toolbar className={classnames.element("toolBar")}>
              <Typography className={classnames.element("title")} variant="h1">
                Wye
              </Typography>
              <div className={classnames.element("linksContainer")}>
                <Link href="/faq">
                  <a className={classnames.element("link")}>faq</a>
                </Link>
                <Link href="https://github.com/n-bryant/wye" prefetch={false}>
                  <a className={classnames.element("link")} target="_blank">
                    <Icon
                      className={classnames.element("githubIcon")}
                      path={mdiGithubCircle}
                    />
                  </a>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
          <div className={classnames.element("main")}>
            <div className={classnames.element("contentContainer")}>
              <div className={classnames.element("content")}>
                {state.showForm ? (
                  <RecommendationsForm className={classnames.element("form")} />
                ) : (
                  <WelcomeEmptyState />
                )}
              </div>
            </div>
          </div>
        </Container>
        <IndexPageBackground />
      </div>
    </AppContextProvider>
  );
};
Index.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}Index`);
Index.propTypes = {
  // styles applied
  classes: PropTypes.shape({
    root: PropTypes.string,
    container: PropTypes.string,
    appBar: PropTypes.string,
    toolBar: PropTypes.string,
    title: PropTypes.string,
    linksContainer: PropTypes.string,
    link: PropTypes.string,
    githubIcon: PropTypes.string,
    form: PropTypes.string,
    main: PropTypes.string,
    contentContainer: PropTypes.string,
    content: PropTypes.string
  })
};
Index.defaultProps = {
  classes: {}
};

export default withStyles(styles)(Index);
