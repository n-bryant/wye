const styles = theme => ({
  root: {
    textDecoration: "none"
  },
  button: {
    background: theme.palette.panel.background,
    color: theme.palette.common.white,
    transition: "color 0.25s ease-in-out",
    "&:hover": {
      background: theme.palette.panel.background,
      color: theme.palette.link.default,
      transition: "color 0.25s ease-in-out"
    }
  }
});
export default styles;
