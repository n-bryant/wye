import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import styles from "./HeroImage.styles";

/**
 * renders a hero image with a placeholder src value
 */
export const HeroImage = props => {
  const classnames = HeroImage.classnames(props);
  const {
    altText,
    imageSrc,
    placeholderPath,
    squaredBottom,
    squaredRight
  } = props;
  const [hasBrokenSrc, setHasBrokenSrc] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const onLoad = () => {
    setLoaded(true);
  };
  const onError = () => {
    setHasBrokenSrc(true);
  };

  return (
    <div className={classnames.root()}>
      <img
        className={classnames.element("image", {
          hidden: !loaded,
          squaredBottom,
          squaredRight
        })}
        onError={onError}
        onLoad={onLoad}
        src={hasBrokenSrc ? placeholderPath : imageSrc}
        alt={altText}
      />
      <div
        className={classnames.element("placeholder", {
          hidden: loaded
        })}
      ></div>
    </div>
  );
};
HeroImage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}HeroImage`
);
HeroImage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    image: PropTypes.string,
    imageSquaredBottom: PropTypes.string,
    imageSquaredRight: PropTypes.string,
    imageHidden: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderHidden: PropTypes.string
  }),
  // alt text for the image
  altText: PropTypes.string,
  // the location of the image to render
  imageSrc: PropTypes.string,
  // placeholder path if the image src is broken
  placeholderPath: PropTypes.string,
  // whether the bottom of the image should have a squared bottom
  squaredBottom: PropTypes.bool,
  // whether the bottom of the image should have a squared right
  squaredRight: PropTypes.bool
};
HeroImage.defaultProps = {
  classes: {},
  altText: "",
  imageSrc: ""
};

export default withStyles(styles)(HeroImage);
