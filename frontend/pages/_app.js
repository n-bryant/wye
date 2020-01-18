import React from "react";
import App from "next/app";

import Page from "../src/components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

import CssBaseline from "@material-ui/core/CssBaseline";

import NextNProgress from "../src/components/NextNProgress";

// set up a context provider
const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

// reducer action and content options
export const ACTIONS = {
  SET_USERS: "setUsers",
  SET_CONTENT: "setContent"
};
export const CONTENT_OPTIONS = {
  WELCOME: "WELCOME",
  FORM: "FORM",
  RECOMMENDATIONS: "RECOMMENDATIONS"
};

// initial state values
export const INITIAL_STATE = {
  content: CONTENT_OPTIONS.WELCOME,
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
    case ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.value
      };
    case ACTIONS.SET_CONTENT:
      return {
        ...state,
        content: action.value
      };
    default:
      throw new Error();
  }
};

export class WyeApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // expose query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    return <WyeWithState {...this.props} />;
  }
}

// app with state
export const WyeWithState = props => {
  const { Component, apollo, pageProps } = props;
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <React.Fragment>
      <CssBaseline />
      <NextNProgress />
      <ApolloProvider client={apollo}>
        <AppContextProvider
          value={{
            state,
            dispatch
          }}
        >
          <Page>
            <Component {...pageProps} />
          </Page>
        </AppContextProvider>
      </ApolloProvider>
    </React.Fragment>
  );
};

// app with apollo client
export const WyeWithData = withData(WyeApp);

export default WyeWithData;
