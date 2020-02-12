const styles = theme => ({
  root: {
    background: theme.palette.panel.background,
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
  horizontal: {
    display: "flex",
    background: theme.palette.common.yellow1
  },
  horizontalContent: {
    width: "calc(100% - 150px)",
    padding: "8px !important",
    position: "relative"
  },
  horizontalContentWide: {
    width: "calc(100% - 300px)",
    padding: "8px !important",
    position: "relative"
  },
  horizontalTitle: {
    fontSize: "1.5rem",
    fontWeight: "500",
    lineHeight: "1.75rem",
    color: theme.palette.common.yellow1
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
  gameLinkHorizontal: {
    width: "150px"
  },
  gameLinkHorizontalWide: {
    width: "300px"
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
    maxHeight: "215px",
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
    justifyContent: "flex-end",
    marginTop: theme.spacing(0.5)
  },
  contentWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    background: "rgba(0,0,0,0.5)",
    borderBottomRightRadius: "4px",
    borderTopRightRadius: "4px"
  },
  horizontalSubContent: {
    position: "absolute",
    bottom: "-16px",
    right: "-16px"
  },
  usersContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    position: "absolute",
    top: "-16px",
    left: "0",
    right: "0"
  },
  withEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});
export default styles;
