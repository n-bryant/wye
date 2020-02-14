import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import QuickLink from "../QuickLink";
import PaginationWidget from "../PaginationWidget";
import FeaturedWidget from "./FeaturedWidget";
import BrowseCard from "./BrowseCard";
import styles from "./MostPopularFeatured.styles";

export const MOST_POPULAR_TITLE = "Trending";
export const MOST_POPULAR_SUBTITLE = "Most popular by recent playtime";

/**
 * renders a FeaturedWidget with cards representing the 5 most popular multiplayer games
 */
export const MostPopularFeatured = props => {
  const classnames = MostPopularFeatured.classnames(props);
  const { items, width } = props;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [smallCurrentPage, setSmallCurrentPage] = React.useState(1);

  let featuredItem, subFeaturedItems;
  if (items.length) {
    featuredItem = currentPage == 1 ? items[0] : items[5];
    subFeaturedItems = currentPage == 1 ? items.slice(1, 5) : items.slice(6);
  }
  return (
    <FeaturedWidget
      className={classnames.root()}
      title={MOST_POPULAR_TITLE}
      subTitle={MOST_POPULAR_SUBTITLE}
    >
      {!["xs", "sm"].some(val => val === width) && items.length > 1 ? (
        <React.Fragment>
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
                <BrowseCard
                  data={featuredItem}
                  variant="lg"
                  withPrice={false}
                />
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
          <PaginationWidget
            className={classnames.element("paginationWidget")}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={2}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid
            className={classnames.element("featuredItemContainer")}
            container
            alignItems={"center"}
          >
            {items[smallCurrentPage - 1] && (
              <Grid
                className={classnames.element("featuredItem", {
                  fullWidth: true
                })}
                item
                xs={12}
              >
                <BrowseCard
                  data={items[smallCurrentPage - 1]}
                  variant="header"
                  withPrice={false}
                  maxSize={true}
                />
              </Grid>
            )}
          </Grid>
          <PaginationWidget
            className={classnames.element("paginationWidget")}
            currentPage={smallCurrentPage}
            setCurrentPage={setSmallCurrentPage}
            totalPages={items.length}
          />
        </React.Fragment>
      )}
      <Box className={classnames.element("quickLinkContainer")} my={4}>
        <QuickLink label="Top 100" linkHref="/browse/top100" />
      </Box>
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
    paginationWidget: PropTypes.string,
    quickLinkContainer: PropTypes.string
  }),
  // data for the cards to be rendered in the FeaturedWidget
  items: PropTypes.array,
  // material-ui width
  width: PropTypes.string
};
MostPopularFeatured.defaultProps = {
  classes: {}
};

// apply styles
export const StyledMostPopularFeatured = withWidth()(
  withStyles(styles)(MostPopularFeatured)
);

export default StyledMostPopularFeatured;
