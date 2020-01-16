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
  subGridTitle: {},
  subGridTitleCenteredWhenMd: {
    [theme.breakpoints.up("md")]: {
      textAlign: "center"
    }
  },
  editButton: {
    border: "1px solid transparent",
    minWidth: "175px",
    textTransform: "none",
    transition: "all .25s ease-in-out",
    "&:hover": {
      background: "rgba(0,0,0,.5)",
      border: "1px solid hsla(0,0%,100%,0.2)",
      transition: "all .25s ease-in-out"
    },
    "&:active": {
      border: `1px solid ${theme.palette.common.blue6}`
    }
  },
  editIcon: {
    height: "1rem",
    fill: "white",
    marginRight: "0.5rem"
  }
});
export default styles;
