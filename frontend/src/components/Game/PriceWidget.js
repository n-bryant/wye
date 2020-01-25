import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Typography from "@material-ui/core/Typography";

import styles from "./PriceWidget.styles";

/**
 * renders a widget containing price details
 */
export class PriceWidget extends React.Component {
  constructor(props) {
    super(props);
    this.classnames = PriceWidget.classnames(props);
  }

  /**
   * renders the appropriate price block based on whether
   * a game is free or on sale
   */
  getPrice() {
    const { data, skinny } = this.props;
    if (data.freeToPlay) {
      return (
        <Typography
          className={this.classnames.element("priceFree")}
          variant="h2"
        >
          Free to Play
        </Typography>
      );
    } else if (data.onSale) {
      return (
        <div
          className={this.classnames.element("priceDetailsContainer", {
            withDiscount: true
          })}
        >
          <Typography
            className={this.classnames.element("discountPercent", {
              skinny
            })}
            variant="h1"
          >
            -{data.discountPercentage}%
          </Typography>
          <div className={this.classnames.element("priceDetails")}>
            <Typography
              className={this.classnames.element("initialPrice")}
              variant="body2"
            >
              {data.initialFormatted}
            </Typography>
            <Typography variant="body1">{data.finalFormatted}</Typography>
          </div>
        </div>
      );
    } else {
      return (
        <div className={this.classnames.element("priceDetailsContainer")}>
          <Typography
            className={this.classnames.element("finalPrice")}
            variant="body1"
          >
            {data.finalFormatted}
          </Typography>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={this.classnames.root()}>
        <div className={this.classnames.element("priceContainer")}>
          {this.getPrice()}
        </div>
      </div>
    );
  }
}
PriceWidget.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}PriceWidget`
);
PriceWidget.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    priceContainer: PropTypes.string,
    priceContainerWithSmScreen: PropTypes.string,
    priceDetailsContainer: PropTypes.string,
    priceDetailsContainerWithDiscount: PropTypes.string,
    discountPercent: PropTypes.string,
    discountPercentSkinny: PropTypes.string,
    initialPrice: PropTypes.string,
    finalPrice: PropTypes.string,
    priceDetails: PropTypes.string,
    priceFree: PropTypes.string
  }),
  // price data
  data: PropTypes.shape({
    freeToPlay: PropTypes.bool,
    onSale: PropTypes.bool,
    discountPercentage: PropTypes.number,
    initialFormatted: PropTypes.string,
    finalFormatted: PropTypes.string
  }).isRequired,
  // determines if the widget has 'skinny' styling or not
  skinny: PropTypes.bool
};
PriceWidget.defaultProps = {
  classes: {},
  skinny: false
};

export default withStyles(styles)(PriceWidget);
