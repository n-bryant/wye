import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withWidth } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import BackgroundProvider from "../../src/components/BackgroundProvider";
import styles from "./index.styles";

/**
 * renders the Browse page
 */
export const BrowsePage = props => {
  const classnames = BrowsePage.classnames(props);

  //                              top right of page ->     advanced search
  // Heading - Browse Multiplayer Games
  // Subheading - Browse the most popular and discounted multiplayer games

  // trending - most popular by recent playtime
  // - Cards: Contain appropriate capsule image, name, and price details
  //    - on hover: shows name, user rating, dev/pub info and
  // capsuleLg - 1:4

  // publishers - games by most popular publishers
  // - Cards: 2 pages of 4 cards; page paddles and page pills
  //  - Header image linking to most popular title by publisher
  //  - Publisher name linking to /publisher/[name]

  // big sales - top 4 - rated by discount and user rating
  // - Cards: 2 pages of 3 cards; page paddles and page pills
  //  - libraryCapsule image on top
  //  - name / sale details on bottom
  //  - on hover: - name, user rating, user details if available (wanted by)

  // buttons to go to filter for under $5 / $10

  // Browse by Genre
  // - grid of genre buttons

  return (
    <BackgroundProvider>
      <div className={classnames.root()}>
        <Container
          className={classnames.element("container")}
          maxWidth="lg"
          disableGutters
        >
          <Container className={classnames.element("main")} maxWidth={false}>
            <Typography className={classnames.element("heading")} variant="h1">
              Featured Games
            </Typography>
            <Typography
              className={classnames.element("subHeading")}
              variant="h2"
            >
              Browse the most popular and discounted multiplayer games
            </Typography>
          </Container>
        </Container>
      </div>
    </BackgroundProvider>
  );
};
BrowsePage.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BrowsePage`
);
BrowsePage.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    container: PropTypes.string,
    main: PropTypes.string,
    heading: PropTypes.string,
    subHeading: PropTypes.string
  })
};
BrowsePage.defaultProps = {
  classes: {}
};

export default withWidth()(withStyles(styles)(BrowsePage));
