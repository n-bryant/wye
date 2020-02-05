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
  },
  quickLinksContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  quickLink: {
    marginLeft: theme.spacing(2)
  },
  spacer: {
    width: "80%",
    margin: "0 auto",
    borderBottom: `1px solid ${theme.palette.common.white}`
  }
});
export default styles;
