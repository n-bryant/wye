const image = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  visibility: "visible",
  opacity: "1",
  transition: "all 1.5s linear"
};
const hidden = {
  visibility: "hidden",
  opacity: "0",
  transition: "all 1.5s linear"
};

const styles = () => ({
  root: {
    pointerEvents: "none",
    width: "100%",
    paddingTop: "32%",
    position: "relative"
  },
  image,
  imageHidden: {
    ...hidden
  },
  placeholder: {
    ...image
  },
  placeholderHidden: {
    ...hidden
  }
});
export default styles;
