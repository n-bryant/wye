const styles = theme => ({
  root: {
    background: "#171E28",
    position: "relative",
    overflow: "visible",
    boxShadow: "none",
    height: "100%",
    width: "100%",
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
  },
  header: {
    maxWidth: "450px"
  },
  sm: {
    maxWidth: "237px"
  },
  md: {
    maxWidth: "467px"
  },
  lg: {
    maxWidth: "616px"
  },
  lib: {
    maxWidth: "300px"
  },
  maxSize: {
    maxWidth: "100%"
  },
  media: {
    height: "100%"
  },
  gameLink: {
    display: "block",
    height: "100%",
    width: "100%"
  },
  gameLinkHeader: {
    maxHeight: "215px"
  },
  gameLinkSm: {
    maxHeight: "87px"
  },
  gameLinkMd: {
    maxHeight: "181px"
  },
  gameLinkLg: {
    maxHeight: "353px"
  },
  gameLinkLib: {
    maxHeight: "450px"
  },
  gameLinkMaxSize: {
    maxHeight: "100%"
  },
  content: {
    padding: "0 !important",
    height: "100%"
  },
  title: {
    color: theme.palette.common.blue6,
    textOverflow: "ellipsis"
  },
  category: {
    color: theme.palette.common.blue6
  },
  genresContainer: {
    display: "flex"
  },
  chip: {
    borderRadius: "0",
    background: theme.palette.common.blue6,
    height: "16px",
    marginRight: theme.spacing(1)
  },
  chipLabel: {
    color: theme.palette.common.white,
    padding: "4px"
  },
  trailer: {
    margin: ".5rem auto",
    maxWidth: "100%",
    height: "auto"
  },
  actionArea: {
    marginBottom: theme.spacing(0.5),
    height: "100%"
  },
  actionsContainer: {
    height: "50px"
  },
  actionLink: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.common.white,
    transition: "color 0.25s ease-in-out",
    "&:hover": {
      color: theme.palette.common.blue6,
      transition: "color 0.25s ease-in-out"
    },
    "&:visited": {
      color: theme.palette.common.white,
      transition: "color 0.25s ease-in-out",
      "&:hover": {
        color: theme.palette.common.blue6,
        transition: "color 0.25s ease-in-out"
      }
    }
  },
  actionLinkLabel: {
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  priceWidget: {
    display: "flex",
    justifyContent: "flex-end"
  }
});
export default styles;
