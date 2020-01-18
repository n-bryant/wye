const styles = theme => ({
  root: {
    height: "100%",
    position: "relative",
    overflow: "hidden"
  },
  container: {
    backgroundColor: "rgba(34, 139, 230,.25)",
    height: "100%",
    zIndex: "1"
  },
  main: {
    height: "100%",
    overflow: "auto"
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    maxWidth: "1500px",
    minHeight: "530px",
    margin: "0 auto",
    padding: "3rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0"
    }
  },
  content: {
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(6px)",
    border: "1px solid hsla(0,0%,100%,0.2)",
    overflow: "auto"
  }
});
export default styles;
