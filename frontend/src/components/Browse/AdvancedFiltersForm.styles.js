const styles = theme => {
  const innerDrawerStyles = {
    top: theme.layout.header.height,
    height: `calc(100% - ${theme.layout.header.height})`
  };

  return {
    root: {
      height: "100%",
      position: "relative"
    },
    drawer: {
      ...innerDrawerStyles
    },
    drawerContent: {
      height: "100%"
    },
    modal: {
      ...innerDrawerStyles
    },
    paper: {
      ...innerDrawerStyles,
      width: "350px",
      background: theme.palette.panel.background,
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    },
    backdrop: {
      ...innerDrawerStyles
    },
    closeButtonContainer: {
      marginTop: "0",
      padding: "1rem 1rem 0 1rem",
      display: "flex",
      justifyContent: "flex-end"
    },
    fieldsContainer: {
      padding: "1rem"
    },
    fieldSection: {
      paddingTop: "1rem",
      borderTop: `1px solid ${theme.palette.common.white}`
    },
    fieldSectionTitle: {
      color: theme.palette.common.blue6
    },
    menuPaper: {
      backgroundColor: theme.palette.panel.background
    },
    selectOption: {
      "&:hover": {
        color: theme.palette.common.blue6
      }
    },
    submitButtonContainer: {
      marginTop: "0",
      paddingBottom: "1rem",
      display: "flex",
      justifyContent: "center"
    }
  };
};
export default styles;
