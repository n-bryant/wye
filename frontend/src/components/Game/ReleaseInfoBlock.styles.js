const styles = theme => ({
  root: {
    height: "100%"
  },
  withAdjustedPadding: {
    paddingLeft: "2px !important",
    paddingRight: "0 !important"
  },
  headerImgContainer: {
    minHeight: "151px",
    minWidth: "324px",
    margin: "0 auto",
    position: "relative",
    background: "rgba(0,0,0,.5)"
  },
  headerImg: {
    width: "100%",
    display: "block",
    opacity: "1",
    transition: "opacity 0.25s ease-in-out"
  },
  headerImgHidden: {
    opacity: "0",
    transition: "opacity 0.25s ease-in-out"
  },
  infoContainer: {
    marginTop: theme.spacing(1)
  },
  infoType: {
    color: theme.palette.common.blue6
  },
  iconContainer: {
    display: "flex",
    alignItems: "center"
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    },
    "&:active": {
      color: theme.palette.common.blue4
    },
    "&:visited": {
      color: theme.palette.common.blue4
    }
  },
  icon: {
    fill: "white",
    height: "1rem",
    marginLeft: "4px"
  }
});
export default styles;
