const styles = theme => ({
  root: {
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
  title: {
    cursor: "pointer"
  },
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
  linkWithNoHoverDecoration: {
    "&:hover": {
      textDecoration: "none"
    }
  },
  githubIcon: {
    fill: theme.palette.common.white,
    height: "2rem"
  }
});
export default styles;
