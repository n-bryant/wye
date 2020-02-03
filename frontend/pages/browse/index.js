import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withWidth } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import LoadingState from "../../src/components/LoadingState";
import BackgroundProvider from "../../src/components/BackgroundProvider";
import MostPopularFeatured from "../../src/components/Browse/MostPopularFeatured";
import FeaturedPublishers from "../../src/components/Browse/FeaturedPublishers";
import FeaturedSales from "../../src/components/Browse/FeaturedSales";
import styles from "./index.styles";

export const FEATURED_ITEMS_QUERY = gql`
  query FEATURED_ITEMS_QUERY {
    featuredMostPopular: recommendations(
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
    featuredPublishers: getTopTitleForMostPopularPublishers {
      publisher
      topTitle {
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
        capsuleMd
      }
    }
    feauturedSales: recommendations(
      filters: {
        gameFilters: {
          onSale: true
          finalPrice_gte: 999
          ownersMin_gte: 500000
        }
      }
      orderBy: [DISCOUNT, USER_RATING]
      sortOrder: DESC
      first: 6
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
            libraryCapsule
          }
        }
      }
    }
  }
`;

/**
 * renders the Browse page
 */
export const BrowsePage = props => {
  const classnames = BrowsePage.classnames(props);

  //                              top right of page ->     advanced search
  // Heading - Browse Multiplayer Games
  // Subheading - Browse the most popular and discounted multiplayer games

  // trending - most popular by recent playtime
  // - Cards: Contain appropriate capsule image, name, and price details
  //    - on hover: shows name, user rating, dev/pub info and
  // capsuleLg - 1:4

  // publishers - games by most popular publishers
  // - Cards: 2 pages of 4 cards; page paddles and page pills
  //  - Header image linking to most popular title by publisher
  //  - Publisher name linking to /publisher/[name]

  // big sales - top 4 - rated by discount and user rating
  // - Cards: 2 pages of 3 cards; page paddles and page pills
  //  - libraryCapsule image on top
  //  - name / sale details on bottom
  //  - on hover: - name, user rating, user details if available (wanted by)

  // buttons to go to filter for under $5 / $10

  // Browse by Genre
  // - grid of genre buttons

  /**
   * renders a Query to fetch featured items
   */
  const FeaturedItemsQuery = props => {
    return (
      <Query query={FEATURED_ITEMS_QUERY}>
        {({ loading, data, error }) => {
          if (loading) {
            return <LoadingState />;
          }

          if (error) {
            console.log(error);
            return <div>oops</div>;
          }

          // collect data to be passed as props to the rendered MainContent
          const mostPopularItems = get(
            data,
            ["featuredMostPopular", "edges"],
            []
          ).map(edge => edge.node.game);
          const featuredPublishersItems = get(data, ["featuredPublishers"], []);
          const featuredSalesItems = get(
            data,
            ["feauturedSales", "edges"],
            []
          ).map(edge => edge.node.game);

          return (
            <MainContent
              mostPopularItems={mostPopularItems}
              featuredPublishersItems={featuredPublishersItems}
              featuredSalesItems={featuredSalesItems}
              {...props}
            />
          );
        }}
      </Query>
    );
  };

  /**
   * renders the main content for the page,
   * hydrated with data for the featured widgets
   */
  const MainContent = ({
    mostPopularItems,
    featuredPublishersItems,
    featuredSalesItems
  }) => {
    return (
      <React.Fragment>
        <Typography className={classnames.element("heading")} variant="h1">
          Featured Games
        </Typography>
        <Typography className={classnames.element("subHeading")} variant="h2">
          Browse the most popular and discounted multiplayer games
        </Typography>
        <Box my={4}>
          <MostPopularFeatured items={mostPopularItems} />
        </Box>
        <Box my={4}>
          <FeaturedPublishers items={featuredPublishersItems} />
        </Box>
        <Box my={4}>
          <FeaturedSales items={featuredSalesItems} />
        </Box>
      </React.Fragment>
    );
  };
  MainContent.propTypes = {
    mostPopularItems: PropTypes.array,
    featuredPublishersItems: PropTypes.array,
    featuredSalesItems: PropTypes.array
  };

  return (
    <BackgroundProvider>
      <div className={classnames.root()}>
        <Container
          className={classnames.element("container")}
          maxWidth="lg"
          disableGutters
        >
          <Container className={classnames.element("main")} maxWidth={false}>
            <FeaturedItemsQuery {...props} />
          </Container>
        </Container>
      </div>
    </BackgroundProvider>
  );
};
BrowsePage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BrowsePage`
);
BrowsePage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    container: PropTypes.string,
    main: PropTypes.string,
    heading: PropTypes.string,
    subHeading: PropTypes.string
  })
};
BrowsePage.defaultProps = {
  classes: {}
};

export default withWidth()(withStyles(styles)(BrowsePage));
