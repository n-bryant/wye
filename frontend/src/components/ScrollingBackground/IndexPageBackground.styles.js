import { ThemeProvider } from "react-jss";

const scroll = {
  backgroundRepeatY: "repeat",
  backgroundSize: "100%",
  height: "5967px",
  width: "462px",
  zIndex: "0"
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.common.blue0,
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
    margin: "1rem"
  },
  scrollForward: {
    ...scroll,
    backgroundImage:
      "url('https://res.cloudinary.com/dehqb0rqc/image/upload/v1576901683/Wye/Wye_Background1.png')",
    animation: "$scrollForward 50s linear infinite"
  },
  scrollBackward: {
    ...scroll,
    backgroundImage:
      "url('https://res.cloudinary.com/dehqb0rqc/image/upload/v1576901673/Wye/Wye_Background2.png')",
    animation: "$scrollBackward 50s linear infinite"
  },
  "@keyframes scrollForward": {
    "0%": {
      backgroundPosition: "0 0"
    },
    "100%": {
      backgroundPosition: "0 -5968px"
    }
  },
  "@keyframes scrollBackward": {
    "0%": {
      backgroundPosition: "0 -5968px"
    },
    "100%": {
      backgroundPosition: "0 0"
    }
  }
});
export default styles;
