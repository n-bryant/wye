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
import styles from "./FeaturedSales.styles";

export const TITLE = "Sales";
export const SUBTITLE = "Big sales for some of the hottest titles";

/**
 * renders a FeaturedWidget with cards representing some of the best sales
 */
export const FeaturedSales = props => {
  const classnames = FeaturedSales.classnames(props);
  const { items, width } = props;

  // pagination values
  const perPage = 3;
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageStart =
    currentPage === 1 ? 0 : items.length - (currentPage - 1) * perPage;
  const pageEnd = currentPage * perPage;

  // divide items into featured/sub-featured
  const featuredSales = items.slice(0, 2);
  const subFeaturedSales = items.slice(2, 6);

  return (
    <FeaturedWidget
      className={classnames.root()}
      title={TITLE}
      subTitle={SUBTITLE}
    >
      {!["xs", "sm"].some(val => val === width) ? (
        <Grid
          className={classnames.element("featuredSaleContainer")}
          container
          spacing={2}
        >
          <Grid
            className={classnames.element("subFeaturedSaleContainer")}
            container
            item
            spacing={2}
            xs={6}
          >
            {subFeaturedSales.map(saleItem => (
              <Grid
                className={classnames.element("subFeaturedSale")}
                key={saleItem.appid}
                item
                xs={6}
              >
                <BrowseCard data={saleItem} variant="header" withPrice={true} />
              </Grid>
            ))}
          </Grid>
          <Grid container item spacing={2} xs={6}>
            {featuredSales.map(saleItem => (
              <Grid
                className={classnames.element("featuredSale")}
                key={saleItem.appid}
                item
                xs={6}
              >
                <BrowseCard data={saleItem} variant="lib" withPrice={true} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <React.Fragment>
          <Grid
            className={classnames.element("featuredSaleContainer")}
            container
            spacing={2}
          >
            {items.slice(pageStart, pageEnd).map(saleItem => (
              <Grid
                className={classnames.element("featuredSale")}
                key={saleItem.appid}
                item
                xs={4}
              >
                <BrowseCard data={saleItem} variant="lib" withPrice={true} />
              </Grid>
            ))}
          </Grid>
          <PaginationWidget
            className={classnames.element("paginationWidget")}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={items.length / perPage}
          />
        </React.Fragment>
      )}
      <Box className={classnames.element("quickLinksContainer")} my={4}>
        <QuickLink
          className={classnames.element("quickLink")}
          label={"under $5"}
          linkHref="/browse/under5"
        />
        <QuickLink
          className={classnames.element("quickLink")}
          label={"under $10"}
          linkHref="/browse/under10"
        />
      </Box>
    </FeaturedWidget>
  );
};
FeaturedSales.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}FeaturedSales`
);
FeaturedSales.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    featuredSaleContainer: PropTypes.string,
    featuredSale: PropTypes.string,
    subFeaturedSaleContainer: PropTypes.string,
    subFeaturedSale: PropTypes.string,
    paginationWidget: PropTypes.string,
    quickLinksContainer: PropTypes.string,
    quickLink: PropTypes.string
  }),
  // data for the cards to be rendered in the FeaturedWidget
  items: PropTypes.array,
  // material-ui width
  width: PropTypes.string
};
FeaturedSales.defaultProps = {
  classes: {}
};

// apply styles
export const StyledFeaturedSales = withWidth()(
  withStyles(styles)(FeaturedSales)
);

export default StyledFeaturedSales;
