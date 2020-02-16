import React from "react";
import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import { mdiArrowLeftBold } from "@mdi/js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import BackgroundProvider from "../BackgroundProvider";
import ButtonWithHoverFill from "../ButtonWithHoverFill";
import MediaCarousel from "./MediaCarousel";
import ReleaseInfoBlock from "./ReleaseInfoBlock";
import PriceInfoBlock from "./PriceInfoBlock";
import RequirementsBlock from "./RequirementsBlock";
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
    margin: "12px 4px 8px 6px",
    width: "100%"
  },
  priceContainerWithSmWidth: {
    marginLeft: "-4px"
  },
  requirementsContainer: {
    margin: "0 4px 12px 6px",
    width: "100%"
  },
  requirementsContainerWithSmWidth: {
    marginLeft: "-4px"
  },
  articlesContainer: {
    margin: "0 4px 12px 6px",
    width: "100%"
  },
  articlesContainerWithSmWidth: {
    marginLeft: "-4px"
  },
  backButtonContainer: {
    marginBottom: "4px"
  },
  backButton: {
    padding: "0",
    textDecoration: "none",
    transition: "all 0.25s ease-in-out",
    "&:hover": {
      background: "transparent",
      textDecoration: "underline",
      transition: "all 0.25s ease-in-out"
    }
  },
  icon: {
    height: "1rem",
    fill: "white",
    marginRight: "0.5rem",
    transition: "fill 0.25s ease-in-out"
  },
  spacer: {
    margin: "2rem",
    borderBottom: "1px solid hsla(0,0%,100%,0.2)"
  }
});

/**
 * renders a game's details
 */
export const GameDetails = props => {
  const {
    data: { details, articles },
    width
  } = props;
  const router = useRouter();
  const classes = useStyles(details);
  const classnames = GameDetails.classnames({ classes });

  // console.log(details);
  const {
    highlightedVideos,
    backgroundImageUrl,
    screenshots,
    videos,
    price,
    metacritic,
    requirements
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
          <Grid
            className={classnames.element("backButtonContainer")}
            item
            xs={12}
            lg={8}
          >
            <ButtonWithHoverFill
              icon={mdiArrowLeftBold}
              handleClick={() => {
                router.back();
              }}
              label="back"
              displayLabel={true}
              transformText={true}
            />
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
          {requirements && (requirements.minimum || requirements.recommended) && (
            <div
              className={classnames.element("requirementsContainer", {
                withSmWidth: ["xs", "sm"].some(val => val === width)
              })}
            >
              <div className={classnames.element("spacer")}></div>
              <RequirementsBlock requirements={requirements} />
            </div>
          )}
          {articles && articles.length && articles.length > 0 && (
            <div
              className={classnames.element("articlesContainer", {
                withSmWidth: ["xs", "sm"].some(val => val === width)
              })}
            >
              <div className={classnames.element("spacer")}></div>
              <GameArticles articles={articles} />
            </div>
          )}
        </Grid>
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
    backButton: PropTypes.string,
    icon: PropTypes.string
  }),
  // detailed info for a game
  details: PropTypes.object,
  // a game's article data
  articles: PropTypes.array,
  // width details from withWidth
  width: PropTypes.string
};
GameDetails.defaultProps = {
  classes: {}
};

// provide media breakpoints
const GameDetailsWithWidth = withWidth()(GameDetails);

export default GameDetailsWithWidth;
