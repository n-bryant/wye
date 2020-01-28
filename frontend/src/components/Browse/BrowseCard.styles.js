const styles = theme => ({
  root: {
    background: "transparent",
    position: "relative",
    overflow: "visible",
    boxShadow: "none"
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
  media: {},
  mediaHeader: {
    height: "215px"
  },
  mediaSm: {
    height: "87px"
  },
  mediaMd: {
    height: "181px"
  },
  mediaLg: {
    height: "353px"
  },
  mediaLib: {
    height: "450px"
  },
  content: {
    background: "rgba(0,0,0,.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    color: theme.palette.common.blue6
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
    marginBottom: theme.spacing(0.5)
  },
  priceWidget: {
    display: "flex",
    justifyContent: "flex-end"
  }
});
export default styles;
