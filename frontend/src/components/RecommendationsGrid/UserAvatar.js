import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Link from "next/link";

import Icon from "@mdi/react";
import { mdiAccountArrowRight } from "@mdi/js";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import styles from "./UserAvatar.styles";

export const PLACEHOLDER_PATH = "/steam.png";

/**
 * renders a user avatar with a label and Tooltip with user profile info
 */
export const UserAvatar = props => {
  const classnames = UserAvatar.classnames(props);
  const { data, classes, gameDetails } = props;
  const { id, profileUrl, avatarName, avatarImageUrl, onlineStatus } = data;

  /**
   * renders the content for the Avatar's Tooltip
   */
  const TooltipContent = () => (
    <React.Fragment>
      <Typography variant="body2" gutterBottom={true}>
        <span className={classnames.element("tooltipHeading")}>
          {avatarName}
        </span>
      </Typography>
      <Typography variant="body2">
        <span className={classnames.element("tooltipHeading")}>SteamID:</span>{" "}
        {id}
      </Typography>
      <Typography variant="body2" gutterBottom={true}>
        <span className={classnames.element("tooltipHeading")}>Status:</span>{" "}
        {onlineStatus}
      </Typography>
      {gameDetails && (
        <React.Fragment>
          <Typography variant="body2">
            <span className={classnames.element("tooltipHeading")}>
              Owns Game:
            </span>{" "}
            {gameDetails.ownsGame ? "Yes" : "No"}
          </Typography>
          <Typography variant="body2">
            <span className={classnames.element("tooltipHeading")}>
              Recently Played:
            </span>{" "}
            {gameDetails.recentlyPlayedGame ? "Yes" : "No"}
          </Typography>
          <Typography variant="body2">
            <span className={classnames.element("tooltipHeading")}>
              Hours Played:
            </span>{" "}
            {gameDetails.hoursPlayed}
          </Typography>
        </React.Fragment>
      )}
      <Link href={profileUrl} prefetch={false}>
        <a className={classnames.element("link")} target="_blank">
          <Icon
            className={classnames.element("icon")}
            path={mdiAccountArrowRight}
          />
          <Typography variant="body1">profile</Typography>
        </a>
      </Link>
    </React.Fragment>
  );

  return (
    <Grid className={classnames.root()} item xs={3}>
      <Tooltip
        interactive
        arrow={true}
        classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
        title={<TooltipContent />}
      >
        <div className={classnames.element("avatarContainer")}>
          <Avatar
            className={classnames.element("image")}
            src={avatarImageUrl}
            alt={avatarName}
          />
        </div>
      </Tooltip>
    </Grid>
  );
};
UserAvatar.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}UserAvatar`
);
UserAvatar.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    tooltip: PropTypes.string,
    avatarContainer: PropTypes.string,
    image: PropTypes.string,
    tooltipHeading: PropTypes.string,
    name: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.string
  }),
  // user data
  data: PropTypes.shape({
    id: PropTypes.string,
    profileUrl: PropTypes.string,
    avatarName: PropTypes.string,
    avatarImageUrl: PropTypes.string,
    onlineStatus: PropTypes.string
  }),
  // a user's ownership and playtime for a game
  gameDetails: PropTypes.shape({
    // does the user own the game
    ownsGame: PropTypes.bool,
    // has the user recently played the game
    recentlyPlayedGame: PropTypes.bool,
    // the user's playtime for the game
    hoursPlayed: PropTypes.number
  })
};
UserAvatar.defaultProps = {
  classes: {}
};

export default withStyles(styles)(UserAvatar);
