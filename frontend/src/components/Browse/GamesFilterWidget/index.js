import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import LoadingState from "../../LoadingState";
import BackgroundProvider from "../../BackgroundProvider";
import styles from "./index.styles";

// query for a list of games, filtered by the provided criteria
export const GAMES_FILTER_QUERY = gql`
  query GAMES_FILTER_QUERY(
    $users: [ID]
    $filters: FilterInput
    $orderBy: [OrderByField!]
    $sortOrder: OrderDirection
    $first: Int
  ) {
    recommendations(
      users: $users
      filters: $filters
      orderBy: $orderBy
      sortOrder: $sortOrder
      first: $first
    ) {
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
            ownersFormatted
            userRating
            genres
            freeToPlay
            onSale
            discount
            initialPrice
            finalPrice
            headerImage
            backgroundImage
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

// set up a context provider
const GamesFilterWidgetContext = React.createContext({});
export const GamesFilterWidgetContextProvider =
  GamesFilterWidgetContext.Provider;
export const GamesFilterWidgetContextConsumer =
  GamesFilterWidgetContext.Consumer;

/**
 * renders the inner content of the GamesFilterWidget
 */
export const MainContent = ({ classnames, featuredBackgroundUrl }) => {
  return (
    <div className={classnames.element("mainContent")}>
      <BackgroundProvider backgroundUrl={featuredBackgroundUrl}>
        <div>GamesFilterWidget placeholder</div>
      </BackgroundProvider>
    </div>
  );
};
MainContent.propTypes = {
  // the classnames helper from the parent GamesFilterWidget
  classnames: PropTypes.object.isRequired,
  // the background image path of the top result of the filtered list
  featuredBackgroundUrl: PropTypes.string.isRequired
};

/**
 * renders a Button wrapped with a Link that serves as a Quick Link
 */
export const GamesFilterWidget = props => {
  const classnames = GamesFilterWidget.classnames(props);
  const { width, initialFilters } = props;
  const [filterOptions, setFilterOptions] = React.useState(
    initialFilters ? initialFilters : {}
  );

  return (
    <div className={classnames.root()}>
      <GamesFilterWidgetContextProvider
        value={{
          setFilterOptions
        }}
      >
        <FilterGamesQuery variables={filterOptions} classnames={classnames} />
      </GamesFilterWidgetContextProvider>
    </div>
  );
};
GamesFilterWidget.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}GamesFilterWidget`
);
GamesFilterWidget.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // width value from material-ui
  width: PropTypes.string,
  // any initial filtering options to be applied
  initialFilters: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.string),
    filters: PropTypes.shape({
      gameFilters: PropTypes.object,
      playerFilters: PropTypes.object
    }),
    orderBy: PropTypes.arrayOf(PropTypes.string),
    sortOrder: PropTypes.string,
    first: PropTypes.number
  })
};
GamesFilterWidget.defaultProps = {
  classes: {}
};

// apply styles
export const StyledGamesFilterWidget = withWidth()(
  withStyles(styles)(GamesFilterWidget)
);

/**
 * renders a Query that fetches a filtered list of games based on the options passed and returns a MainContent hydrated with data
 */
export const FilterGamesQuery = props => {
  const { variables } = props;

  return (
    <Query query={GAMES_FILTER_QUERY} variables={variables}>
      {({ loading, error, data }) => {
        if (loading) {
          return <LoadingState />;
        }

        if (error) {
          console.log(error);
          return <div>oops</div>;
        }

        // console.log(data);
        const featuredBackgroundUrl = get(data, ["recommendations", "edges"])[0]
          .node.game.backgroundImage;

        return (
          <MainContent
            featuredBackgroundUrl={featuredBackgroundUrl}
            {...props}
          />
        );
      }}
    </Query>
  );
};

export default StyledGamesFilterWidget;
