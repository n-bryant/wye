const styles = theme => ({
  root: {
    padding: "0",
    textTransform: "none",
    minWidth: "0",
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.common.blue6
    }
  },
  transformText: {
    textTransform: "uppercase"
  },
  icon: {
    fill: theme.palette.common.white,
    height: "1rem"
  },
  iconWithLabel: {
    marginLeft: "0.5rem"
  },
  iconHovered: {
    fill: theme.palette.common.blue6
  }
});

export default styles;
