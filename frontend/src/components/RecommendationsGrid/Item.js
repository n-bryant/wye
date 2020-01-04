import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Link from "next/link";
import Icon from "@mdi/react";
import { mdiThumbUpOutline, mdiThumbDownOutline } from "@mdi/js";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import formatCurrency from "../../../lib/formatCurrency";
import HeroImage from "../Game/HeroImage";
import styles from "./Item.styles";

/**
 * renders a grid item holding data for a game
 */
export const Item = props => {
  const classnames = Item.classnames(props);
  const { data, userDetails, featured } = props;
  const [showOverlay, setShowOverlay] = React.useState(false);
  const { game, ownedBy, recentlyPlayedBy } = data;

  const hasNegativeRating = game.userRating < 50;

  /**
   * returns
   * @param {String} id
   * @param {Array} userDetails
   * @returns {String}
   */
  const getUserAvatar = (id, userDetails) => {
    let avatarPath = "/steam.png";
    for (let i = 0; i < userDetails.length; i++) {
      if (userDetails[i].id === id) {
        avatarPath = userDetails[i].avatarImageUrl;
        break;
      }
    }
    return (
      <img
        className={classnames.element("avatar")}
        key={id}
        src={avatarPath}
        alt={id}
      />
    );
  };

  return (
    <Grid className={classnames.root()} item xs={12} md={featured ? 12 : 6}>
      <Link href="/game/[id]" as={`/game/${game.appid}`}>
        <a className={classnames.element("gamePageLink")}>
          <Paper
            className={classnames.element("paper")}
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          >
            <HeroImage
              altText={game.name}
              imageSrc={`http://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
            />
            <div
              className={classnames.element("titleBar", {
                hidden: showOverlay
              })}
            >
              <Typography variant="h1">{game.name}</Typography>
            </div>
            <div
              className={classnames.element("paperOverlayContainer", {
                hidden: !showOverlay
              })}
            >
              <Typography
                className={classnames.element("gameTitle")}
                variant="h3"
              >
                {game.name}
              </Typography>
              <div className={classnames.element("userReviewContainer")}>
                <Typography variant="body2">User Rating:</Typography>
                <Icon
                  path={
                    hasNegativeRating ? mdiThumbDownOutline : mdiThumbUpOutline
                  }
                  className={classnames.element("userReviewIcon", {
                    negative: hasNegativeRating
                  })}
                />
                <Typography variant="body2">{game.userRating}%</Typography>
              </div>
              <Typography variant="body2">
                <span className={classnames.element("categoryTitle")}>
                  Developers:{" "}
                </span>
                {game.developers.join(", ")}
              </Typography>
              <Typography variant="body2">
                <span className={classnames.element("categoryTitle")}>
                  Publishers:{" "}
                </span>
                {game.publishers.join(", ")}
              </Typography>
              <div className={classnames.element("playerContainer")}>
                <div className={classnames.element("playerInfo")}>
                  <Typography
                    className={classnames.element("playerInfoType")}
                    variant="body2"
                  >
                    Owned By:{" "}
                  </Typography>
                  {ownedBy.length === 0 ? (
                    <Typography
                      className={classnames.element("playerInfoTypeEmpty")}
                      variant="body1"
                    >
                      n/a
                    </Typography>
                  ) : (
                    ownedBy.map(id => getUserAvatar(id, userDetails))
                  )}
                </div>
                <div className={classnames.element("playerInfo")}>
                  <Typography
                    className={classnames.element("playerInfoType")}
                    variant="body2"
                  >
                    Recently Played By:{" "}
                  </Typography>
                  {recentlyPlayedBy.length === 0 ? (
                    <Typography
                      className={classnames.element("playerInfoTypeEmpty")}
                      variant="body1"
                    >
                      n/a
                    </Typography>
                  ) : (
                    recentlyPlayedBy.map(id => getUserAvatar(id, userDetails))
                  )}
                </div>
              </div>
              <div className={classnames.element("categoriesContainer")}>
                <Typography variant="body2">
                  <span className={classnames.element("categoryTitle")}>
                    Genres:{" "}
                  </span>
                  {game.genres.join(", ")}
                </Typography>
                <Typography variant="body2">
                  <span className={classnames.element("categoryTitle")}>
                    Tags:{" "}
                  </span>
                  {game.tags.join(", ")}
                </Typography>
              </div>
            </div>
          </Paper>
        </a>
      </Link>
      <div className={classnames.element("priceContainer")}>
        <div
          className={classnames.element("discountPercent", {
            hidden: !game.onSale
          })}
        >
          <Typography variant="h2">-{game.discount}%</Typography>
        </div>
        <div className={classnames.element("prices")}>
          <div
            className={classnames.element("initialPrice", {
              hidden: !game.onSale
            })}
          >
            <Typography color="inherit" variant="body2">
              {formatCurrency(game.initialPrice)}
            </Typography>
          </div>
          <div className={classnames.element("finalPrice")}>
            <Typography variant={game.onSale ? "body2" : "h2"}>
              {game.freeToPlay
                ? "Free to Play"
                : formatCurrency(game.finalPrice)}
            </Typography>
          </div>
        </div>
      </div>
    </Grid>
  );
};
Item.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}Item`);
Item.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    gamePageLink: PropTypes.string,
    paper: PropTypes.string,
    titleBar: PropTypes.string,
    titleBarHidden: PropTypes.string,
    gameTitle: PropTypes.string,
    gameImage: PropTypes.string,
    paperOverlayContainer: PropTypes.string,
    paperOverlayContainerHidden: PropTypes.string,
    userReviewContainer: PropTypes.string,
    userReviewIcon: PropTypes.string,
    userReviewIconNegative: PropTypes.string,
    playerContainer: PropTypes.string,
    avatar: PropTypes.string,
    playerInfo: PropTypes.string,
    playerInfoType: PropTypes.string,
    playerInfoTypeEmpty: PropTypes.string,
    categoriesContainer: PropTypes.string,
    categoryTitle: PropTypes.string,
    priceContainer: PropTypes.string,
    discountPercent: PropTypes.string,
    discountPercentHidden: PropTypes.string,
    prices: PropTypes.string,
    initialPrice: PropTypes.string,
    initialPriceHidden: PropTypes.string,
    finalPrice: PropTypes.string
  }),
  // the data to render in the Item
  data: PropTypes.shape({
    game: PropTypes.shape({
      appid: PropTypes.string,
      name: PropTypes.string,
      userRating: PropTypes.number,
      developers: PropTypes.array,
      publishers: PropTypes.array,
      genres: PropTypes.array,
      tags: PropTypes.array,
      onSale: PropTypes.bool,
      freeToPlay: PropTypes.bool,
      discount: PropTypes.number,
      initialPrice: PropTypes.number,
      finalPrice: PropTypes.number
    })
  }).isRequired,
  // profile info for the users
  userDetails: PropTypes.array.isRequired,
  // whether the Item is featured
  featured: PropTypes.bool
};
Item.defaultProps = {
  classes: {}
};

export default withStyles(styles)(Item);
