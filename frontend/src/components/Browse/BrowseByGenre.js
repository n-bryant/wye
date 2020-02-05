import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import QuickLink from "../QuickLink";
import styles from "./BrowseByGenre.styles";

/**
 * renders a Button wrapped with a Link that serves as a Quick Link
 */
export const BrowseByGenre = props => {
  const classnames = BrowseByGenre.classnames(props);
  const { genres } = props;

  return (
    <Box my={8} className={classnames.root()}>
      <Typography variant="h2" className={classnames.element("title")}>
        Browse By Genre
      </Typography>
      <Grid container spacing={1}>
        {genres.map((genre, index) => (
          <Grid key={index} item xs={6}>
            <QuickLink
              label={genre === "Massively Multiplayer" ? "MMO" : genre}
              linkHref="/browse/genres/[name]"
              linkAs={`/browse/genres/${genre}`}
              fixedDimensions={true}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
BrowseByGenre.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BrowseByGenre`
);
BrowseByGenre.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // list of genre names to generate quick links for
  genres: PropTypes.arrayOf(PropTypes.string)
};
BrowseByGenre.defaultProps = {
  classes: {}
};

// apply styles
export const StyledBrowseByGenre = withStyles(styles)(BrowseByGenre);

export default StyledBrowseByGenre;
