import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import {
  getOffsetStart,
  getOffsetEnd,
  getTotalPages
} from "../../../lib/pagingUtilities";
import QuickLink from "../QuickLink";
import PaginationWidget from "../PaginationWidget";
import FeaturedWidget from "./FeaturedWidget";
import BrowseCard from "./BrowseCard";
import styles from "./FeaturedPublishers.styles";

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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [smallCurrentPage, setSmallCurrentPage] = React.useState(1);
  const perPage = 4;

  return (
    <FeaturedWidget
      className={classnames.root()}
      title={TITLE}
      subTitle={SUBTITLE}
    >
      {!["xs", "sm"].some(val => val === width) && items.length > 1 ? (
        <React.Fragment>
          <Grid
            className={classnames.element("itemsContainer")}
            container
            justify="center"
            spacing={2}
          >
            {items
              .slice(
                getOffsetStart(currentPage, items.length, perPage),
                getOffsetEnd(currentPage, perPage)
              )
              .map(item => (
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
                    cardActionHref={"/browse/publishers/[name]"}
                    cardActionLinkPath={`/browse/publishers/${item.publisher}`}
                  />
                </Grid>
              ))}
          </Grid>
          <PaginationWidget
            className={classnames.element("paginationWidget")}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={getTotalPages(items.length, perPage)}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid
            className={classnames.element("itemsContainer")}
            container
            justify="center"
            spacing={2}
          >
            {items
              .slice(
                getOffsetStart(smallCurrentPage, items.length, perPage),
                getOffsetEnd(smallCurrentPage, perPage)
              )
              .map(item => (
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
                    cardActionHref={"/browse/publishers/[name]"}
                    cardActionLinkPath={`/browse/publishers/${item.publisher}`}
                  />
                </Grid>
              ))}
          </Grid>
          <PaginationWidget
            className={classnames.element("paginationWidget")}
            currentPage={smallCurrentPage}
            setCurrentPage={setSmallCurrentPage}
            totalPages={getTotalPages(items.length, perPage)}
          />
        </React.Fragment>
      )}
      <Box className={classnames.element("quickLinkContainer")} my={4}>
        <QuickLink label={"All Publishers"} linkHref="/browse/publishers" />
      </Box>
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
    item: PropTypes.string,
    quickLinkContainer: PropTypes.string
  }),
  // data for the cards to be rendered in the FeaturedWidget
  items: PropTypes.array,
  // material-ui width
  width: PropTypes.string
};
FeaturedPublishers.defaultProps = {
  classes: {}
};

// apply styles
export const StyledFeaturedPublishers = withWidth()(
  withStyles(styles)(FeaturedPublishers)
);

export default StyledFeaturedPublishers;
