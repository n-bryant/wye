const styles = theme => ({
  root: {
    width: "180px",
    height: "60px",
    position: "relative"
  },
  button: {
    background: "transparent",
    border: "1px solid hsla(0,0%,100%,0.2)",
    transition: ".5s ease-in-out",
    width: "100%",
    height: "100%",
    "&:hover": {
      background: "rgba(0,0,0,.85)",
      transition: ".5s ease-in-out"
    },
    "&:active": {
      border: `1px solid ${theme.palette.common.blue6}`,
      transition: "0s ease-in-out"
    },
    "&:disabled": {
      color: theme.palette.common.white,
      cursor: "not-allowed",
      pointerEvents: "auto",
      "&:active": {
        border: "1px solid hsla(0,0%,100%,0.2)"
      }
    }
  },
  buttonBorder: {
    position: "absolute",
    top: "0",
    left: "0",
    fill: "none",
    stroke: theme.palette.common.white,
    strokeDasharray: "150 480",
    strokeDashoffset: "150",
    transition: "stroke-dashoffset .75s ease-in-out",
    "&:hover": {
      strokeDashoffset: "-480",
      stroke: theme.palette.common.blue6
    }
  },
  buttonBorderDisabled: {
    "&:hover": {
      strokeDashoffset: "150"
    }
  }
});

export default styles;
