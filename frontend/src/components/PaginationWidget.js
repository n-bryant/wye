import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";

import Icon from "@mdi/react";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiPageFirst,
  mdiPageLast
} from "@mdi/js";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "./PaginationWidget.styles";

/**
 * renders a pagination widget with prev/next buttons and an first/last page buttons
 */
export const PaginationWidget = props => {
  const classnames = PaginationWidget.classnames(props);
  const { currentPage, setCurrentPage, totalPages } = props;

  // paddle disabled logic
  const prevPaddleDisabled = currentPage === 1;
  const nextPaddleDisabled = currentPage === totalPages;

  return (
    <div className={classnames.root()}>
      {totalPages > 2 && (
        <Button
          className={classnames.element("paddle")}
          disabled={prevPaddleDisabled}
          onClick={() => setCurrentPage(1)}
        >
          <Icon
            className={classnames.element("paddleIcon", {
              disabled: prevPaddleDisabled
            })}
            path={mdiPageFirst}
          />
        </Button>
      )}
      <Button
        className={classnames.element("paddle")}
        disabled={prevPaddleDisabled}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <Icon
          className={classnames.element("paddleIcon", {
            disabled: prevPaddleDisabled
          })}
          path={mdiChevronLeft}
        />
      </Button>
      <Typography variant="body2">{`${currentPage} of ${totalPages}`}</Typography>
      <Button
        className={classnames.element("paddle")}
        disabled={nextPaddleDisabled}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <Icon
          className={classnames.element("paddleIcon", {
            disabled: nextPaddleDisabled
          })}
          path={mdiChevronRight}
        />
      </Button>
      {totalPages > 2 && (
        <Button
          className={classnames.element("paddle")}
          disabled={nextPaddleDisabled}
          onClick={() => setCurrentPage(totalPages)}
        >
          <Icon
            className={classnames.element("paddleIcon", {
              disabled: nextPaddleDisabled
            })}
            path={mdiPageLast}
          />
        </Button>
      )}
    </div>
  );
};
PaginationWidget.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}PaginationWidget`
);
PaginationWidget.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    paddlesWrapper: PropTypes.string,
    paddle: PropTypes.string,
    paddleIcon: PropTypes.string,
    paddleIconDisabled: PropTypes.string,
    pageIndicator: PropTypes.string,
    pagingValuesContainer: PropTypes.string,
    goToPageInput: PropTypes.string
  }),
  // the current page number
  currentPage: PropTypes.number,
  // handler to set the current page
  setCurrentPage: PropTypes.func,
  // the count of total pages
  totalPages: PropTypes.number
};
PaginationWidget.defaultProps = {
  classes: {},
  currentPage: 1,
  setCurrentPage: () => {}
};

export default withStyles(styles)(PaginationWidget);
