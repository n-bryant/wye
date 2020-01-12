const styles = theme => ({
  root: {
    background: "rgba(0,0,0,.5)",
    padding: "12px",
    display: "flex",
    justifyContent: "space-evenly"
  },
  withSmScreen: {
    flexWrap: "wrap"
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "50%",
    borderRight: "1px solid hsla(0,0%,100%,0.2)"
  },
  priceContainerWithSmScreen: {
    width: "100%",
    borderRight: "none",
    borderBottom: "1px solid hsla(0,0%,100%,0.2)",
    paddingBottom: theme.spacing(2)
  },
  priceDetailsContainer: {
    display: "flex",
    alignItems: "center",
    padding: "4px",
    marginRight: "24px"
  },
  priceDetailsContainerWithDiscount: {
    background: theme.palette.common.black
  },
  discountPercent: {
    background: theme.palette.common.green5,
    padding: "12px"
  },
  initialPrice: {
    color: "rgba(255,255,255,0.5)",
    textDecoration: "line-through",
    fontSize: "0.5rem"
  },
  finalPrice: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
    background: theme.palette.common.black
  },
  priceDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "4px"
  },
  priceFree: {
    padding: "4px",
    background: theme.palette.common.black,
    marginRight: "24px"
  },
  storeButton: {
    background: theme.palette.common.blue6,
    textTransform: "none",
    border: "2px solid transparent",
    borderRadius: "0",
    "&:hover": {
      background: theme.palette.common.blue6,
      border: `2px solid ${theme.palette.common.white}`
    }
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white
  },
  metacriticContainer: {
    minWidth: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  metacriticContainerWithSmScreen: {
    paddingTop: "12px",
    width: "100%"
  },
  metacriticTitle: {
    display: "flex",
    alignItems: "center",
    marginRight: "24px"
  },
  metacriticScore: {
    background: theme.palette.common.green5,
    padding: "4px",
    border: `4px solid ${theme.palette.common.black}`
  },
  metacriticScoreNegative: {
    background: theme.palette.common.red7
  },
  icon: {
    fill: theme.palette.common.white,
    height: "1.5rem"
  }
});
export default styles;
