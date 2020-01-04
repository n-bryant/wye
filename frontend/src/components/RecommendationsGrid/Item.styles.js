const hidden = {
  display: "none"
};

const styles = theme => ({
  root: {},
  gamePageLink: {
    textDecoration: "none"
  },
  paper: {
    height: "360px",
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)"
  },
  titleBar: {
    background: `linear-gradient(rgba(0,0,0,.75), transparent)`,
    padding: theme.spacing(1),
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    opacity: "1",
    transition: "opacity .25s ease-in-out"
  },
  titleBarHidden: {
    opacity: "0",
    transition: "opacity .25s ease-in-out"
  },
  gameTitle: {
    color: theme.palette.common.blue6,
    fontSize: "24px",
    marginBottom: theme.spacing(1)
  },
  gameImage: {},
  paperOverlayContainer: {
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0,0,0,.75)",
    border: "1px solid hsla(0,0%,100%,0.2)",
    borderRadius: "4px",
    height: "100%",
    padding: "1rem",
    opacity: "1",
    backdropFilter: "blur(5px) brightness(0.7)",
    transition: "opacity 0.25s ease-in-out",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  paperOverlayContainerHidden: {
    opacity: "0",
    transition: "opacity 0.25s ease-in-out"
  },
  userReviewContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1)
  },
  userReviewIcon: {
    fill: theme.palette.notification.confirmation,
    height: "14px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  userReviewIconNegative: {
    fill: theme.palette.notification.error
  },
  playerContainer: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  avatar: {
    display: "block",
    background: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.blue6}`,
    borderRadius: "50%",
    width: "32px",
    marginLeft: theme.spacing(1)
  },
  playerInfo: {
    display: "flex",
    alignItems: "center"
  },
  playerInfoType: {},
  playerInfoTypeEmpty: {
    marginLeft: theme.spacing(1),
    opacity: "0.5"
  },
  categoriesContainer: {},
  categoryTitle: {
    color: theme.palette.common.blue3
  },
  priceContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  discountPercent: {
    background: theme.palette.common.lime9,
    color: theme.palette.common.lime4,
    padding: theme.spacing(1)
  },
  discountPercentHidden: {
    ...hidden
  },
  prices: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1)
  },
  initialPrice: {
    textDecoration: "line-through",
    opacity: "0.5"
  },
  initialPriceHidden: {
    ...hidden
  },
  finalPrice: {}
});
export default styles;
