const styles = () => ({
  root: {
    height: "100%",
    backgroundImage: "url('/waterfall/waterfall_01.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    animation: "$flow 1.5s linear infinite"
  },
  "@keyframes flow": {
    "0%": {
      backgroundImage: "url('/waterfall/waterfall_01.png')"
    },
    "12.5%": {
      backgroundImage: "url('/waterfall/waterfall_02.png')"
    },
    "25%": {
      backgroundImage: "url('/waterfall/waterfall_03.png')"
    },
    "37.5%": {
      backgroundImage: "url('/waterfall/waterfall_04.png')"
    },
    "50%": {
      backgroundImage: "url('/waterfall/waterfall_05.png')"
    },
    "62.5%": {
      backgroundImage: "url('/waterfall/waterfall_06.png')"
    },
    "75%": {
      backgroundImage: "url('/waterfall/waterfall_07.png')"
    },
    "87.5%": {
      backgroundImage: "url('/waterfall/waterfall_08.png')"
    },
    "100%": {
      backgroundImage: "url('/waterfall/waterfall_01.png')"
    }
  }
});
export default styles;
