import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import styles from "./RequirementsBlock.styles";

/**
 * renders an info block for a game's system requirements
 */
export const RequirementsBlock = props => {
  const classnames = RequirementsBlock.classnames(props);
  const {
    requirements: { minimum, recommended }
  } = props;

  // the requirements are provided as html strings
  const createMarkup = content => {
    return {
      __html: content
    };
  };

  return (
    <div className={classnames.root()}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom={true}>
            System Requirements:
          </Typography>
        </Grid>
        {minimum && (
          <Grid item xs={12} md={recommended ? 6 : 12}>
            <div
              className={classnames.element("infoContainer")}
              dangerouslySetInnerHTML={createMarkup(minimum)}
            />
          </Grid>
        )}
        {recommended && (
          <Grid item xs={12} md={minimum ? 6 : 12}>
            <div
              className={classnames.element("infoContainer")}
              dangerouslySetInnerHTML={createMarkup(recommended)}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};
RequirementsBlock.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}RequirementsBlock`
);
RequirementsBlock.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // requirements information
  requirements: PropTypes.shape({
    minimum: PropTypes.string,
    recommended: PropTypes.string
  }).isRequired
};
RequirementsBlock.defaultProps = {
  classes: {}
};

export default withStyles(styles)(RequirementsBlock);
