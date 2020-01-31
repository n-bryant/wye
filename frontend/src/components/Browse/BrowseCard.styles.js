const styles = theme => ({
  root: {
    background: "transparent",
    position: "relative",
    overflow: "visible",
    boxShadow: "none",
    height: "100%"
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
  media: {},
  mediaHeader: {
    height: "100%",
    maxHeight: "215px"
  },
  mediaSm: {
    height: "100%",
    maxHeight: "87px"
  },
  mediaMd: {
    height: "100%",
    maxHeight: "181px"
  },
  mediaLg: {
    height: "100%",
    maxHeight: "353px"
  },
  mediaLib: {
    height: "100%",
    maxHeight: "450px"
  },
  mediaMaxSize: {
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
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    marginBottom: theme.spacing(0.5),
    height: "100%"
  },
  priceWidget: {
    display: "flex",
    justifyContent: "flex-end"
  }
});
export default styles;
