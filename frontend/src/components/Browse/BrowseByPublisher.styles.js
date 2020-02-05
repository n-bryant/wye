const styles = theme => ({
  root: {
    height: "100%",
    position: "relative",
    width: "80%",
    margin: "0 auto"
  },
  sm: {
    width: "100%"
  },
  contentContainer: {
    marginTop: "0"
  },
  container: {
    backdropFilter: "blur(4px)",
    height: "100%",
    zIndex: "1",
    position: "relative"
  },
  main: {
    height: "100%",
    paddingTop: "2rem",
    paddingBottom: "2rem"
  },
  heading: {
    fontSize: "3rem",
    lineHeight: "3.25rem"
  },
  subHeading: {
    fontSize: "1rem",
    fontWeight: "300",
    marginBottom: theme.spacing(8)
  },
  paginationWidgetContainer: {
    maxWidth: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  item: {
    display: "flex",
    justifyContent: "center"
  },
  paper: {
    background: theme.palette.panel.background
  },
  option: {
    color: theme.palette.common.white,
    transition: "all 0.25s ease-in-out",
    "&:hover": {
      color: theme.palette.common.blue6,
      transition: "all 0.25s ease-in-out"
    }
  }
});
export default styles;
