const styles = theme => ({
  root: {},
  checkbox: {
    color: theme.palette.common.white
  },
  label: {
    color: theme.palette.common.blue6
  },
  optionsContainer: {
    maxHeight: "250px",
    overflow: "auto"
  },
  options: {
    display: "flex",
    flexDirection: "column"
  },
  checkboxChecked: {
    color: theme.palette.common.blue6
  }
});
export default styles;
