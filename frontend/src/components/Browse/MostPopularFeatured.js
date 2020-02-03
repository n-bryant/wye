import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";

import LoadingState from "../LoadingState";
import PaginationWidget from "../PaginationWidget";
import FeaturedWidget from "./FeaturedWidget";
import BrowseCard from "./BrowseCard";
import styles from "./MostPopularFeatured.styles";

// get the most popular games with at least 10,000,000 owners and an avg user rating of at least 75
export const GET_MOST_POPULAR_FEATURED_QUERY = gql`
  query GET_MOST_POPULAR_FEATURED_QUERY {
    recommendations(
      orderBy: [PLAYTIME_RECENT, USER_RATING]
      filters: { gameFilters: { userRating_gte: 75, ownersMin_gte: 10000000 } }
      sortOrder: DESC
      first: 5
    ) {
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
          }
        }
      }
    }
  }
`;

export const MOST_POPULAR_TITLE = "Trending";
export const MOST_POPULAR_SUBTITLE = "Most popular by recent playtime";

/**
 * renders a FeaturedWidget with cards representing the 5 most popular multiplayer games
 */
export const MostPopularFeatured = props => {
  const classnames = MostPopularFeatured.classnames(props);
  const { items, width } = props;
  const [currentPage, setCurrentPage] = React.useState(1);

  const featuredItem = items[0];
  const subFeaturedItems = items.slice(1);
  return (
    <FeaturedWidget
      className={classnames.root()}
      title={MOST_POPULAR_TITLE}
      subTitle={MOST_POPULAR_SUBTITLE}
    >
      {!["xs", "sm"].some(val => val === width) && items.length > 1 ? (
        <Grid
          className={classnames.element("featuredItemContainer")}
          container
          justify={"space-between"}
          alignItems={"center"}
        >
          <Grid
            className={classnames.element("featuredItem")}
            container
            item
            xs={6}
            spacing={1}
          >
            <Grid
              item
              xs={12}
              className={classnames.element("featuredItemContent")}
            >
              <BrowseCard data={featuredItem} variant="lg" withPrice={false} />
            </Grid>
          </Grid>
          <Grid
            className={classnames.element("subFeaturedItemsContainer")}
            container
            item
            spacing={1}
            xs={6}
          >
            {subFeaturedItems.map(item => (
              <Grid
                className={classnames.element("subFeaturedItem")}
                key={item.appid}
                item
                xs={6}
              >
                <BrowseCard data={item} variant="lg" withPrice={false} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <React.Fragment>
          <Grid
            className={classnames.element("featuredItemContainer")}
            container
            alignItems={"center"}
          >
            {items[currentPage - 1] && (
              <Grid
                className={classnames.element("featuredItem", {
                  fullWidth: true
                })}
                item
                xs={12}
              >
                <BrowseCard
                  data={items[currentPage - 1]}
                  variant="header"
                  withPrice={false}
                  maxSize={true}
                />
              </Grid>
            )}
          </Grid>
          <PaginationWidget
            className={classnames.element("paginationWidget")}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={items.length}
          />
        </React.Fragment>
      )}
    </FeaturedWidget>
  );
};
MostPopularFeatured.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}MostPopularFeatured`
);
MostPopularFeatured.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    featuredItemContainer: PropTypes.string,
    featuredItem: PropTypes.string,
    featuredItemContent: PropTypes.string,
    featuredItemFullWidth: PropTypes.string,
    subFeaturedItemsContainer: PropTypes.string,
    subFeaturedItem: PropTypes.string,
    featuredItemContainer: PropTypes.string,
    featuredItem: PropTypes.string,
    paginationWidget: PropTypes.string
  }),
  // data for the cards to be rendered in the FeaturedWidget
  items: PropTypes.array,
  // material-ui width
  width: PropTypes.string
};
MostPopularFeatured.defaultProps = {
  classes: {}
};

export const StyledMostPopularFeatured = withWidth()(
  withStyles(styles)(MostPopularFeatured)
);

/**
 * renders a Query to fetch the most popular games and returns a StyledMostPopularFeatured
 */
const MostPopularFeaturedQuery = props => {
  return (
    <Query query={GET_MOST_POPULAR_FEATURED_QUERY}>
      {({ loading, data, error }) => {
        if (loading) {
          return <LoadingState />;
        }

        if (error) {
          console.log(error);
        }

        const items = get(data, ["recommendations", "edges"], []).map(
          edge => edge.node.game
        );
        return <StyledMostPopularFeatured items={items} {...props} />;
      }}
    </Query>
  );
};

export default MostPopularFeaturedQuery;