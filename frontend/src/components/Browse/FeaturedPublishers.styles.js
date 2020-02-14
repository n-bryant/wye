const styles = theme => ({
  root: {},
  itemsContainer: {
    marginTop: theme.spacing(0.5),
    height: "246px",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: "492px"
    }
  },
  item: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "50%"
    }
  },
  quickLinkContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  paginationWidget: {
    marginTop: theme.spacing(1)
  }
});
export default styles;
