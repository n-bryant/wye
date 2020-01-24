import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { makeStyles } from "@material-ui/core/styles";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import LoadingState from "./LoadingState";

// query for the background image for the most popular game
export const GET_MOST_POPULAR_BACKGROUND_QUERY = gql`
  query GET_MOST_POPULAR_BACKGROUND_QUERY {
    mostPopularBackgroundSrc
  }
`;

// styles to apply: background value updated once the image has loaded
const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    background: "black",
    overflow: "auto",
    position: "relative"
  },
  loaded: props => ({
    backgroundImage: `url(${props.backgroundUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }),
  backgroundPlaceholder: {
    width: "0",
    height: "0",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0"
  }
});

/**
 * renders a container with the specified background image
 */
export const BackgroundProvider = props => {
  const classes = useStyles(props);
  const classnames = BackgroundProvider.classnames({ classes });
  const { backgroundUrl, children } = props;

  const [loaded, setLoaded] = React.useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={classnames.root({
        loaded
      })}
    >
      {!loaded && backgroundUrl.length && (
        <img
          className={classnames.element("backgroundPlaceholder")}
          onLoad={onLoad}
          src={backgroundUrl}
        />
      )}
      {children}
    </div>
  );
};
BackgroundProvider.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BackgroundProvider`
);
BackgroundProvider.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    loaded: PropTypes.string,
    backgroundPlaceholder: PropTypes.string
  }),
  // background image path
  backgroundUrl: PropTypes.string.isRequired
};
BackgroundProvider.defaultProps = {
  classes: {}
};

/**
 * renders a Query that pulls the background image of the most popular game and returns a BackgroundProvider
 */
const BackgroundQuery = props => {
  const { src } = props;
  return (
    <Query query={GET_MOST_POPULAR_BACKGROUND_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div style={{ height: "100%", background: "black" }}>
              <LoadingState />
            </div>
          );
        }

        if (error) {
          return (
            <div style={{ height: "100%", background: "black" }}>
              {props.children}
            </div>
          );
        }

        // set the background path either with the provided src override or the value from the query
        const backgroundUrl =
          src && src.length ? src : get(data, "mostPopularBackgroundSrc");

        return <BackgroundProvider backgroundUrl={backgroundUrl} {...props} />;
      }}
    </Query>
  );
};
BackgroundQuery.propTypes = {
  // override value for the background image path
  src: PropTypes.string
};

export default BackgroundQuery;
