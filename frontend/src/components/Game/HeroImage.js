import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import styles from "./HeroImage.styles";

export const PLACEHOLDER_PATH = "/steamHeroPlaceholder.jpg";

/**
 * renders a hero image with a placeholder src value
 */
export const HeroImage = props => {
  const classnames = HeroImage.classnames(props);
  const { altText, imageSrc } = props;
  const [hasBrokenSrc, setHasBrokenSrc] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const onLoad = () => {
    setLoaded(true);
  };
  const onError = () => {
    setHasBrokenSrc(true);
  };

  return (
    <React.Fragment>
      <img
        className={classnames.element("image", {
          hidden: !loaded
        })}
        onError={onError}
        onLoad={onLoad}
        src={hasBrokenSrc ? PLACEHOLDER_PATH : imageSrc}
        alt={altText}
      />
      <img
        className={classnames.element("placeholder", {
          hidden: loaded
        })}
        src={PLACEHOLDER_PATH}
        alt={altText}
      />
    </React.Fragment>
  );
};
HeroImage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}HeroImage`
);
HeroImage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    image: PropTypes.string,
    imageHidden: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderHidden: PropTypes.string
  }),
  // alt text for the image
  altText: PropTypes.string,
  // the location of the image to render
  imageSrc: PropTypes.string
};
HeroImage.defaultProps = {
  classes: {},
  altText: "",
  imageSrc: ""
};

export default withStyles(styles)(HeroImage);
