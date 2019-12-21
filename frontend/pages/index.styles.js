const styles = theme => ({
  root: {
    height: "100%",
    position: "relative",
    overflow: "hidden"
  },
  container: {
    backgroundColor: "rgba(0,0,0,.5)",
    height: "100%",
    zIndex: "1"
  },
  appBar: {
    height: "112px",
    background: theme.palette.common.blue6,
    boxShadow: "0 0 4px 0 rgba(0,0,0,0.25), 0 4px 4px 0 rgba(0,0,0,0.25)"
  },
  toolBar: {
    height: "100%",
    display: "flex",
    alignItems: "center"
  },
  main: {
    height: "calc(100% - 112px)"
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    padding: "3rem"
  },
  content: {
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(6px)",
    border: "1px solid hsla(0,0%,100%,0.2)",
    padding: "2rem"
  }
});
export default styles;
