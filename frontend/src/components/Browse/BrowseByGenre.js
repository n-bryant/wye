import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core/";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import QuickLink from "../QuickLink";
import LoadingState from "../LoadingState";
import styles from "./BrowseByGenre.styles";

export const GENRES_QUERY = gql`
  query GENRES_QUERY {
    genres
  }
`;

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
    root: PropTypes.string,
    title: PropTypes.string
  }),
  // list of genre names to generate quick links for
  genres: PropTypes.arrayOf(PropTypes.string)
};
BrowseByGenre.defaultProps = {
  classes: {}
};

// apply styles
export const StyledBrowseByGenre = withWidth()(
  withStyles(styles)(BrowseByGenre)
);

/**
 * renders a Query to fetch genre options
 */
const GenresQuery = props => {
  return (
    <Query query={GENRES_QUERY}>
      {({ loading, data, error }) => {
        if (loading) {
          return <LoadingState />;
        }

        if (error) {
          console.log(error);
          return <div>oops</div>;
        }

        const genres = get(data, "genres");

        return <StyledBrowseByGenre genres={genres} {...props} />;
      }}
    </Query>
  );
};

export default GenresQuery;
