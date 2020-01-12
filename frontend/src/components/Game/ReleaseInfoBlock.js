import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Link from "next/link";

import Icon from "@mdi/react";
import {
  mdiWindows,
  mdiApple,
  mdiLinux,
  mdiSteam,
  mdiGoogleController,
  mdiGoogleControllerOff
} from "@mdi/js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./ReleaseInfoBlock.styles";

export const PLATFORM_MAP = {
  windows: mdiWindows,
  mac: mdiApple,
  linux: mdiLinux,
  default: mdiSteam
};

/**
 * renders an info block for a game containing release details
 */
export const ReleaseInfoBlock = props => {
  const classnames = ReleaseInfoBlock.classnames(props);
  const { mdWidth, data, width } = props;

  // the short description is provided as an html string
  const createMarkup = () => {
    return { __html: data.shortDescription };
  };

  // renders a header image for the info block
  const HeaderImg = () => {
    const [loaded, setLoaded] = React.useState(false);

    const onLoad = () => {
      setLoaded(true);
    };

    return (
      <div className={classnames.element("headerImgContainer")}>
        <img
          className={classnames.element("headerImg", {
            hidden: !loaded
          })}
          src={data.headerImageUrl}
          alt={data.name}
          onLoad={onLoad}
        />
      </div>
    );
  };

  return (
    <Grid
      className={classnames.root({
        withAdjustedPadding: ["xs", "sm"].some(val => val === width)
      })}
      container
      item
      xs={12}
      md={mdWidth}
      spacing={1}
    >
      <Grid item xs={12}>
        <HeaderImg />
      </Grid>
      <Grid container item xs={12}>
        <div dangerouslySetInnerHTML={createMarkup()} />
        <div className={classnames.element("infoContainer")}>
          <Typography variant="body2">
            <span className={classnames.element("infoType")}>
              Release Date:{" "}
            </span>
            {data.releaseDate}
          </Typography>
          <Typography variant="body2">
            <span className={classnames.element("infoType")}>Publishers: </span>
            {data.publishers.join(", ")}
          </Typography>
          <Typography variant="body2">
            <span className={classnames.element("infoType")}>Developers: </span>
            {data.developers.join(", ")}
          </Typography>
          <Typography
            className={classnames.element("iconContainer")}
            variant="body2"
          >
            <span className={classnames.element("infoType")}>Platforms: </span>
            {data.platforms.map((platform, index) => (
              <Tooltip key={index} title={platform}>
                <Icon
                  className={classnames.element("icon")}
                  path={
                    PLATFORM_MAP[platform]
                      ? PLATFORM_MAP[platform]
                      : PLATFORM_MAP.default
                  }
                />
              </Tooltip>
            ))}
          </Typography>
          <Typography
            className={classnames.element("iconContainer")}
            variant="body2"
          >
            <span className={classnames.element("infoType")}>
              Controller Support:{" "}
            </span>
            <Tooltip title={data.controllerSupport.toString()}>
              <Icon
                className={classnames.element("icon")}
                path={
                  data.controllerSupport
                    ? mdiGoogleController
                    : mdiGoogleControllerOff
                }
              />
            </Tooltip>
          </Typography>
          <Typography variant="body2">
            <span className={classnames.element("infoType")}>Website: </span>
            <Link href={data.website} prefetch={false}>
              <a className={classnames.element("link")} target="_blank">
                {data.website}
              </a>
            </Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};
ReleaseInfoBlock.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}ReleaseInfoBlock`
);
ReleaseInfoBlock.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    withAdjustedPadding: PropTypes.string,
    headerImgContainer: PropTypes.string,
    headerImg: PropTypes.string,
    headerImgHidden: PropTypes.string,
    infoContainer: PropTypes.string,
    infoType: PropTypes.string,
    iconContainer: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.string
  }),
  // the allowed grid width at md+ screen sizes
  mdWidth: PropTypes.number,
  // data for the game
  data: PropTypes.shape({
    name: PropTypes.string,
    headerImageUrl: PropTypes.string,
    shortDescription: PropTypes.string,
    platforms: PropTypes.array,
    controllerSupport: PropTypes.bool,
    developers: PropTypes.array,
    publishers: PropTypes.array,
    releaseDate: PropTypes.string,
    website: PropTypes.string
  }),
  // width from material-ui breakpoints
  width: PropTypes.string
};
ReleaseInfoBlock.defaultProps = {
  classes: {},
  mdWidth: 5
};

export default withWidth()(withStyles(styles)(ReleaseInfoBlock));
