const styles = theme => ({
  root: {
    height: theme.layout.header.height,
    background: theme.palette.common.blue6,
    boxShadow: "0 0 4px 0 rgba(0,0,0,0.25), 0 4px 4px 0 rgba(0,0,0,0.25)"
  },
  toolBar: {
    height: "100%",
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mainNav: {
    display: "flex",
    alignItems: "center",
    height: "100%"
  },
  title: {
    cursor: "pointer",
    paddingRight: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.common.white}`
  },
  browseMenuButton: {
    padding: "0",
    textTransform: "none",
    height: "100%",
    fontWeight: "300",
    fontSize: "1.25rem",
    marginLeft: "0.5rem",
    "&:hover": {
      background: "none"
    }
  },
  browseMenu: {
    background: theme.palette.panel.background,
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    padding: "1rem"
  },
  menuSectionTitle: {
    color: theme.palette.common.yellow1,
    borderBottom: `1px solid ${theme.palette.common.yellow1}`,
    padding: "0.5rem 0"
  },
  menuLink: {
    color: theme.palette.common.white,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.link.default
    },
    "&:active": {
      color: theme.palette.link.active
    },
    "&:visited": {
      color: theme.palette.common.white,
      "&:hover": {
        color: theme.palette.link.default
      }
    }
  },
  linksContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: "none",
    "&:active, &:hover": {
      textDecoration: "underline"
    },
    margin: "0 .5rem",
    height: "100%",
    display: "flex",
    alignItems: "center"
  },
  linkWithNoHoverDecoration: {
    "&:hover": {
      textDecoration: "none"
    }
  },
  githubIcon: {
    fill: theme.palette.common.white,
    height: "2rem"
  }
});
export default styles;
