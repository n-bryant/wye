const styles = theme => ({
  root: {
    height: "100%",
    position: "relative",
    overflow: "hidden"
  },
  container: {
    backdropFilter: "blur(4px)",
    height: "100%",
    zIndex: "1",
    position: "relative",
    paddingTop: "2rem",
    paddingBottom: "2rem"
  },
  main: {
    height: "100%",
    overflow: "auto"
  },
  heading: {
    fontSize: "3rem",
    lineHeight: "3.25rem"
  },
  subHeading: {
    fontSize: "1rem",
    fontWeight: "300"
  }
});
export default styles;
