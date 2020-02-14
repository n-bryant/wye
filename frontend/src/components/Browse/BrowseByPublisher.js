import React from "react";
import PropTypes from "prop-types";

import get from "lodash.get";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { useRouter } from "next/router";

import { mdiArrowLeftBold } from "@mdi/js";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  getOffsetStart,
  getOffsetEnd,
  getTotalPages
} from "../../../lib/pagingUtilities";
import LoadingState from "../../components/LoadingState";
import ButtonWithHoverFill from "../../components/ButtonWithHoverFill";
import PaginationWidget from "../PaginationWidget";
import BackgroundProvider from "../../components/BackgroundProvider";
import QuickLink from "../../components/QuickLink";
import styles from "./BrowseByPublisher.styles";

// fetch a list of publishers
export const GET_PUBLISHERS_QUERY = gql`
  query GET_PUBLISHERS_QUERY {
    publishers
  }
`;

/**
 * renders a page with quick links to browse titles for each publisher
 */
export const BrowseByPublisher = props => {
  const classnames = BrowseByPublisher.classnames(props);
  const { width } = props;
  const router = useRouter();

  /**
   * renders the main content for the publishers list page
   */
  const MainContent = ({ classes, publishers }) => {
    // pagination values
    const perPage = 40;
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = getTotalPages(publishers.length, perPage);
    const pageStart = getOffsetStart(currentPage, publishers.length, perPage);
    const pageEnd = getOffsetEnd(currentPage, perPage);

    return (
      <React.Fragment>
        <Box my={2}>
          <ButtonWithHoverFill
            icon={mdiArrowLeftBold}
            handleClick={() => {
              router.back();
            }}
            label="back"
            displayLabel={true}
            transformText={true}
          />
        </Box>
        <Box className={classnames.element("contentContainer")} my={4}>
          <Typography
            className={classnames.element("heading")}
            variant="h2"
            gutterBottom={true}
          >
            Publishers
          </Typography>
          <Typography
            className={classnames.element("subHeading")}
            variant="body1"
            gutterBottom={true}
          >
            Browse titles by publisher
          </Typography>
        </Box>
        <Box>
          <Box my={8}>
            <Autocomplete
              classes={{
                paper: classes.paper,
                option: classes.option
              }}
              onChange={(_e, value) => {
                router.push(`/browse/publishers/${value}`);
              }}
              options={publishers}
              getOptionLabel={option => option}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Search" fullWidth />
              )}
            />
          </Box>
          {totalPages > 1 && (
            <Box
              className={classnames.element("paginationWidgetContainer")}
              my={4}
            >
              <PaginationWidget
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </Box>
          )}
          <Box my={4}>
            <Grid container spacing={2}>
              {publishers.slice(pageStart, pageEnd).map((publisher, index) => (
                <Grid
                  key={index}
                  className={classnames.element("item")}
                  item
                  xs={6}
                  sm={4}
                >
                  <QuickLink
                    label={publisher}
                    linkHref="/browse/publishers/[name]"
                    linkAs={`/browse/publishers/${publisher}`}
                    fixedDimensions={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {totalPages > 1 && (
            <Box
              className={classnames.element("paginationWidgetContainer")}
              my={4}
            >
              <PaginationWidget
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </Box>
          )}
        </Box>
      </React.Fragment>
    );
  };
  MainContent.propTypes = {
    classnames: PropTypes.object,
    // list of publisher names
    publishers: PropTypes.array
  };

  /**
   * renders a Query for retrieving a list of publishers
   */
  const PublishersQuery = props => {
    return (
      <Query query={GET_PUBLISHERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingState />;
          }

          if (error) {
            console.log(error);
            return <div>oops</div>;
          }

          const publishers = get(data, "publishers", []);

          return <MainContent publishers={publishers} {...props} />;
        }}
      </Query>
    );
  };

  return (
    <BackgroundProvider>
      <div
        className={classnames.root({
          sm: width === "sm"
        })}
      >
        <Container
          className={classnames.element("container")}
          maxWidth="lg"
          disableGutters
        >
          <Container className={classnames.element("main")} maxWidth={false}>
            <PublishersQuery {...props} />
          </Container>
        </Container>
      </div>
    </BackgroundProvider>
  );
};
BrowseByPublisher.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}BrowseByPublisher`
);
BrowseByPublisher.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  }),
  // material-ui width value
  width: PropTypes.string
};
BrowseByPublisher.defaultProps = {
  classes: {}
};

// apply styles
export default withWidth()(withStyles(styles)(BrowseByPublisher));
