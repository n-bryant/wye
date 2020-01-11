import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Icon from "@mdi/react";
import {
  mdiArrowLeftBold,
  mdiGoogleController,
  mdiGoogleControllerOff
} from "@mdi/js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
  ACTIONS,
  CONTENT_OPTIONS,
  AppContextConsumer
} from "../../../pages/_app";
import MediaCarousel from "./MediaCarousel";
import GameArticles from "./GameArticles";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "1rem",
    background: "black",
    overflow: "auto",
    position: "relative"
  },
  loaded: props => ({
    backgroundImage: `url(${props.backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }),
  backgroundPlaceholder: {
    width: "0",
    height: "0",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0"
  },
  detailsContainer: {
    margin: "0"
  },
  detailsContainerWithMaxWidth: {
    maxWidth: "80%",
    margin: "0 auto"
  },
  recommendationsButton: {
    padding: "0",
    textTransform: "none",
    "&:hover": {
      background: "transparent",
      textDecoration: "underline"
    }
  },
  icon: {
    height: "1rem",
    fill: "white",
    marginRight: "0.5rem"
  }
});

/**
 * renders a game's details
 */
export const GameDetails = props => {
  const {
    data: { details, articles },
    users,
    dispatch,
    width
  } = props;
  const router = useRouter();
  const classes = useStyles(details);
  const classnames = GameDetails.classnames({ classes });

  // console.log(details);
  const { highlightedVideos, screenshots, videos } = details;
  const hasMedia =
    highlightedVideos.length || screenshots.length || videos.length;

  const [loaded, setLoaded] = React.useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={classnames.root({
        loaded
      })}
    >
      {!loaded && (
        <img
          className={classnames.element("backgroundPlaceholder")}
          onLoad={onLoad}
          src={details.backgroundImageUrl}
        />
      )}
      <Grid
        className={classnames.element("detailsContainer", {
          withMaxWidth: width === "lg"
        })}
        container
        spacing={1}
      >
        <Grid item xs={12} lg={8}>
          <Button
            className={classnames.element("recommendationsButton")}
            onClick={() => {
              if (users && users.length > 0) {
                dispatch({
                  type: ACTIONS.SET_CONTENT,
                  value: CONTENT_OPTIONS.RECOMMENDATIONS
                });
              } else {
                dispatch({
                  type: ACTIONS.SET_CONTENT,
                  value: CONTENT_OPTIONS.FORM
                });
              }
              router.push("/");
            }}
          >
            <Icon
              className={classnames.element("icon")}
              path={mdiArrowLeftBold}
            />
            <Typography variant="body2">recommendations</Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1">{details.name}</Typography>
        </Grid>
        {hasMedia && (
          <MediaCarousel
            media={[...highlightedVideos, ...screenshots, ...videos]}
          />
        )}
      </Grid>
      <GameArticles articles={articles} />
    </div>
  );
};
GameDetails.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}GameDetails`
);
GameDetails.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    loaded: PropTypes.string,
    backgroundPlaceholder: PropTypes.string,
    detailsContainer: PropTypes.string,
    detailsContainerWithMaxWidth: PropTypes.string,
    recommendationsButton: PropTypes.string,
    icon: PropTypes.string
  }),
  // detailed info for a game
  details: PropTypes.object,
  // a game's article data
  articles: PropTypes.array,
  // recommendations users
  users: PropTypes.array,
  // handler to update app level state
  dispatch: PropTypes.func,
  // width details from withWidth
  width: PropTypes.string
};
GameDetails.defaultProps = {
  classes: {},
  dispatch: () => {}
};

// provide media breakpoints
const GameDetailsWithWidth = withWidth()(GameDetails);

/**
 * Renders a GameDetails with app context
 */
export const GameDetailsWithContext = props => (
  <AppContextConsumer>
    {context => {
      const users = get(context, ["state", "users"], []);
      const dispatch = get(context, "dispatch", () => {});
      return (
        <GameDetailsWithWidth users={users} dispatch={dispatch} {...props} />
      );
    }}
  </AppContextConsumer>
);
export default GameDetailsWithContext;
