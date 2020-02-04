const image = {
  display: "block",
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "4px",
  opacity: "1",
  transition: "opacity .5s linear"
};
const hidden = {
  opacity: "0",
  transition: "opacity .5s linear"
};

const styles = () => ({
  root: {},
  image,
  imageSquaredBottom: {
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0"
  },
  imageSquaredRight: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0"
  },
  imageHidden: {
    ...hidden
  },
  placeholder: {
    ...image,
    backgroundColor: "rgba(34, 139, 230, 0.25)"
  },
  placeholderHidden: {
    ...hidden
  }
});
export default styles;
