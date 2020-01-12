import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import { useRouter } from "next/router";

import Icon from "@mdi/react";
import { mdiPlusMinus } from "@mdi/js";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import styles from "./PriceInfoBlock.styles";

/**
 * renders an info block for a game's price and review details
 */
export const PriceInfoBlock = props => {
  const classnames = PriceInfoBlock.classnames(props);
  const {
    data: { price, metacritic },
    width
  } = props;
  const router = useRouter();

  const getPrice = () => {
    if (price.freeToPlay) {
      return (
        <Typography className={classnames.element("priceFree")} variant="h2">
          Free to Play
        </Typography>
      );
    } else if (price.onSale) {
      return (
        <div
          className={classnames.element("priceDetailsContainer", {
            withDiscount: true
          })}
        >
          <Typography
            className={classnames.element("discountPercent")}
            variant="h1"
          >
            -{price.discountPercentage}%
          </Typography>
          <div className={classnames.element("priceDetails")}>
            <Typography
              className={classnames.element("initialPrice")}
              variant="body2"
            >
              {price.initialFormatted}
            </Typography>
            <Typography variant="body1">{price.finalFormatted}</Typography>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classnames.element("priceDetailsContainer")}>
          <Typography variant="body1">Price:</Typography>
          <Typography
            className={classnames.element("finalPrice")}
            variant="body1"
          >
            {price.finalFormatted}
          </Typography>
        </div>
      );
    }
  };

  const hasSmScreen = ["xs", "sm"].some(val => val === width);

  return (
    <div
      className={classnames.root({
        withSmScreen: hasSmScreen
      })}
    >
      <div
        className={classnames.element("priceContainer", {
          withSmScreen: hasSmScreen
        })}
      >
        {getPrice()}
        <a
          className={classnames.element("link")}
          href={`https://store.steampowered.com/app/${router.query.id}`}
          target="_blank"
        >
          <Button className={classnames.element("storeButton")}>
            <Typography variant="body1">Visit Store Page</Typography>
          </Button>
        </a>
      </div>
      <div
        className={classnames.element("metacriticContainer", {
          withSmScreen: hasSmScreen
        })}
      >
        <div className={classnames.element("metacriticTitle")}>
          <Icon className={classnames.element("icon")} path={mdiPlusMinus} />
          <Typography variant="h1">Metacritic Score: </Typography>
        </div>
        <div>
          <Typography
            className={classnames.element("metacriticScore", {
              negative: metacritic.score < 50
            })}
            variant="body1"
          >
            {metacritic.score > 0 ? (
              <a
                className={classnames.element("link")}
                href={metacritic.reviewsPageUrl}
                target="_blank"
              >
                {`${metacritic.score}%`}
              </a>
            ) : (
              "n/a"
            )}
          </Typography>
        </div>
      </div>
    </div>
  );
};
PriceInfoBlock.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}PriceInfoBlock`
);
PriceInfoBlock.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    withSmScreen: PropTypes.string,
    priceContainer: PropTypes.string,
    priceContainerWithSmScreen: PropTypes.string,
    priceDetailsContainer: PropTypes.string,
    priceDetailsContainerWithDiscount: PropTypes.string,
    discountPercent: PropTypes.string,
    initialPrice: PropTypes.string,
    finalPrice: PropTypes.string,
    priceDetails: PropTypes.string,
    priceFree: PropTypes.string,
    storeButton: PropTypes.string,
    link: PropTypes.string,
    metacriticContainer: PropTypes.string,
    metacriticContainerWithSmScreen: PropTypes.string,
    metacriticTitle: PropTypes.string,
    metacriticScore: PropTypes.string,
    metacriticScoreNegative: PropTypes.string,
    icon: PropTypes.string
  }),
  // data for the game relating to price and reviews
  data: PropTypes.shape({
    price: PropTypes.shape({
      freeToPlay: PropTypes.bool,
      onSale: PropTypes.bool,
      discountPercentage: PropTypes.number,
      initialFormatted: PropTypes.string,
      finalFormatted: PropTypes.string
    }),
    metacritic: PropTypes.shape({
      score: PropTypes.number,
      reviewsPageUrl: PropTypes.string
    })
  }),
  // material-ui breakpoint width
  width: PropTypes.string
};
PriceInfoBlock.defaultProps = {
  classes: {}
};

export default withWidth()(withStyles(styles)(PriceInfoBlock));
