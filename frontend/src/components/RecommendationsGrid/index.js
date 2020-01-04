import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { AppContextConsumer } from "../../../pages/index";
import LoadingState from "./LoadingState";
import UserAvatar from "./UserAvatar";
import Item from "./Item";
import styles from "./index.styles";

// recommendations query
export const GET_RECOMMENDATIONS_QUERY = gql`
  query GET_RECOMMENDATIONS_QUERY($users: [ID!]!) {
    recommendations(users: $users) {
      pageInfo {
        totalCount
      }
      userDetails {
        id
        profileUrl
        avatarName
        avatarImageUrl
        onlineStatus
        lastOnlineTime
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
            hoursPlayed
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
  // console.log(data);
  const edges = get(data, ["recommendations", "edges"], []);
  const userDetails = get(data, ["recommendations", "userDetails"], []);

  // loading state
  if (loading) {
    return <LoadingState />;
  }

  // error state
  if (error) {
    return <div>error placeholder</div>;
  }

  return (
    <Grid className={classnames.root()} container spacing={2}>
      <Grid
        className={classnames.element("subGrid", {
          withDivider: true
        })}
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography
            className={classnames.element("subGridTitle")}
            variant="h1"
          >
            Showing Recommendations For:
          </Typography>
        </Grid>
        <Grid
          className={classnames.element("avatarContainer")}
          container
          item
          xs={12}
          spacing={2}
        >
          {userDetails.map((data, index) => (
            <UserAvatar key={index} data={data} />
          ))}
        </Grid>
      </Grid>
      <Grid className={classnames.element("subGrid")} container spacing={3}>
        <Grid item xs={12}>
          <Typography
            className={classnames.element("subGridTitle")}
            variant="h3"
          >
            Top Recommendation:
          </Typography>
        </Grid>
        <Item featured={true} userDetails={userDetails} data={edges[0].node} />
      </Grid>
      <Grid className={classnames.element("subGrid")} container spacing={3}>
        <Grid item xs={12}>
          <Typography
            className={classnames.element("subGridTitle")}
            variant="h3"
          >
            Other Recommendations:
          </Typography>
        </Grid>
        {edges.slice(1, 11).map((item, index) => (
          <Item
            key={index}
            featured={false}
            userDetails={userDetails}
            data={item.node}
          />
        ))}
      </Grid>
    </Grid>
  );
};
RecommendationsGrid.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}RecommendationsGrid`
);
RecommendationsGrid.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    subGrid: PropTypes.string,
    subGridWithDivider: PropTypes.string,
    avatarContainer: PropTypes.string,
    subGridTitle: PropTypes.string
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
