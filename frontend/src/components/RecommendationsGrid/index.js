import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import { AppContextConsumer } from "../../../pages/index";
import styles from "./index.styles";

// recommendations query
export const GET_RECOMMENDATIONS_QUERY = gql`
  query GET_RECOMMENDATIONS_QUERY($users: [String!]!) {
    recommendations(users: $users) {
      pageInfo {
        totalCount
      }
      edges {
        node {
          game {
            appid
            name
            developers
            publishers
            genres
            tags
            freeToPlay
            onSale
            discount
            initialPrice
            finalPrice
            userRating
            logoImageUrl
            heroImageUrl
          }
          ownedBy
          recentlyPlayedBy
          playtime {
            id
            playtime
          }
        }
      }
    }
  }
`;

/**
 * renders a grid of recommendations for the provided users
 */
export const RecommendationsGrid = props => {
  const classnames = RecommendationsGrid.classnames(props);
  const { users } = props;

  // with query
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS_QUERY, {
    variables: { users }
  });
  console.log(data);

  return <div className={classnames.root()}>grid placeholder</div>;
};
RecommendationsGrid.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}RecommendationsGrid`
);
RecommendationsGrid.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // users to get recommendations for
  users: PropTypes.array
};
RecommendationsGrid.defaultProps = {
  classes: {},
  users: []
};

// apply styles
export const StyledRecommendationsGrid = withStyles(styles)(
  RecommendationsGrid
);

/**
 * Renders a StyledRecommendationsGrid with context from the index page
 */
export const RecommendationsGridWithContext = props => (
  <AppContextConsumer>
    {context => {
      const users = get(context, ["state", "users"], []);
      return <StyledRecommendationsGrid users={users} {...props} />;
    }}
  </AppContextConsumer>
);

export default RecommendationsGridWithContext;
