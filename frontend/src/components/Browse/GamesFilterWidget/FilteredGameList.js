import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import {
  getOffsetStart,
  getOffsetEnd,
  getTotalPages
} from "../../../../lib/pagingUtilities";
import BrowseCard from "../BrowseCard";
import PaginationWidget from "../../PaginationWidget";
import styles from "./FilteredGameList.styles";

/**
 * renders a list BrowseCards to represent the provided list of filtered game items
 */
export const FilteredGameList = props => {
  const classnames = FilteredGameList.classnames(props);
  const { items, userDetails } = props;

  // pagination values
  const perPage = 20;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = getTotalPages(items.length, perPage);
  const pageStart = getOffsetStart(currentPage, items.length, perPage);
  const pageEnd = getOffsetEnd(currentPage, perPage);

  return (
    <Container
      className={classnames.element("root")}
      maxWidth="lg"
      disableGutters={true}
    >
      <Box my={4}>
        {totalPages > 1 && (
          <Box my={4}>
            <PaginationWidget
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </Box>
        )}
        <Grid container justify="center" spacing={6}>
          {items.slice(pageStart, pageEnd).map(item => (
            <Grid
              key={item.node.game.appid}
              item
              xs={12}
              md={6}
              className={classnames.element("item")}
            >
              <BrowseCard
                data={item.node.game}
                playtimeAndOwnershipData={{
                  ownedBy: item.node.ownedBy,
                  recentlyPlayedBy: item.node.recentlyPlayedBy,
                  playtime: item.node.playtime
                }}
                userDetails={userDetails}
                withPrice={true}
                variant="horizontal"
              />
            </Grid>
          ))}
        </Grid>
        {totalPages > 1 && (
          <Box my={4}>
            <PaginationWidget
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};
FilteredGameList.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}FilteredGameList`
);
FilteredGameList.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    item: PropTypes.string
  }),
  // the items to render in the list
  items: PropTypes.array,
  // details for users associated with the items
  userDetails: PropTypes.array
};
FilteredGameList.defaultProps = {
  classes: {}
};

// apply styles
export const StyledFilteredGameList = withStyles(styles)(FilteredGameList);

export default StyledFilteredGameList;
