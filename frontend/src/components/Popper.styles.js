const styles = theme => ({
  root: {
    position: "absolute",
    background: "#171E28",
    top: "0",
    zIndex: "10"
  },
  content: {
    position: "relative",
    padding: "0.5rem",
    overflow: "hidden",
    height: "100%"
  },
  arrow: {
    position: "absolute",
    width: "12px",
    height: "12px",
    borderTop: "solid 12px transparent",
    borderBottom: "solid 12px transparent"
  },
  arrowLeft: {
    left: "-12px",
    borderRight: "solid 12px #171E28"
  },
  arrowRight: {
    left: "100%",
    borderLeft: "solid 12px #171E28"
  }
});
export default styles;
