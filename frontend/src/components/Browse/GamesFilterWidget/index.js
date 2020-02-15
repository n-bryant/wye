import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { useRouter } from "next/router";

import { mdiFilterVariant, mdiArrowLeftBold } from "@mdi/js";

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
      filterOptions {
        publishers
        developers
        tags
        genres
        userRating_min
        userRating_max
        discount_min
        discount_max
        finalPrice_min
        finalPrice_max
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
            tags
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
            totalHours
            playtimeByUser {
              steamId
              hoursPlayed
            }
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
export const MainContent = ({
  classnames,
  title,
  subtitle,
  items = [],
  userDetails,
  initialValues = { filters: {} },
  filterOptions,
  fullSearch
}) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filtered, setFiltered] = React.useState(false);
  let gameList = [];
  if (items.length > 0) {
    gameList = items.map(edge => edge.node.game);
  }

  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className={classnames.element("mainContent")}>
      <GamesFilterWidgetContextConsumer>
        {context => {
          if (context.initialFilters !== initialValues) {
            setFiltered(true);
          } else if (!fullSearch) {
            // restrict further filtering to the original game list
            const appids = items.map(item => item.node.game.appid);
            initialValues.filters.gameFilters.appid_in = appids;
          }

          const useDefaultBackground = items.length === 0;

          return (
            <BackgroundProvider
              useDefault={useDefaultBackground}
              src={
                useDefaultBackground ? "" : items[0].node.game.backgroundImage
              }
            >
              <div className={classnames.element("contentWrapper")}>
                {drawerOpen && (
                  <AdvancedFiltersForm
                    initialValues={initialValues}
                    drawerCloseHandler={() => setDrawerOpen(false)}
                    resetPaginationHandler={() => setCurrentPage(1)}
                    items={items}
                    filterOptions={filterOptions}
                    gameList={gameList}
                  />
                )}
                <Box my={2} className={classnames.element("actionsContainer")}>
                  <ButtonWithHoverFill
                    icon={mdiArrowLeftBold}
                    handleClick={() => {
                      router.back();
                    }}
                    label="back"
                    displayLabel={true}
                    transformText={true}
                  />
                  {!filtered && (
                    <ButtonWithHoverFill
                      handleClick={() => {
                        context.setFilterCriteria(context.initialFilters);
                        setDrawerOpen(true);
                      }}
                      icon={mdiFilterVariant}
                      label="filter"
                      displayLabel={true}
                      transformText={true}
                    />
                  )}
                  {filtered && (
                    <ButtonWithHoverFill
                      handleClick={() => {
                        setCurrentPage(1);
                        context.setFilterCriteria(context.initialFilters);
                        setFiltered(false);
                      }}
                      icon={mdiFilterVariant}
                      label="reset filters"
                      displayLabel={true}
                      transformText={true}
                    />
                  )}
                </Box>
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
                </Container>
                {items.length > 0 && (
                  <FilteredGameList
                    items={items}
                    userDetails={userDetails}
                    filtered={filtered}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
                {items.length === 0 && (
                  <Typography variant="h1">Empty State Placeholder</Typography>
                )}
              </div>
            </BackgroundProvider>
          );
        }}
      </GamesFilterWidgetContextConsumer>
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
  // the list of items to display
  items: PropTypes.array,
  // user information
  userDetails: PropTypes.array,
  // initial values for the advanced filters form
  initialValues: PropTypes.object,
  // options for filtering the retrieved list
  filterOptions: PropTypes.shape({
    publishers: PropTypes.arrayOf(PropTypes.string),
    developers: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
    userRating_min: PropTypes.number,
    userRating_max: PropTypes.number,
    discount_min: PropTypes.number,
    discount_max: PropTypes.number,
    finalPrice_min: PropTypes.number,
    finalPrice_max: PropTypes.number
  })
};

/**
 * renders a Button wrapped with a Link that serves as a Quick Link
 */
export const GamesFilterWidget = props => {
  const classnames = GamesFilterWidget.classnames(props);
  const { initialFilters, title, subtitle, fullSearch } = props;
  const [filterCriteria, setFilterCriteria] = React.useState(
    initialFilters ? initialFilters : {}
  );

  return (
    <div className={classnames.root()}>
      <GamesFilterWidgetContextProvider
        value={{
          initialFilters,
          filterCriteria,
          setFilterCriteria
        }}
      >
        <FilterGamesQuery
          variables={filterCriteria}
          classnames={classnames}
          title={title}
          subtitle={subtitle}
          fullSearch={fullSearch}
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
    subHeading: PropTypes.string,
    headingContainer: PropTypes.string,
    advFilterButton: PropTypes.string,
    actionsContainer: PropTypes.string
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

        // compile data for children
        const items = get(data, ["recommendations", "edges"], []);
        const userDetails = get(data, ["recommendations", "userDetails"], []);
        const gameList = items.map(edge => edge.node.game);
        const filterOptions = get(
          data,
          ["recommendations", "filterOptions"],
          {}
        );

        return (
          <MainContent
            items={items}
            userDetails={userDetails}
            initialValues={variables}
            gameList={gameList}
            filterOptions={filterOptions}
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
