import { createMuiTheme } from "@material-ui/core/styles";
import palette from "./palette";
import typography from "./typography";

// Create a theme instance.
const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      // disable ripple globally for buttons
      disableRipple: true
    },
    MuiInputLabel: {
      disableAnimation: true,
      shrink: true
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        color: palette.common.white
      }
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "1px solid hsla(0,0%,100%,.5)",
          transition: "borderBottom 0s"
        },
        "&:after": {
          borderBottom: `2px solid ${palette.common.white}`,
          "&:focused": {
            borderBottom: `2px solid ${palette.common.white}`
          }
        }
      }
    },
    MuiInputLabel: {
      root: {
        color: palette.common.white,
        "&$focused": {
          color: palette.common.white
        }
      }
    }
  },
  palette,
  typography
});

export default theme;
