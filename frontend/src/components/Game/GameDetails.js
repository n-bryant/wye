import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Icon from "@mdi/react";
import { mdiArrowLeftBold } from "@mdi/js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
  ACTIONS,
  CONTENT_OPTIONS,
  AppContextConsumer
} from "../../../pages/_app";
import BackgroundProvider from "../BackgroundProvider";
import MediaCarousel from "./MediaCarousel";
import ReleaseInfoBlock from "./ReleaseInfoBlock";
import PriceInfoBlock from "./PriceInfoBlock";
import GameArticles from "./GameArticles";

const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: "1rem",
    overflow: "auto",
    position: "relative"
  },
  detailsContainer: {
    margin: "0"
  },
  detailsContainerWithMdWidth: {
    width: "100%"
  },
  detailsInnerContainer: {
    height: "100%",
    paddingLeft: "2px !important",
    background:
      "linear-gradient(to right,  rgba(0,0,0,0) 50%,rgba(0,0,0,0.5) 100%)"
  },
  detailsInnerContainerWithMaxWidth: {
    background:
      "linear-gradient(to bottom,  rgba(0,0,0,0) 50%,rgba(0,0,0,0.5) 100%)"
  },
  detailsContainerWithMaxWidth: {
    maxWidth: "80%",
    margin: "0 auto"
  },
  priceContainer: {
    margin: "12px 4px 12px 6px",
    width: "100%"
  },
  priceContainerWithSmWidth: {
    marginLeft: "-4px"
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

  console.log(details);
  const {
    highlightedVideos,
    backgroundImageUrl,
    screenshots,
    videos,
    price,
    metacritic
  } = details;
  const hasMedia =
    highlightedVideos.length || screenshots.length || videos.length;

  return (
    <BackgroundProvider backgroundUrl={backgroundImageUrl}>
      <div className={classnames.root()}>
        <Grid
          className={classnames.element("detailsContainer", {
            withMaxWidth: width === "lg",
            withMdWidth: width === "md"
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
          <Grid
            className={classnames.element("detailsInnerContainer", {
              withMaxWidth: ["xs", "sm"].some(val => val === width)
            })}
            container
            item
            justify={"space-evenly"}
            spacing={1}
            xs={12}
          >
            {hasMedia && (
              <MediaCarousel
                media={[...highlightedVideos, ...screenshots, ...videos]}
              />
            )}
            <ReleaseInfoBlock data={details} mdWidth={hasMedia ? 5 : 12} />
          </Grid>
          <div
            className={classnames.element("priceContainer", {
              withSmWidth: ["xs", "sm"].some(val => val === width)
            })}
          >
            <PriceInfoBlock data={{ price, metacritic }} />
          </div>
        </Grid>
        <GameArticles articles={articles} />
      </div>
    </BackgroundProvider>
  );
};
GameDetails.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}GameDetails`
);
GameDetails.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    detailsContainer: PropTypes.string,
    detailsInnerContainer: PropTypes.string,
    detailsInnerContainerWithMaxWidth: PropTypes.string,
    detailsContainerWithMdWidth: PropTypes.string,
    detailsContainerWithMaxWidth: PropTypes.string,
    priceContainer: PropTypes.string,
    priceContainerWithSmWidth: PropTypes.string,
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
