const scrollContainer = {
  margin: "1rem",
  // position: "absolute",
  // top: "-530px",
  // bottom: "0",
  height: "calc(5968px + 100vh)"
};

const scroll = {
  backgroundRepeatY: "repeat",
  backgroundSize: "100%",
  height: "calc(100% + 200vh)",
  width: "462px",
  zIndex: "0"
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.common.black,
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0"
  },
  panel: {
    height: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(-45deg)"
  },
  scrollContainer: {
    ...scrollContainer
  },
  scrollContainerStaggered: {
    ...scrollContainer,
    marginTop: "227px"
  },
  scrollForward: {
    ...scroll,
    backgroundImage: "url('/Wye_Background1.png')"
    // animation: "$scrollForward 50s linear infinite"
  },
  scrollBackward: {
    ...scroll,
    backgroundImage: "url('/Wye_Background2.png')"
    // animation: "$scrollBackward 50s linear infinite"
  },
  "@keyframes scrollForward": {
    "0%": {
      transform: "translate3d(0,0,0)"
    },
    "100%": {
      transform: "translate3d(0,-5968px,0)"
    }
  },
  "@keyframes scrollBackward": {
    "0%": {
      transform: "translate3d(0,-5968px,0)"
    },
    "100%": {
      transform: "translate3d(0,0,0)"
    }
  }
});
export default styles;
