const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3)
  },
  fieldItemsContainer: {
    textAlign: "center"
  },
  chip: {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.blue6}`,
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0 0`,
    maxWidth: "175px",
    justifyContent: "space-between"
  },
  deleteIcon: {
    fill: theme.palette.common.white,
    "&:hover": {
      fill: theme.palette.common.blue6
    }
  },
  addUserfieldContainer: {
    width: "275px",
    display: "flex",
    alignItems: "flex-end"
  },
  addUserField: {
    width: "225px",
    "&:disabled": {
      color: theme.palette.common.white
    }
  },
  addUserButton: {
    padding: "0",
    width: "1.5rem",
    margin: "6px 12px 7px",
    height: "1.5rem",
    minWidth: "1.5rem",
    "&:hover": {
      background: "transparent"
    },
    "&:disabled": {
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  addUserIcon: {
    fill: theme.palette.common.white,
    height: "1.5rem",
    transition: ".5s ease-in-out"
  },
  addUserIconEnabled: {
    "&:hover": {
      fill: theme.palette.common.blue6,
      transition: ".25s ease-in-out"
    }
  },
  addUserIconDisabled: {
    fill: "rgba(255,255,255, 0.38)"
  },
  fieldRoot: {
    color: "rgba(255,255,255, 0.38) !important"
  }
});
export default styles;
