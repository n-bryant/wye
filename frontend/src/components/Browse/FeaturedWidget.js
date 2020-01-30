import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Link from "next/link";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "./FeaturedWidget.styles";

/**
 * renders a featured widget container with title, subtitle, action button and any content passed to it
 */
export const FeaturedWidget = props => {
  const classnames = FeaturedWidget.classnames(props);
  const { title, subTitle, seeMorePath } = props;

  return (
    <Container
      className={classnames.element("root")}
      disableGutters={true}
      maxWidth={false}
    >
      <Typography
        className={classnames.element("heading")}
        variant="h2"
        gutterBottom={true}
      >
        {title}
      </Typography>
      <Typography
        className={classnames.element("subHeading")}
        variant="body1"
        gutterBottom={true}
      >
        {subTitle}
      </Typography>
      <Container
        className={classnames.element("content")}
        disableGutters={true}
      >
        {props.children}
      </Container>
      {seeMorePath && (
        <Container
          className={classnames.element("seeMoreButtonContainer")}
          disableGutters={true}
        >
          <Link href={seeMorePath}>
            <a>
              <Button>
                <Typography variant="body2">See more...</Typography>
              </Button>
            </a>
          </Link>
        </Container>
      )}
    </Container>
  );
};
FeaturedWidget.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}FeaturedWidget`
);
FeaturedWidget.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    content: PropTypes.string,
    seeMoreButtonContainer: PropTypes.string
  }),
  // the title of the widget
  title: PropTypes.string.isRequired,
  // the sub-heading for the widget
  subTitle: PropTypes.string.isRequired,
  // link to a filtered browse page based on type of featured category
  seeMorePath: PropTypes.string
};
FeaturedWidget.defaultProps = {
  classes: {}
};

export default withStyles(styles)(FeaturedWidget);
