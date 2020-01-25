const styles = theme => ({
  root: {},
  priceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  priceDetailsContainer: {
    display: "flex",
    alignItems: "center",
    padding: "4px"
  },
  priceDetailsContainerWithDiscount: {
    background: theme.palette.common.black
  },
  discountPercent: {
    background: theme.palette.common.green5,
    padding: "12px"
  },
  discountPercentSkinny: {
    padding: "0 12px"
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
  }
});
export default styles;
