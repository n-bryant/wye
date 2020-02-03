const styles = theme => ({
  root: {},
  featuredSaleContainer: {
    height: "400px",
    marginTop: theme.spacing(1),
    justifyContent: "space-between"
  },
  featuredSale: {
    height: "calc(100% - 41px)"
  },
  subFeaturedSaleContainer: {},
  subFeaturedSale: {
    height: "calc(50% - 41px)"
  },
  paginationWidget: {
    marginTop: theme.spacing(1)
  }
});
export default styles;
