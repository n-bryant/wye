import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { userRouter } from "next/router";

import Grid from "@material-ui/core/Grid";

import LoadingState from "../LoadingState";
import PaginationWidget from "../PaginationWidget";
import FeaturedWidget from "./FeaturedWidget";
import BrowseCard from "./BrowseCard";
import styles from "./MostPopularFeatured.styles";

// get the top title for the 5 most popular publishers
export const GET_FEATURED_PUBLISHERS_TOP_ITEM_QUERY = gql`
  query GET_FEATURED_PUBLISHERS_TOP_ITEM_QUERY {
    getTopTitleForMostPopularPublishers {
      publisher {
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
    }
  }
`;

export const TITLE = "Publishers";
export const SUBTITLE =
  "The most played titles by the most prolific publishers";

/**
 * renders a FeaturedWidget with cards representing the 5 most popular multiplayer games
 */
export const FeaturedPublishers = props => {
  const classnames = FeaturedPublishers.classnames(props);
  const { items, width } = props;
  const [currentPage, setCurrentPage] = React.useState(1);
  const router = useRouter();

  const featuredItem = items[0];
  const subFeaturedItems = items.slice(1);
  return (
    <FeaturedWidget
      className={classnames.root()}
      title={TITLE}
      subTitle={SUBTITLE}
    >
      {!["xs", "sm"].some(val => val === width) && items.length > 1 ? (
        <Grid
          className={classnames.element("featuredItemContainer")}
          container
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
FeaturedPublishers.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}FeaturedPublishers`
);
FeaturedPublishers.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // data for the cards to be rendered in the FeaturedWidget
  items: PropTypes.array,
  // material-ui width
  width: PropTypes.string
};
FeaturedPublishers.defaultProps = {
  classes: {}
};

export const StyledFeaturedPublishers = withWidth()(
  withStyles(styles)(FeaturedPublishers)
);

/**
 * renders a Query to fetch the top titles by the most popular publishers and returns a StyledFeaturedPublishers
 */
const FeaturedPublishersQuery = props => {
  return (
    <Query query={GET_FEATURED_PUBLISHERS_TOP_ITEM_QUERY}>
      {({ loading, data, error }) => {
        if (loading) {
          return <LoadingState />;
        }

        if (error) {
          console.log(error);
        }

        const items = get(data, ["getTopTitleForMostPopularPublishers"], []);
        return <StyledFeaturedPublishers items={items} {...props} />;
      }}
    </Query>
  );
};

export default FeaturedPublishersQuery;
