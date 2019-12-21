import React, { useState } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import styles from "./LogoImage.styles";

/**
 * renders a hero image with a placeholder src value
 */
export const LogoImage = props => {
  const classnames = LogoImage.classnames(props);
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
      {!hasBrokenSrc && (
        <img
          className={classnames.element("image", {
            hidden: !loaded
          })}
          src={imageSrc}
          alt={`Steam hero image for Game with ID: ${gameId}`}
          title={`Steam hero image for Game with ID: ${gameId}`}
          onError={onError}
          onLoad={onLoad}
        />
      )}
    </div>
  );
};
LogoImage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}LogoImage`
);
LogoImage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // game id the image belongs to
  gameId: PropTypes.string,
  // the location of the image to render
  imageSrc: PropTypes.string
};
LogoImage.defaultProps = {
  classes: {},
  gameId: "",
  imageSrc: ""
};

export default withStyles(styles)(LogoImage);
