import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Icon from "@mdi/react";
import { mdiPlay } from "@mdi/js";

import styles from "./MediaCarousel.styles";

export const MEDIA_TYPES = {
  VIDEO: "video",
  IMG: "img"
};

/**
 * renders a media carousel with a featured item
 */
export const MediaCarousel = props => {
  const classnames = MediaCarousel.classnames(props);
  const { media } = props;

  const initialState = {
    item: media[0],
    type: media[0].title ? MEDIA_TYPES.VIDEO : MEDIA_TYPES.IMG
  };
  const [featuredItem, setFeaturedItem] = React.useState(initialState);

  // build an img or video based on the featuredItem's type
  const Feature = () => {
    const { item } = featuredItem;
    if (featuredItem.type === MEDIA_TYPES.VIDEO) {
      return (
        <video
          className={classnames.element("featuredItem")}
          playsInline={true}
          src={item.fullsizeUrl}
          poster={item.thumbnail}
          autoPlay
          preload={"none"}
          controls
          muted
        >
          {item.title}
        </video>
      );
    } else {
      const [loaded, setLoaded] = React.useState(false);

      const onLoad = () => {
        setLoaded(true);
      };
      return (
        <img
          className={classnames.element("featuredItem", {
            hidden: !loaded
          })}
          src={item.fullsizeUrl}
          alt="featured item"
          onLoad={onLoad}
        />
      );
    }
  };

  return (
    <Grid
      className={classnames.root()}
      container
      item
      xs={12}
      md={7}
      spacing={1}
    >
      <Grid
        className={classnames.element("featuredItemContainer")}
        item
        xs={12}
      >
        <div className={classnames.element("featuredItemWrapper")}>
          <img
            className={classnames.element("featuredItemSpacer")}
            src="/featuredItemSpacer.png"
          />
          <Feature />
        </div>
      </Grid>
      <Grid
        className={classnames.element("thumbnailsContainer")}
        container
        wrap="nowrap"
        item
        xs={12}
        spacing={1}
      >
        {media.map(item => (
          <Grid
            key={item.id}
            item
            className={classnames.element("setFeaturedButtonContainer")}
          >
            <Button
              className={classnames.element("setFeaturedButton")}
              onClick={() =>
                setFeaturedItem({
                  item,
                  type: item.title ? MEDIA_TYPES.VIDEO : MEDIA_TYPES.IMG
                })
              }
            >
              <img
                className={classnames.element("thumbnail")}
                src={item.thumbnailUrl}
                alt={item.id}
              />
              {item.title && (
                <div className={classnames.element("playIconContainer")}>
                  <Icon
                    className={classnames.element("playIcon")}
                    path={mdiPlay}
                  />
                </div>
              )}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
MediaCarousel.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}MediaCarousel`
);
MediaCarousel.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    featuredItemContainer: PropTypes.string,
    featuredItemSpacer: PropTypes.string,
    featuredItem: PropTypes.string,
    featuredItemHidden: PropTypes.string,
    featuredItemWrapper: PropTypes.string,
    thumbnailsContainer: PropTypes.string,
    setFeaturedButtonContainer: PropTypes.string,
    setFeaturedButton: PropTypes.string,
    thumbnail: PropTypes.string,
    playIconContainer: PropTypes.string,
    playIcon: PropTypes.string
  }),
  // details for the media to display
  media: PropTypes.array
};
MediaCarousel.defaultProps = {
  classes: {}
};

export default withStyles(styles)(MediaCarousel);
