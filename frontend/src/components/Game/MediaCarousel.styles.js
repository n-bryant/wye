const media = {
  width: "100%",
  display: "block"
};

const styles = theme => ({
  root: {
    height: "100%",
    margin: "0"
  },
  featuredItemContainer: {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
    padding: "0 !important"
  },
  featuredItemWrapper: {
    background: theme.palette.common.black,
    position: "relative",
    width: "100%",
    height: "100%"
  },
  featuredItemSpacer: {
    ...media
  },
  featuredItem: {
    ...media,
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    background: theme.palette.common.black,
    opacity: "1",
    transition: "opacity 0.25s ease-in-out"
  },
  featuredItemHidden: {
    opacity: "0",
    transition: "opacity 0.25s ease-in-out"
  },
  thumbnailsContainer: {
    overflowX: "auto",
    marginLeft: "0",
    paddingLeft: "0 !important"
  },
  setFeaturedButtonContainer: {
    "&:first-of-type": {
      paddingLeft: "0"
    }
  },
  setFeaturedButton: {
    position: "relative",
    padding: "0",
    border: `4px solid rgba(0,0,0,.5)`,
    borderRadius: "0",
    transition: "border 0.25s ease-in-out",
    "&:hover": {
      border: "4px solid hsla(0,0%,100%,0.2)",
      transition: "border 0.25s ease-in-out"
    },
    "&:active": {
      border: `4px solid ${theme.palette.common.white}`
    }
  },
  thumbnail: {
    display: "block",
    width: "116px",
    height: "65px"
  },
  playIconContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  playIcon: {
    height: "3rem",
    fill: "rgba(0,0,0,.75)"
  }
});
export default styles;
