import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Link from "next/link";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import formatCurrency from "../../../lib/formatCurrency";
import UserAvatar from "../../components/RecommendationsGrid/UserAvatar";
import PriceWidget from "../Game/PriceWidget";
import HeroImage from "../Game/HeroImage";
import Popper from "../Popper";
import styles from "./BrowseCard.styles";

export const IMG_TYPES_MAP = {
  HEADER: "headerImage",
  CAPSULE_SM: "capsuleSm",
  CAPSULE_MD: "capsuleMd",
  CAPSULE_LG: "capsuleLg",
  LIBRARY_CAPSULE: "libraryCapsule",
  HERO: "libraryHero"
};

export const VARIANTS_MAP = {
  header: {
    image: IMG_TYPES_MAP.HEADER
  },
  sm: {
    image: IMG_TYPES_MAP.CAPSULE_SM
  },
  md: {
    image: IMG_TYPES_MAP.CAPSULE_MD
  },
  lg: {
    image: IMG_TYPES_MAP.CAPSULE_LG
  },
  lib: {
    image: IMG_TYPES_MAP.LIBRARY_CAPSULE
  },
  horizontal: {
    image: IMG_TYPES_MAP.CAPSULE_LG
  }
};

// retrieves the highlight trailer path for a game
export const GET_HIGHLIGHT_TRAILER = gql`
  query GET_HIGHLIGHT_TRAILER($gameId: ID!) {
    getHighlightTrailer(gameId: $gameId)
  }
`;

/**
 * renders a Card of the specified variant,
 * containing an image relating to a game and action buttons to direct to more details
 */
