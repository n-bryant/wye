const styles = theme => ({
  root: {
    height: "100%",
    position: "relative"
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
    marginBottom: theme.spacing(4)
  }
});
export default styles;
