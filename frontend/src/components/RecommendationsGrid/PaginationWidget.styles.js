const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  paddle: {
    padding: "0",
    minWidth: "0",
    "&:hover": {
      background: "transparent"
    },
    "&:disabled": {
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  paddleIcon: {
    height: "2.5rem",
    fill: theme.palette.common.white,
    transition: "fill .25s ease-in-out",
    "&:hover": {
      fill: theme.palette.common.blue6,
      transition: "fill .25s ease-in-out"
    }
  },
  paddleIconDisabled: {
    fill: "hsla(0,0%,100%,0.2)",
    transition: "fill .25s ease-in-out",
    "&:hover": {
      fill: "hsla(0,0%,100%,0.2)",
      transition: "fill .25s ease-in-out"
    }
  }
});
export default styles;
