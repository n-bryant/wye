import React from "react";
import PropTypes from "prop-types";

import uniq from "lodash.uniq";
import wait from "waait";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import { Formik, Form, Field } from "formik";
import { mdiClose } from "@mdi/js";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import formatCurrency from "../../../lib/formatCurrency";
import ActionButton from "../ActionButton";
import ButtonWithHoverFill from "../ButtonWithHoverFill";
import UsersField from "../RecommendationsForm/UsersField";
import CheckboxFilterField from "../RecommendationsForm/CheckboxFilterField";
import BooleanFilterField from "../RecommendationsForm/BooleanFilterField";
import SliderFilterField from "../RecommendationsForm/SliderFilterField";
import { GamesFilterWidgetContextConsumer } from "./GamesFilterWidget/";
import OnClickOutsideWrapper from "../OnClickOutsideWrapper";
import styles from "./AdvancedFiltersForm.styles";

// available sort options
export const SORT_BY_OPTIONS = {
  NAME: "Name",
  FREE_TO_PLAY: "Free to Play",
  ON_SALE: "On Sale",
  DISCOUNT: "Discount Percentage",
  FINAL_PRICE: "Price",
  USER_RATING: "User Rating",
  OWNED_BY: "Owned By Count - Entered Users",
  RECENTLY_PLAYED_BY: "Recently Played Count - Entered Users",
  HOURS_PLAYED: "Hours Played - Entered Users",
  PLAYTIME_RECENT: "Recent Playtime - Global",
  PLAYTIME_FOREVER: "Total Playtime - Global",
  OWNER_COUNT_MIN: "Owner Count Minimum - Global",
  OWNER_COUNT_MAX: "Owner Count Maximum - Global"
};

// available sort direction options
export const SORT_DIRECTION_OPTIONS = ["ASC", "DESC"];

// 'publishers' to exclude
const EXCLUDED_PUBLISHER_KEYS = [
  "Inc.",
  "Inc",
  "LLC",
  "Lttd.",
  "(none)",
  "LTD.",
  "a.s.",
  "-",
  "LTD",
  "none"
];

/**
 * returns a sorted list of unique options associated with a game list category
 * @param {Array} games
 * @param {String} category
 *  @returns {Array}
 */
export const getCategoryOptions = (games, category) => {
  // aggregate list of category types
  let items = [];
  for (const game of games) {
    items = items.concat(game[category].map(item => item.trim()));
  }

  // filter for unique and valid values, then sort alphabetically
  return uniq(
    items
      .filter(item => {
        let valid = true;
        // empty string or an excluded key
        if (
          item.length < 1 ||
          ((category === "publishers" || category === "developers") &&
            EXCLUDED_PUBLISHER_KEYS.some(
              key => item.toUpperCase() === key.toUpperCase()
            ))
        ) {
          valid = false;
        }

        return valid;
      })
      .sort(function(a, b) {
        if (a.toUpperCase() < b.toUpperCase()) {
          return -1;
        }

        if (a.toUpperCase() > b.toUpperCase()) {
          return 1;
        }

        return 0;
      })
  );
};

/**
 * returns the min value in the games list for the given property key
 * @param {Array} games
 * @param {String} key
 * @returns {Number}
 */
export const getMinValue = (games, key) => {
  const values = games.map(game => game[key]);
  return Math.min(...values);
};

/**
 * returns the max value in the games list for the given property key
 * @param {Array} games
 * @param {String} key
 * @returns {Number}
 */
export const getMaxValue = (games, key) => {
  const values = games.map(game => game[key]);
  return Math.max(...values);
};

/**
 * renders a Drawer containing a Form for selecting advanced game filtering options
 */
