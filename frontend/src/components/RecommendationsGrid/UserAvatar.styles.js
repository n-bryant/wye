const styles = theme => ({
  root: {
    cursor: "pointer",
    maxWidth: "fit-content"
  },
  tooltip: {
    border: "1px solid hsla(0,0%,100%,0.2)",
    background: "rgba(0,0,0,.75)"
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  image: {
    width: "64px",
    height: "64px",
    border: "1px solid hsla(0,0%,100%,0.2)",
    marginBottom: "0.5rem"
  },
  tooltipHeading: {
    color: theme.palette.common.blue6
  },
  link: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.5rem",
    color: theme.palette.link.default,
    "&:hover": {
      color: theme.palette.link.hover
    },
    "&:active": {
      color: theme.palette.link.active
    }
  },
  icon: {
    height: "1rem",
    marginRight: "0.5rem",
    fill: theme.palette.common.blue6
  }
});
export default styles;
