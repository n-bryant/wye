const styles = theme => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: theme.spacing(6)
  },
  closeButton: {
    fill: "hsla(0,0%,100%,0.2)",
    cursor: "pointer",
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    height: "1.5rem",
    transition: ".25s ease-in-out",
    "&:hover, &:active": {
      fill: theme.palette.common.white,
      transition: ".25s ease-in-out"
    }
  },
  formInstructions: {
    marginBottom: theme.spacing(4),
    width: "75%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: theme.spacing(1)
    }
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.common.blue6
  },
  userFieldContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  submitButton: {}
});
export default styles;
