const media = {
  width: "100%",
  display: "block"
};

const triangle = {
  content: "close-quote",
  borderStyle: "solid",
  borderWidth: "8px",
  position: "absolute",
  top: "-20px",
  opacity: "1",
  transition: "opacity 0.25s ease-in-out"
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
    padding: "12px 0 0 !important"
  },
  setFeaturedButtonContainer: {
    "&:first-of-type": {
      paddingLeft: "0"
    },
    "&:last-of-type": {
      paddingRight: "0"
    }
  },
  setFeaturedButton: {
    position: "relative",
    padding: "0",
    border: `4px solid rgba(0,0,0,.5)`,
    borderRadius: "0",
    transition: "border 0.25s ease-in-out",
    "&:after": {
      content: "close-quote",
      opacity: "0",
      transition: "opacity 0.25s ease-in-out"
    },
    "&:hover,&:active": {
      border: `4px solid ${theme.palette.common.blue6}`,
      transition: "border 0.25s ease-in-out",
      "&:after": {
        ...triangle,
        borderColor: `transparent transparent ${theme.palette.common.blue6} transparent`
      }
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
    fill: theme.palette.common.blue6
  }
});
export default styles;
