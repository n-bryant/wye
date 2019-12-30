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
    height: "56px",
    background: theme.palette.common.blue6,
    boxShadow: "0 0 4px 0 rgba(0,0,0,0.25), 0 4px 4px 0 rgba(0,0,0,0.25)"
  },
  toolBar: {
    height: "100%",
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {},
  linksContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: "none",
    "&:active, &:hover": {
      textDecoration: "underline"
    },
    margin: "0 .5rem"
  },
  githubIcon: {
    fill: theme.palette.common.white,
    height: "2rem"
  },
  form: {
    width: "80%"
  },
  main: {
    height: "calc(100vh - 56px)",
    overflow: "auto"
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    maxWidth: "1500px",
    minHeight: "530px",
    margin: "0 auto",
    padding: "3rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0"
    }
  },
  content: {
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(6px)",
    border: "1px solid hsla(0,0%,100%,0.2)"
  }
});
export default styles;