export const AdvancedFiltersForm = props => {
  const classnames = AdvancedFiltersForm.classnames(props);
  const {
    classes,
    drawerCloseHandler,
    formik,
    developerOptions,
    publisherOptions,
    genreOptions,
    tagOptions,
    gameList
  } = props;
  const [sortBy, setSortBy] = React.useState("USER_RATING");
  const [sortDirection, setSortDirection] = React.useState("DESC");
  const [closing, setClosing] = React.useState(false);

  // close drawer
  const handleClose = () => {
    drawerCloseHandler();
  };

  // handler for changes to the sort by field
  const handleSortByChange = event => {
    setSortBy(event.target.value);
    formik.setFieldValue("orderBy", [event.target.value]);
  };

  // handler for changes to the sort direction field
  const handleSortOrderChange = event => {
    setSortDirection(event.target.value);
    formik.setFieldValue("sortOrder", event.target.value);
  };

  // set closing and a small timeout to allow closing animation to play
  const handleClickOutside = async () => {
    setClosing(true);
    await wait(250);
    handleClose();
  };

  return (
    <OnClickOutsideWrapper handleClickOutside={handleClickOutside} {...props}>
      <Container
        className={classnames.root({
          closing
        })}
        disableGutters={true}
      >
        <Box className={classnames.element("closeButtonContainer")}>
          <ButtonWithHoverFill
            handleClick={handleClose}
            icon={mdiClose}
            label="Close"
            displayLabel={false}
          />
        </Box>
        <Box className={classnames.element("fieldsContainer")}>
          <Form onSubmit={formik.handleSubmit}>
            <Typography
              className={classnames.element("fieldSectionTitle")}
              variant="body1"
            >
              Users:
            </Typography>
            <Field name="users">
              {({ field }) => (
                <UsersField {...field} setFieldValue={formik.setFieldValue} />
              )}
            </Field>
            {formik.values.users && formik.values.users.length > 0 && (
              <Box className={classnames.element("fieldSection")} my={4}>
                <Typography
                  className={classnames.element("fieldSectionTitle")}
                  variant="body1"
                >
                  Player Filters:
                </Typography>
                <Box my={2}>
                  <Field name="filters">
                    {({ field }) => (
                      <CheckboxFilterField
                        {...field}
                        label="Owned By -"
                        type="ownedBy"
                        category="playerFilters"
                        setFieldValue={formik.setFieldValue}
                        options={formik.values.users}
                      />
                    )}
                  </Field>
                </Box>
                <Box my={2}>
                  <Field name="filters">
                    {({ field }) => (
                      <CheckboxFilterField
                        {...field}
                        label="Recently Played By -"
                        type="recentlyPlayedBy"
                        category="playerFilters"
                        setFieldValue={formik.setFieldValue}
                        options={formik.values.users}
                      />
                    )}
                  </Field>
                </Box>
              </Box>
            )}
            <Box className={classnames.element("fieldSection")} my={4}>
              <Typography
                className={classnames.element("fieldSectionTitle")}
                variant="body1"
              >
                Game Filters:
              </Typography>
              <Box my={2}>
                <Field name="filters">
                  {({ field }) => (
                    <CheckboxFilterField
                      {...field}
                      label="Publishers -"
                      type="publishers_in"
                      category="gameFilters"
                      setFieldValue={formik.setFieldValue}
                      options={publisherOptions}
                    />
                  )}
                </Field>
              </Box>
              <Box my={2}>
                <Field name="filters">
                  {({ field }) => (
                    <CheckboxFilterField
                      {...field}
                      label="Developers -"
                      type="developers_in"
                      category="gameFilters"
                      setFieldValue={formik.setFieldValue}
                      options={developerOptions}
                    />
                  )}
                </Field>
              </Box>
              <Box my={2}>
                <Field name="filters">
                  {({ field }) => (
                    <CheckboxFilterField
                      {...field}
                      label="Tags -"
                      type="tags_in"
                      category="gameFilters"
                      setFieldValue={formik.setFieldValue}
                      options={tagOptions}
                    />
                  )}
                </Field>
              </Box>
              <Box my={2}>
                <Field name="filters">
                  {({ field }) => (
                    <CheckboxFilterField
                      {...field}
                      label="Genres -"
                      type="genres_in"
                      category="gameFilters"
                      setFieldValue={formik.setFieldValue}
                      options={genreOptions}
                    />
                  )}
                </Field>
              </Box>
              {!gameList.every(game => game.freeToPlay) &&
                !gameList.every(game => game.onSale) && (
                  <React.Fragment>
                    <Box my={2}>
                      <Field name="filters">
                        {({ field }) => (
                          <BooleanFilterField
                            {...field}
                            label="Free to Play -"
                            type="freeToPlay"
                            setFieldValue={formik.setFieldValue}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box my={2}>
                      <Field name="filters">
                        {({ field }) => (
                          <BooleanFilterField
                            {...field}
                            label="On Sale -"
                            type="onSale"
                            setFieldValue={formik.setFieldValue}
                          />
                        )}
                      </Field>
                    </Box>
                  </React.Fragment>
                )}
              <Box my={2}>
                <Field name="filters">
                  {({ field }) => (
                    <SliderFilterField
                      {...field}
                      label="User Rating -"
                      min={getMinValue(gameList, "userRating")}
                      max={getMaxValue(gameList, "userRating")}
                      minType="userRating_gte"
                      maxType="userRating_lte"
                      setFieldValue={formik.setFieldValue}
                      labelFormatHandler={val => val}
                    />
                  )}
                </Field>
              </Box>
              {!gameList.every(game => game.freeToPlay) && (
                <React.Fragment>
                  <Box my={2}>
                    <Field name="filters">
                      {({ field }) => (
                        <SliderFilterField
                          {...field}
                          label="Discount -"
                          min={getMinValue(gameList, "discount")}
                          max={getMaxValue(gameList, "discount")}
                          minType="discount_gte"
                          maxType="discount_lte"
                          setFieldValue={formik.setFieldValue}
                          labelFormatHandler={val => `${val}%`}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box my={2}>
                    <Field name="filters">
                      {({ field }) => (
                        <SliderFilterField
                          {...field}
                          label="Price -"
                          min={getMinValue(gameList, "finalPrice")}
                          max={getMaxValue(gameList, "finalPrice")}
                          minType="finalPrice_gte"
                          maxType="finalPrice_lte"
                          setFieldValue={formik.setFieldValue}
                          labelFormatHandler={val => formatCurrency(val)}
                        />
                      )}
                    </Field>
                  </Box>
                </React.Fragment>
              )}
            </Box>
            <Box className={classnames.element("fieldSection")} my={4}>
              <Typography
                className={classnames.element("fieldSectionTitle")}
                variant="body1"
              >
                Sorting:
              </Typography>
              <Box my={2}>
                <Field name="orderBy">
                  {_fieldProps => (
                    <React.Fragment>
                      <InputLabel
                        className={classnames.element("fieldSectionTitle")}
                        id="sort-by-select-label"
                      >
                        Sort By -
                      </InputLabel>
                      <Select
                        labelId="sort-by-select-label"
                        id="sort-by-select"
                        value={sortBy}
                        onChange={handleSortByChange}
                        MenuProps={{
                          classes: {
                            paper: classes.menuPaper
                          }
                        }}
                      >
                        {Object.keys(SORT_BY_OPTIONS).map((key, index) => (
                          <MenuItem
                            className={classnames.element("selectOption")}
                            key={index}
                            value={key}
                          >
                            {SORT_BY_OPTIONS[key]}
                          </MenuItem>
                        ))}
                      </Select>
                    </React.Fragment>
                  )}
                </Field>
              </Box>
              <Box my={2}>
                <Field name="sortOrder">
                  {_fieldProps => (
                    <React.Fragment>
                      <InputLabel
                        className={classnames.element("fieldSectionTitle")}
                        id="sort-order-select-label"
                      >
                        Sort Direction -
                      </InputLabel>
                      <Select
                        labelId="sort-order-select-label"
                        id="sort-order-select"
                        value={sortDirection}
                        onChange={handleSortOrderChange}
                        MenuProps={{
                          classes: {
                            paper: classes.menuPaper
                          }
                        }}
                      >
                        {SORT_DIRECTION_OPTIONS.map((value, index) => (
                          <MenuItem
                            className={classnames.element("selectOption")}
                            key={index}
                            value={value}
                          >
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </React.Fragment>
                  )}
                </Field>
              </Box>
            </Box>
          </Form>
        </Box>
        <Box my={4} className={classnames.element("submitButtonContainer")}>
          <ActionButton
            label="Filter"
            disabled={formik.isSubmitting || !formik.dirty}
            onClick={() => {
              formik.submitForm();
              drawerCloseHandler();
            }}
          />
        </Box>
      </Container>
    </OnClickOutsideWrapper>
  );
};
AdvancedFiltersForm.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}AdvancedFiltersForm`
);
AdvancedFiltersForm.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    closing: PropTypes.string,
    closeButtonContainer: PropTypes.string,
    fieldsContainer: PropTypes.string,
    fieldSection: PropTypes.string,
    fieldSectionTitle: PropTypes.string,
    menuPaper: PropTypes.string,
    selectOption: PropTypes.string,
    submitButtonContainer: PropTypes.string
  }),
  // handler for closing the drawer
  drawerCloseHandler: PropTypes.func,
  // formik values
  formik: PropTypes.object,
  // list of developer options
  developerOptions: PropTypes.array,
  // list of publisher options
  publisherOptions: PropTypes.array,
  // list of genre options
  genreOptions: PropTypes.array,
  // list of tag options
  tagOptions: PropTypes.array,
  // list of games
  gameList: PropTypes.array
};
AdvancedFiltersForm.defaultProps = {
  classes: {}
};

// apply styles
export const StyledAdvancedFiltersForm = withStyles(styles)(
  AdvancedFiltersForm
);

/**
 * renders an AdvancedFiltersFormWithFormik wrapped by Formik
 */
export const AdvancedFiltersFormWithFormik = props => {
  let { initialValues, items } = props;
  const FORM_VALUE_KEYS_MAP = {
    users: [],
    filters: {},
    orderBy: [],
    sortOrder: "DESC"
  };
  let adjustedInitialValues = { ...initialValues };
  Object.keys(FORM_VALUE_KEYS_MAP).forEach(key => {
    if (!adjustedInitialValues.hasOwnProperty(key)) {
      adjustedInitialValues[key] = FORM_VALUE_KEYS_MAP[key];
    }
  });

  return (
    <GamesFilterWidgetContextConsumer>
      {context => {
        // compile contextual data to generate field options
        const gameList = items.map(edge => edge.node.game);
        const publisherOptions = getCategoryOptions(gameList, "publishers");
        const developerOptions = getCategoryOptions(gameList, "developers");
        const genreOptions = getCategoryOptions(gameList, "genres");
        const tagOptions = getCategoryOptions(gameList, "tags");

        const handleSubmit = payload => {
          context.setFilterOptions(payload);
        };

        return (
          <Formik initialValues={adjustedInitialValues} onSubmit={handleSubmit}>
            {formikProps => {
              return (
                <StyledAdvancedFiltersForm
                  formik={formikProps}
                  publisherOptions={publisherOptions}
                  developerOptions={developerOptions}
                  genreOptions={genreOptions}
                  tagOptions={tagOptions}
                  gameList={gameList}
                  {...props}
                />
              );
            }}
          </Formik>
        );
      }}
    </GamesFilterWidgetContextConsumer>
  );
};
AdvancedFiltersFormWithFormik.propTypes = {
  // The initial values to populate the form
  initialValues: PropTypes.object
};

export default AdvancedFiltersFormWithFormik;
