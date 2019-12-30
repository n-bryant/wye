const container = {
  height: "80%",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem"
};

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  welcomeMessageContainer: {
    ...container,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: theme.spacing(3)
  },
  message: {
    marginBottom: theme.spacing(3),
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  instructionsContainer: {
    ...container,
    borderLeft: "1px solid hsla(0,0%,100%,0.2)",
    [theme.breakpoints.down("sm")]: {
      borderLeft: "none",
      borderTop: "1px solid hsla(0,0%,100%,0.2)",
      width: "100%"
    }
  },
  link: {
    textDecoration: "none",
    marginBottom: theme.spacing(6),
    color: theme.palette.link.default,
    "&:hover": {
      color: theme.palette.link.hover
    },
    "&:active": {
      color: theme.palette.link.active
    }
  }
});
export default styles;
