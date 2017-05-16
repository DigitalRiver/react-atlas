import React, { PropTypes } from "react";
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
      <input
        name={name}
        styleName={inputClassName}
        style={onColorStyle}
        type="checkbox"
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
  "large": PropTypes.bool
};

Switch.defaultProps = {
  "checked": false,
  "className": "",
  "disabled": false,
  "hidden": false
};

Switch.styleguide = {
  "category": "Form Components",
  "index": "3.12",
  "example": `
<section>
  <h5>Toggle Switches</h5>
  <Switch />

  <h5>Toggle Switch Colors</h5>

  <p>On Switch Color</p>
  <Switch onColor="black"/>

  <p>Off Switch Color</p>
  <Switch offColor="black"/>

  <p>Button Switch Color</p>
  <Switch buttonColor='black'/>

  <p>Disabled</p>
  <Switch disabled/>

  <h5>Switch sizes</h5>
  <p>Small</p>
  <Switch small/>

  <p>Medium</p>
  <Switch medium checked />

  <p>Large</p>
  <Switch large/>
</section>
`
};

export default Switch;
