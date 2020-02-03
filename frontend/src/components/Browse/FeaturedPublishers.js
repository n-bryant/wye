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
import FeaturedWidget from "./FeaturedWidget";
import BrowseCard from "./BrowseCard";
import styles from "./FeaturedPublishers.styles";

// get the top title for the 4 most popular publishers
export const GET_FEATURED_PUBLISHERS_TOP_TITLE_QUERY = gql`
  query GET_FEATURED_PUBLISHERS_TOP_TITLE_QUERY {
    getTopTitleForMostPopularPublishers {
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
  }
`;

export const TITLE = "Publishers";
export const SUBTITLE =
  "The most played titles by the most prolific publishers";

/**
 * renders a FeaturedWidget with cards representing the top title of the
 * 4 publishers with the most titles
 */
export const FeaturedPublishers = props => {
  const classnames = FeaturedPublishers.classnames(props);
  const { items, width } = props;

  return (
    <FeaturedWidget
      className={classnames.root()}
      title={TITLE}
      subTitle={SUBTITLE}
    >
      {!["xs", "sm"].some(val => val === width) && items.length > 1 ? (
        <Grid
          className={classnames.element("itemsContainer")}
          container
          justify="center"
          spacing={2}
        >
          {items.map(item => (
            <Grid
              key={item.topTitle.appid}
              className={classnames.element("item")}
              item
              xs={3}
            >
              <BrowseCard
                variant="md"
                data={item.topTitle}
                withPrice={false}
                cardActionLabel={item.publisher}
                cardActionLinkPath={`/browse/publisher/${item.publisher}`}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <React.Fragment>
          <Grid
            className={classnames.element("itemsContainer")}
            container
            justify="center"
            spacing={2}
          >
            {items.slice(0, 2).map(item => (
              <Grid
                key={item.topTitle.appid}
                className={classnames.element("item")}
                item
                xs={6}
              >
                <BrowseCard
                  variant="md"
                  data={item.topTitle}
                  withPrice={false}
                  cardActionLabel={item.publisher}
                  cardActionLinkPath={`/browse/publisher/${item.publisher}`}
                />
              </Grid>
            ))}
          </Grid>
          <Grid
            className={classnames.element("itemsContainer")}
            container
            justify="center"
            spacing={2}
          >
            {items.slice(2, 4).map(item => (
              <Grid
                key={item.topTitle.appid}
                className={classnames.element("item")}
                item
                xs={6}
              >
                <BrowseCard
                  variant="md"
                  data={item.topTitle}
                  withPrice={false}
                  cardActionLabel={item.publisher}
                  cardActionHref={"/browse/publisher/[id]"}
                  cardActionLinkPath={`/browse/publisher/${item.publisher}`}
                />
              </Grid>
            ))}
          </Grid>
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
    root: PropTypes.string,
    itemsContainer: PropTypes.string,
    item: PropTypes.string
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
    <Query query={GET_FEATURED_PUBLISHERS_TOP_TITLE_QUERY}>
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
