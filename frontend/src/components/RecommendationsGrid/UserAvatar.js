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
  const { data, classes } = props;
  const { id, profileUrl, avatarName, avatarImageUrl, onlineStatus } = data;

  /**
   * renders the content for the Avatar's Tooltip
   */
  const TooltipContent = () => (
    <React.Fragment>
      <Typography variant="body2">
        <span className={classnames.element("tooltipHeading")}>SteamID:</span>{" "}
        {id}
      </Typography>
      <Typography variant="body2">
        <span className={classnames.element("tooltipHeading")}>Status:</span>{" "}
        {onlineStatus}
      </Typography>
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
        classes={{ tooltip: classes.tooltip }}
        title={<TooltipContent />}
      >
        <div className={classnames.element("avatarContainer")}>
          <Avatar
            className={classnames.element("image")}
            src={avatarImageUrl}
            alt={avatarName}
          />
          <Typography variant="body1">{avatarName}</Typography>
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
  })
};
UserAvatar.defaultProps = {
  classes: {}
};

export default withStyles(styles)(UserAvatar);