export const BrowseCard = props => {
  const classnames = BrowseCard.classnames(props);
  const {
    data,
    userDetails,
    playtimeAndOwnershipData,
    variant,
    trailerPath,
    cardActionLabel,
    cardActionHref,
    cardActionLinkPath,
    withPrice,
    maxSize,
    width
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const priceData = {
    freeToPlay: data.freeToPlay,
    onSale: data.onSale,
    discountPercentage: data.discount,
    initialFormatted: formatCurrency(data.initialPrice),
    finalFormatted: formatCurrency(data.finalPrice)
  };

  const handleMouseEnter = async e => {
    await setAnchorEl(e.currentTarget);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      className={classnames.root({
        header: variant === "header",
        sm: variant === "sm",
        md: variant === "md",
        lg: variant === "lg",
        lib: variant === "lib",
        horizontal: variant === "horizontal",
        maxSize
      })}
    >
      <Link href="/game/[id]" as={`/game/${data.appid}`}>
        <a
          className={classnames.element("gameLink", {
            header: variant === "header",
            sm: variant === "sm",
            md: variant === "md",
            lg: variant === "lg",
            lib: variant === "lib",
            horizontal: variant === "horizontal",
            horizontalWide:
              variant === "horizontal" &&
              ["sm", "lg"].some(val => val === width),
            maxSize
          })}
        >
          <CardActionArea
            className={classnames.element("actionArea")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CardContent className={classnames.element("content")}>
              <HeroImage
                className={classnames.element("media")}
                altText={data.name}
                imageSrc={data[VARIANTS_MAP[variant].image]}
                placeholderPath={data[IMG_TYPES_MAP.HEADER]}
                squaredBottom={Boolean(cardActionLabel)}
                squaredRight={variant === "horizontal"}
              />
            </CardContent>
          </CardActionArea>
        </a>
      </Link>

      {Boolean(anchorEl) && (
        <Popper anchorEl={anchorEl}>
          <Typography className={classnames.element("title")} variant="h3">
            {data.name}
          </Typography>
          {trailerPath?.length ? (
            <video
              className={classnames.element("trailer")}
              playsInline={true}
              src={`${trailerPath}#t=0`}
              autoPlay
              preload={"none"}
              poster="/featuredItemSpacer.png"
              muted
              loop
              width="384"
              height="215"
            >
              {data.name}
            </video>
          ) : (
            <img src={data.headerImage} width="100%" />
          )}
          <Typography
            variant="body2"
            className={classnames.element("withEllipsis")}
          >
            <span className={classnames.element("category")}>Developers: </span>{" "}
            {data.developers.join(", ")}
          </Typography>
          <Typography
            variant="body2"
            className={classnames.element("withEllipsis")}
            gutterBottom={true}
          >
            <span className={classnames.element("category")}>Publishers: </span>{" "}
            {data.publishers.join(", ")}
          </Typography>
          <Typography variant="body2">
            <span className={classnames.element("category")}>
              User Rating:{" "}
            </span>{" "}
            {data.userRating}%
          </Typography>
          <Typography variant="body2" gutterBottom={true}>
            <span className={classnames.element("category")}>Owners: </span>{" "}
            {data.ownersFormatted}
          </Typography>
          {data.genres.length && data.genres.every(genre => genre.length) && (
            <React.Fragment>
              <Typography variant="body2">Genres:</Typography>
              <div className={classnames.element("genresContainer")}>
                {data.genres.slice(0, 3).map((genre, index) => (
                  <Chip
                    key={index}
                    className={classnames.element("chip")}
                    label={genre}
                    size="small"
                    classes={{
                      label: classnames.element("chipLabel")
                    }}
                  />
                ))}
              </div>
            </React.Fragment>
          )}
        </Popper>
      )}
      {cardActionLabel && cardActionLinkPath && cardActionHref && (
        <CardActions className={classnames.element("actionsContainer")}>
          <Link href={cardActionHref} as={cardActionLinkPath}>
            <a className={classnames.element("actionLink")}>
              <Typography
                className={classnames.element("actionLinkLabel")}
                variant="body1"
              >
                {cardActionLabel}
              </Typography>
            </a>
          </Link>
        </CardActions>
      )}
      {variant === "horizontal" && (
        <CardContent
          className={classnames.element("horizontalContent", {
            wide: ["sm", "lg"].some(val => val === width)
          })}
        >
          {userDetails && userDetails.length > 0 && (
            <div className={classnames.element("usersContainer")}>
              {userDetails.map(user => {
                // compile player game data
                const gameDetails = {
                  ownsGame: playtimeAndOwnershipData.ownedBy.some(
                    item => item === user.id
                  ),
                  recentlyPlayedGame: playtimeAndOwnershipData.recentlyPlayedBy.some(
                    item => item === user.id
                  ),
                  hoursPlayed: playtimeAndOwnershipData.playtime.filter(
                    item => item.steamId === user.id
                  )[0].hoursPlayed
                };

                return (
                  <UserAvatar
                    key={user.id}
                    data={user}
                    gameDetails={gameDetails}
                  />
                );
              })}
            </div>
          )}
          <div className={classnames.element("contentWrapper")}>
            <Typography
              className={classnames.element("horizontalTitle")}
              variant="h2"
            >
              {data.name}
            </Typography>
            <div className={classnames.element("horizontalSubContent")}>
              <PriceWidget data={priceData} />
            </div>
          </div>
        </CardContent>
      )}
      {withPrice && variant !== "horizontal" && (
        <div className={classnames.element("priceWidget")}>
          <PriceWidget data={priceData} skinny={true} />
        </div>
      )}
    </Card>
  );
};
BrowseCard.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BrowseCard`
);
BrowseCard.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    header: PropTypes.string,
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
    lib: PropTypes.string,
    horizontal: PropTypes.string,
    horizontalContent: PropTypes.string,
    horizontalSubContent: PropTypes.string,
    horizontalTitle: PropTypes.string,
    maxSize: PropTypes.string,
    media: PropTypes.string,
    horizontalContentWide: PropTypes.string,
    gameLinkHorizontalWide: PropTypes.string,
    gameLinkHeader: PropTypes.string,
    gameLinkSm: PropTypes.string,
    gameLinkMd: PropTypes.string,
    gameLinkLg: PropTypes.string,
    gameLinkLib: PropTypes.string,
    gameLinkMaxSize: PropTypes.string,
    gameLink: PropTypes.string,
    content: PropTypes.string,
    actionsContainer: PropTypes.string,
    actionLink: PropTypes.string,
    actionLinkLabel: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    genresContainer: PropTypes.string,
    chip: PropTypes.string,
    chipLabel: PropTypes.string,
    trailer: PropTypes.string,
    actionArea: PropTypes.string,
    priceWidget: PropTypes.string,
    usersContainer: PropTypes.string,
    withEllipsis: PropTypes.string
  }),
  // game data for card to display
  data: PropTypes.object,
  // details for any users associated with the game
  userDetails: PropTypes.array,
  // playtime and ownership details
  playtimeAndOwnershipData: PropTypes.object,
  // path to the highlight trailer
  trailerPath: PropTypes.string,
  // which card variant to render
  variant: PropTypes.oneOf(Object.keys(VARIANTS_MAP)),
  // include the price widget
  withPrice: PropTypes.bool,
  // the label for the card action
  cardActionLabel: PropTypes.string,
  // the href for the card action link
  cardActionHref: PropTypes.string,
  // the path for the card action link
  cardActionLinkPath: PropTypes.string,
  // whether the card should assume the dimensions of its container
  maxSize: PropTypes.bool,
  // material-ui width value
  width: PropTypes.string
};
BrowseCard.defaultProps = {
  classes: {},
  variant: Object.keys(VARIANTS_MAP)[0],
  withPrice: true,
  maxSize: false
};

// apply styles
export const StyledBrowseCard = withWidth()(withStyles(styles)(BrowseCard));

// /**
//  * renders a Query for a game's highlight trailer that returns a StyledBrowseCard
//  */
// export const HighlightTrailerQuery = props => {
//   return (
//     <Query
//       query={GET_HIGHLIGHT_TRAILER}
//       variables={{ gameId: props.data.appid }}
//     >
//       {({ loading, error, data }) => {
//         if (loading || error) {
//           return <div style={{ display: "none" }}></div>;
//         }

//         const trailerPath = get(data, "getHighlightTrailer");

//         return <StyledBrowseCard trailerPath={trailerPath} {...props} />;
//       }}
//     </Query>
//   );
// };
// HighlightTrailerQuery.propTypes = {
//   // a data object containing the game ID to run the query for
//   data: PropTypes.shape({
//     appid: PropTypes.String
//   })
// };

// export default HighlightTrailerQuery;

export default StyledBrowseCard;
