const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  fieldItemsContainer: {
    width: "50%",
    marginBottom: theme.spacing(4),
    textAlign: "center"
  },
  chipsLabel: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2)
  },
  chipsLabelHidden: {
    display: "none"
  },
  chip: {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.white}`,
    margin: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
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
    alignItems: "flex-end",
    marginBottom: theme.spacing(3)
  },
  addUserField: {
    width: "225px"
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
  }
});
export default styles;
