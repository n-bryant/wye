import React, { useState } from "react";
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
  const { gameId, imageSrc } = props;
  const [hasBrokenSrc, setHasBrokenSrc] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
          hidden: !loaded
        })}
        src={hasBrokenSrc ? "/steamHeroPlaceholder.jpg" : imageSrc}
        alt={`Steam hero image for Game with ID: ${gameId}`}
        title={`Steam hero image for Game with ID: ${gameId}`}
        onError={onError}
        onLoad={onLoad}
      />
      <img
        className={classnames.element("placeholder", {
          hidden: loaded
        })}
        src="/steamHeroPlaceholder.jpg"
        alt={`Steam hero image for Game with ID: ${gameId}`}
        title={`Steam hero image for Game with ID: ${gameId}`}
      />
    </div>
  );
};
HeroImage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}HeroImage`
);
HeroImage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // game id the image belongs to
  gameId: PropTypes.string,
  // the location of the image to render
  imageSrc: PropTypes.string
};
HeroImage.defaultProps = {
  classes: {},
  gameId: "",
  imageSrc: ""
};

export default withStyles(styles)(HeroImage);
