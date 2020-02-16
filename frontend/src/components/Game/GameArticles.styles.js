const styles = theme => ({
  root: {},
  article: {
    background: "rgba(0,0,0,.5)",
    padding: "1rem",
    height: "100%",
    border: "1px solid transparent",
    transition: "all 0.25s ease-in-out",
    "&:hover": {
      background: "rgba(0,0,0,.75)",
      border: `1px solid ${theme.palette.common.white}`,
      transition: "all 0.25s ease-in-out"
    }
  },
  articleTitle: {
    color: theme.palette.common.blue6
  },
  articleContents: {},
  subTitle: {
    color: theme.palette.common.blue6
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
    "&:visited": {
      color: theme.palette.common.white
    }
  }
});
export default styles;
