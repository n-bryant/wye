const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "rgba(34, 139, 230,.25)",
    position: "relative",
    zIndex: "1"
  },
  titleContainer: {
    height: theme.layout.header.height,
    minHeight: theme.layout.header.height,
    background: "rgba(0,0,0,.8)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    boxShadow: "0 0 4px 0 rgba(0,0,0,0.25), 0 4px 4px 0 rgba(0,0,0,0.25)"
  },
  title: {
    fontWeight: "300",
    fontSize: "24px"
  },
  faqContainer: {
    backdropFilter: "blur(6px)",
    background: "rgba(0,0,0,.8)",
    border: "1px solid hsla(0,0%,100%,0.2)",
    width: "80%",
    margin: "24px auto",
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "0"
    }
  },
  expandAllButton: {
    fontWeight: "300",
    padding: "0",
    "&:hover": {
      background: "transparent",
      color: theme.palette.common.blue6
    }
  },
  panel: {
    background: "transparent",
    boxShadow: "none",
    borderBottom: "1px solid hsla(0,0%,100%,0.2)",
    borderRadius: "0",
    margin: "0 !important"
  },
  expandIcon: {
    height: "2rem",
    fill: theme.palette.common.white
  },
  expandIconWithHovered: {
    fill: theme.palette.common.blue6
  },
  panelSummary: {},
  panelSummaryExpanded: {
    boxShadow: "0 0 4px 0 rgba(0,0,0,0.25), 0 4px 4px 0 rgba(0,0,0,0.25)"
  },
  panelSummaryText: {
    fontWeight: "300"
  },
  panelDetails: {
    flexDirection: "column",
    background: "rgba(0,0,0,.5)",
    padding: theme.spacing(3)
  },
  link: {
    textDecoration: "none",
    marginBottom: theme.spacing(6),
    color: theme.palette.link.default,
    "&:hover": {
      color: theme.palette.link.hover
    },
    "&:active": {
      color: theme.palette.link.active
    }
  }
});
export default styles;
