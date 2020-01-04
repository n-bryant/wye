const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    margin: "0",
    overflow: "auto"
  },
  subGrid: {
    margin: "0"
  },
  subGridWithDivider: {
    textAlign: "center",
    padding: "1rem 0",
    width: "80%",
    borderBottom: "1px solid hsla(0,0%,100%,0.2)",
    margin: "0 auto 1rem auto"
  },
  avatarContainer: {
    margin: "0",
    justifyContent: "center"
  },
  subGridTitle: {
    color: theme.palette.common.blue6
  }
});
export default styles;
