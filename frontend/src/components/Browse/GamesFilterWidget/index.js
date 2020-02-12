import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { mdiFilterVariant } from "@mdi/js";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import LoadingState from "../../LoadingState";
import BackgroundProvider from "../../BackgroundProvider";
import FilteredGameList from "./FilteredGameList";
import AdvancedFiltersForm from "../AdvancedFiltersForm";
import ButtonWithHoverFill from "../../ButtonWithHoverFill";
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
            ownersFormatted
            userRating
            genres
            freeToPlay
            onSale
            discount
            initialPrice
            finalPrice
            headerImage
            capsuleLg
            backgroundImage
          }
          ownedBy
          recentlyPlayedBy
          playtime {
            steamId
            hoursPlayed
          }
        }
      }
    }
  }
`;

export const REFERRER_TYPES_MAP = {
  SALES: "SALES",
  PUBLISHERS: "PUBLISHERS"
};

// set up a context provider
const GamesFilterWidgetContext = React.createContext({});
export const GamesFilterWidgetContextProvider =
  GamesFilterWidgetContext.Provider;
export const GamesFilterWidgetContextConsumer =
  GamesFilterWidgetContext.Consumer;

/**
 * returns whether a given object has the provided property anywhere in its structure
 * @param {Object} obj
 * @param {String} property
 * @returns {Boolean}
 */
export function containsProperty(obj, property) {
  let hasProperty = false;
  [obj].forEach(function loop(value) {
    if (value[property]) {
      hasProperty = true;
    }

    if (typeof value === "object" && Object.keys(value).length > 0) {
      Object.keys(value).forEach(key => loop(value[key]));
    }
  });
  return hasProperty;
}

/**
 * renders the inner content of the GamesFilterWidget
 */
export const MainContent = ({
  classnames,
  title,
  subtitle,
  featuredBackgroundUrl,
  items = [],
  userDetails,
  initialValues = { filters: {} },
  referrerType
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // restrict further filtering to the original game list
  const appids = items.map(item => item.node.game.appid);
  initialValues = {
    ...initialValues,
    filters: {
      ...initialValues.filters,
      gameFilters: {
        ...initialValues.filters.gameFilters,
        appid_in: appids
      }
    }
  };

  let hiddenFields = [];
  if (referrerType) {
    switch (referrerType) {
      case REFERRER_TYPES_MAP.SALES:
        hiddenFields = hiddenFields.concat(["onSale", "freeToPlay"]);
        break;
      case REFERRER_TYPES_MAP.PUBLISHERS:
        hiddenFields = hiddenFields.concat([]);
        break;
    }
  }

  return (
    <div className={classnames.element("mainContent")}>
      <BackgroundProvider backgroundUrl={featuredBackgroundUrl}>
        <div className={classnames.element("contentWrapper")}>
          <AdvancedFiltersForm
            initialValues={initialValues}
            drawerOpen={drawerOpen}
            drawerCloseHandler={() => setDrawerOpen(false)}
            hiddenFields={hiddenFields}
          />
          <Container
            className={classnames.element("headingContainer")}
            maxWidth="lg"
            disableGutters={true}
          >
            <Box my={4}>
              <Typography
                className={classnames.element("heading")}
                variant="h2"
                gutterBottom={true}
              >
                {title}
              </Typography>
              <Typography
                className={classnames.element("subHeading")}
                variant="body1"
                gutterBottom={true}
              >
                {subtitle}
              </Typography>
            </Box>
            <Box my={4}>
              <ButtonWithHoverFill
                handleClick={() => setDrawerOpen(true)}
                icon={mdiFilterVariant}
                label="filter"
                displayLabel={true}
              />
            </Box>
          </Container>
          <FilteredGameList items={items} userDetails={userDetails} />
        </div>
      </BackgroundProvider>
    </div>
  );
};
MainContent.propTypes = {
  // the classnames helper from the parent GamesFilterWidget
  classnames: PropTypes.object.isRequired,
  // the title to render for the content
  title: PropTypes.string.isRequired,
  // the subtitle to render for the content
  subtitle: PropTypes.string.isRequired,
  // the background image path of the top result of the filtered list
  featuredBackgroundUrl: PropTypes.string.isRequired,
  // the list of items to display
  items: PropTypes.array,
  // user information
  userDetails: PropTypes.array,
  // initial values for the advanced filters form
  initialValues: PropTypes.object,
  // the type of page that requested a GameFilterWidget
  referrerType: PropTypes.oneOf(
    Object.keys(REFERRER_TYPES_MAP).map(key => REFERRER_TYPES_MAP[key])
  )
};

/**
 * renders a Button wrapped with a Link that serves as a Quick Link
 */
export const GamesFilterWidget = props => {
  const classnames = GamesFilterWidget.classnames(props);
  const { initialFilters, title, subtitle } = props;
  const [filteredDataSet, setFilteredDataset] = React.useState({});
  const [filterOptions, setFilterOptions] = React.useState(
    initialFilters ? initialFilters : {}
  );

  return (
    <div className={classnames.root()}>
      <GamesFilterWidgetContextProvider
        value={{
          filterOptions,
          setFilterOptions,
          filteredDataSet
        }}
      >
        <FilterGamesQuery
          variables={filterOptions}
          classnames={classnames}
          onDataReceived={setFilteredDataset}
          title={title}
          subtitle={subtitle}
        />
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
    root: PropTypes.string,
    contentWrapper: PropTypes.string,
    mainContent: PropTypes.string,
    heading: PropTypes.string,
    subHeading: PropTypes.string
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
  }),
  // the title to render for the content
  title: PropTypes.string.isRequired,
  // the subtitle to render for the content
  subtitle: PropTypes.string.isRequired
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
  const { variables, onDataReceived } = props;

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

        // compile data for children
        onDataReceived(data);
        const featuredBackgroundUrl = get(data, ["recommendations", "edges"])[0]
          .node.game.backgroundImage;
        const items = get(data, ["recommendations", "edges"], []);
        const userDetails = get(data, ["recommendations", "userDetails"], []);

        return (
          <MainContent
            featuredBackgroundUrl={featuredBackgroundUrl}
            items={items}
            userDetails={userDetails}
            initialValues={variables}
            {...props}
          />
        );
      }}
    </Query>
  );
};
FilterGamesQuery.propTypes = {
  // variables to provide to the query
  variables: PropTypes.object,
  // handler for when data has been fetched
  onDataReceived: PropTypes.func
};

export default StyledGamesFilterWidget;
