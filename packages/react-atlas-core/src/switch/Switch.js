import React from "react";
import PropTypes from 'prop-types';
import { InputCore } from "../input";
import cx from "classNames";

const Switch = ({
  className,
  name,
  disabled,
  hidden,
  small,
  medium,
  large,
  offColor,
  onColor,
  buttonColor,
  onChange,
  ...props
}) => {
  let offClassName = cx({
    "sliderSmall": small && !medium && !large,
    "sliderMedium": !small && !large,
    "sliderLarge": large && !medium && !small,
    disabled,
    hidden
  });

  let inputClassName = cx({
    "inputSmall": small && !medium && !large,
    "inputMedium": !small && !large,
    "inputLarge": large && !medium && !small,
    disabled,
    hidden
  });

  let buttonClassName = cx({
    "handleSmall": small && !medium && !large,
    "handleMedium": !small && !large,
    "handleLarge": large && !medium && !small,
    disabled,
    hidden
  });

  let onClassName = cx({
    "onColorSmall": small && !medium && !large,
    "onColorMedium": !small && !large,
    "onColorLarge": large && !medium && !small
  });

  let offColorStyle = {
    "background": offColor
  };

  let onColorStyle = {
    "background": onColor
  };

  let buttonColorStyle = {
    "background": buttonColor
  };

  return (
    <label
      {...props}
      styleName={offClassName}
      className={cx(className)}
      style={offColorStyle}
    >
      <InputCore 
        type="checkbox" 
        name={name} 
        styleName={inputClassName} 
        onChange={onChange}
      />
      <div styleName={buttonClassName} style={buttonColorStyle} />
      <div styleName={onClassName} style={onColorStyle} />
    </label>
  );
};

Switch.propTypes = {
  /**
   * Define a custom css class name.
   * @examples 'switch', 'switch-elem'
   */
  "className": PropTypes.string,
  /**
   * Determines if the switch input is disabled.
   * @examples '<Switch disabled/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the switch input is hidden.
   * @examples '<Switch hidden/>'
   */
  "hidden": PropTypes.bool,
  /**
   * Define a name for the switch input.
   * @examples '<Switch name="test"/>'
   */
  "name": PropTypes.string,
  /**
   * Sets color that will be displayed when the switch is checked.
   * @examples '<Switch onColor="#ababab"/>'
   */
  "onColor": PropTypes.string,
  /**
   * Sets color that will be displayed when the switch is unchecked.
   * @examples '<Switch offColor="#d3d3d3"/>'
   */
  "offColor": PropTypes.string,
  /**
   * Sets color that will be displayed for the inner button.
   * @examples '<Switch buttonColor="#ffffff"/>'
   */
  "buttonColor": PropTypes.string,
  /**
   * Defines a small sized switch element.
   * @examples '<Switch small/>'
   */
  "small": PropTypes.bool,
  /**
   * Defines a medium sized switch element.
   * @examples '<Switch medium/>'
   */
  "medium": PropTypes.bool,
  /**
   * Defines a large sized switch element.
   * @examples '<Switch large/>'
   */
  "large": PropTypes.bool,
  /**
   * Sets a handler function to be executed when onChange event occurs (at input element).
   * @examples <Switch onChange={this.customOnChangeFunc}/>
   */
  "onChange": PropTypes.func
};

Switch.defaultProps = {
  "checked": false,
  "className": "",
  "disabled": false,
  "hidden": false
};

export default Switch;
