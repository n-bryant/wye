import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import styles from "./SliderFilterField.styles";

/**
 * renders a field for electing a boolean value in the form of a Switch
 */
export const SliderFilterField = props => {
  const classnames = SliderFilterField.classnames(props);
  const {
    classes,
    name,
    min,
    max,
    minType,
    maxType,
    label,
    setFieldValue,
    value,
    labelFormatHandler
  } = props;
  const [sliderValue, setSliderValue] = React.useState([min, max]);

  /**
   * handle changes to the Slider,
   * and update formik field values
   * @param {String} option
   */
  const handleChange = (_event, newValue) => {
    setSliderValue(newValue);
    setFieldValue(name, {
      ...value,
      gameFilters: {
        ...value.gameFilters,
        [minType]: newValue[0],
        [maxType]: newValue[1]
      }
    });
  };

  return (
    <div className={classnames.root()}>
      <Typography
        id="range-filter-slider"
        className={classnames.element("label")}
        variant="body2"
        gutterBottom={true}
      >
        {label}
      </Typography>
      <div className={classnames.element("valueLabelContainer")}>
        <Typography variant="body2">
          {labelFormatHandler(sliderValue[0])}
        </Typography>
        <Typography variant="body2">
          {labelFormatHandler(sliderValue[1])}
        </Typography>
      </div>
      <div>
        <Slider
          classes={{
            root: classes.sliderRoot,
            thumb: classes.thumb,
            track: classes.track,
            rail: classes.rail
          }}
          min={min}
          max={max}
          value={sliderValue}
          onChange={handleChange}
          valueLabelDisplay="off"
          aria-labelledby="range-filter-slider"
          getAriaValueText={() => `${sliderValue}`}
        />
      </div>
    </div>
  );
};
SliderFilterField.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}SliderFilterField`
);
SliderFilterField.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    label: PropTypes.string,
    sliderRoot: PropTypes.string,
    thumb: PropTypes.string,
    track: PropTypes.string,
    rail: PropTypes.string,
    valueLabelContainer: PropTypes.string
  }),
  // Formik field name
  name: PropTypes.string,
  // the label to display for the field
  label: PropTypes.string,
  // the minimum allowed value
  min: PropTypes.number.isRequired,
  // the maximum allowed value
  max: PropTypes.number.isRequired,
  // the type of the min value
  minType: PropTypes.oneOf([
    "userRating_gte",
    "ownersMin_gte",
    "ownersMax_gte",
    "discount_gte",
    "finalPrice_gte"
  ]).isRequired,
  // the type of the max value
  maxType: PropTypes.oneOf([
    "userRating_lte",
    "ownersMin_lte",
    "ownersMax_lte",
    "discount_lte",
    "finalPrice_lte"
  ]).isRequired,
  // playerFilters field value from Formik form
  value: PropTypes.object,
  // handler for updating users field value
  setFieldValue: PropTypes.func,
  // how to format the value labels
  labelFormatHandler: PropTypes.func.isRequired
};
SliderFilterField.defaultProps = {
  classes: {}
};

// apply styles
export default withStyles(styles)(SliderFilterField);
