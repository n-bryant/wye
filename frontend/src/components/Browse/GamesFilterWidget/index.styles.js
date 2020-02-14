const styles = theme => ({
  root: {
    height: "100%",
    position: "relative"
  },
  heading: {
    fontSize: "3rem"
  },
  subHeading: {
    fontWeight: "300"
  },
  mainContent: {
    height: "100%",
    width: "100%"
  },
  contentWrapper: {
    padding: "2rem",
    height: "100%"
  },
  headingContainer: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "space-between"
    }
  },
  advFilterButton: {
    padding: "0",
    textTransform: "none",
    "&:hover": {
      color: theme.palette.common.blue6,
      background: "none"
    }
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between"
  }
});
export default styles;
