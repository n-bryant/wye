const styles = theme => ({
  root: {
    height: "100%",
    position: "relative"
  },
  item: {
    height: "200px"
  },
  paper: {
    background: theme.palette.panel.background
  },
  option: {
    color: theme.palette.common.white,
    transition: "all 0.25s ease-in-out",
    "&:hover": {
      color: theme.palette.common.blue6,
      transition: "all 0.25s ease-in-out"
    }
  }
});
export default styles;
