import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../lib/classNamePrefix";

import Icon from "@mdi/react";
import { mdiGithubCircle } from "@mdi/js";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

import Link from "next/link";
import WelcomeEmptyState from "../src/components/WelcomeEmptyState";
import RecommendationsForm from "../src/components/RecommendationsForm";
import IndexPageBackground from "../src/components/ScrollingBackground/IndexPageBackground";
import RecommendationsGrid from "../src/components/RecommendationsGrid";
import styles from "./index.styles";

import { AppContextConsumer, ACTIONS, CONTENT_OPTIONS } from "./_app";

/**
 * renders the index page's content,
 * dynamically displaying either the welcome content or the recommendations form
 */
export const Index = props => {
  const classnames = Index.classnames(props);
  const { content, dispatch } = props;

  const getContent = () => {
    switch (content) {
      case CONTENT_OPTIONS.WELCOME:
        return <WelcomeEmptyState />;
      case CONTENT_OPTIONS.FORM:
        return <RecommendationsForm />;
      case CONTENT_OPTIONS.RECOMMENDATIONS:
        return <RecommendationsGrid />;
      default:
        return <WelcomeEmptyState />;
    }
  };

  return (
    <div className={classnames.root()}>
      <Container
        className={classnames.element("container")}
        maxWidth={false}
        disableGutters
      >
        <AppBar position="static" className={classnames.element("appBar")}>
          <Toolbar className={classnames.element("toolBar")}>
            <Typography
              className={classnames.element("title")}
              variant="h1"
              onClick={() =>
                dispatch({
                  type: ACTIONS.SET_CONTENT,
                  value: CONTENT_OPTIONS.WELCOME
                })
              }
            >
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
            <div className={classnames.element("content")}>{getContent()}</div>
          </div>
        </div>
      </Container>
      <IndexPageBackground />
    </div>
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
    main: PropTypes.string,
    contentContainer: PropTypes.string,
    content: PropTypes.string
  })
};
Index.defaultProps = {
  classes: {}
};

// apply styles
export const StyledIndex = withStyles(styles)(Index);

/**
 * Renders a StyledRecommendationsForm with app context
 */
export const IndexWithContext = props => (
  <AppContextConsumer>
    {context => {
      const dispatch = get(context, "dispatch", () => {});
      const content = get(context, ["state", "content"], []);
      return <StyledIndex dispatch={dispatch} content={content} {...props} />;
    }}
  </AppContextConsumer>
);

export default IndexWithContext;
