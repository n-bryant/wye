const styles = theme => {
  return {
    root: {
      background: theme.palette.panel.background,
      position: "fixed",
      top: theme.layout.header.height,
      right: "0",
      bottom: "0",
      height: `calc(100% - ${theme.layout.header.height})`,
      width: "350px",
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      },
      zIndex: "10",
      overflow: "auto",
      animation: "$slideLeft 0.25s linear"
    },
    closing: {
      animation: "$slideRight 0.25s linear"
    },
    "@keyframes slideLeft": {
      "0%": {
        transform: "translate3d(350px,0,0)"
      },
      "100%": {
        transform: "translate3d(0,0,0)"
      }
    },
    "@keyframes slideRight": {
      "0%": {
        transform: "translate3d(0,0,0)"
      },
      "100%": {
        transform: "translate3d(350px,0,0)"
      }
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
