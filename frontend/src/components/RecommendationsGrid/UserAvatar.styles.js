const styles = theme => ({
  root: {
    cursor: "pointer",
    maxWidth: "fit-content"
  },
  tooltip: {
    background: theme.palette.panel.background
  },
  arrow: {
    "&:before": {
      borderColor: `transparent transparent ${theme.palette.panel.background} transparent !important`
    }
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
  },
  image: {
    width: "32px",
    height: "32px",
    border: "1px solid hsla(0,0%,100%,0.2)",
    borderRadius: "4px"
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
    marginBottom: "0.5rem",
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
