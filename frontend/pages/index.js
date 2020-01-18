import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../lib/classNamePrefix";

import Container from "@material-ui/core/Container";

import WelcomeEmptyState from "../src/components/WelcomeEmptyState";
import RecommendationsForm from "../src/components/RecommendationsForm";
import IndexPageBackground from "../src/components/ScrollingBackground/IndexPageBackground";
import RecommendationsGrid from "../src/components/RecommendationsGrid";
import styles from "./index.styles";

import { AppContextConsumer, CONTENT_OPTIONS } from "./_app";

/**
 * renders the index page's content,
 * dynamically displaying either the welcome content, recommendations form, or recommendations grid
 */
export const Index = props => {
  const classnames = Index.classnames(props);
  const { content } = props;

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
 * Renders a StyledIndex with app context
 */
export const IndexWithContext = props => (
  <AppContextConsumer>
    {context => {
      const content = get(context, ["state", "content"], []);
      return <StyledIndex content={content} {...props} />;
    }}
  </AppContextConsumer>
);

export default IndexWithContext;
