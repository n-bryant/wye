const image = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "50%",
  height: "100%",
  visibility: "visible",
  opacity: "1",
  transform: "translatex(50%)",
  transition: "opacity 1.5s linear, visibility 1.5s"
};
const hidden = {
  visibility: "hidden",
  opacity: "0",
  transition: "opacity 1.5s linear, visibility 1.5s"
};

const styles = () => ({
  root: {
    pointerEvents: "none",
    width: "100%",
    paddingTop: "32%",
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0"
  },
  image,
  imageHidden: {
    ...hidden
  }
});
export default styles;
