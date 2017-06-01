import React, { PropTypes } from "react";
import cx from "classNames";

const Radio = ({ className, disabled, inline, name, label, ...props }) => {
  const labelClasses = cx(
    {
      "block": !inline,
      inline,
      disabled
    },
    className,
    "radioLabel"
  );

  return (
    <label styleName={labelClasses}>
      <input
        styleName={cx("radioInput")}
        {...props}
        disabled={disabled}
        name={name}
        type="radio"
      />
      {label ? <span> {label}</span> : null}
    </label>
  );
};

Radio.propTypes = {
  /**
   * Determines if the radio button is checked by default.
   * @examples '<Radio defaultChecked/>'
   */
  "defaultChecked": PropTypes.bool,
  /**
   * Define a custom css class name.
   * @examples 'radioButton', 'radio-button'
   */
  "className": PropTypes.string,
  /**
   * Determines if the radio button is disabled.
   * @examples '<Radio disabled/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the radio button is displayed as an inline element.
   * @examples '<Radio inline/>'
   */
  "inline": PropTypes.bool,
  /**
   * Define a label for the radio button.
   * @examples '<Radio label="test"/>'
   */
  "label": PropTypes.string,
  /**
   * Define a name for the radio button. Not necessary if using radio group component as wrapper.
   * @examples '<Radio name="test"/>'
   */
  "name": PropTypes.string,
  /**
   * Sets a handler function to be executed when onBlur event occurs.
   * @examples '<Radio onBlur={onBlurHandler}/>'
   */
  "onBlur": PropTypes.func,
  /**
   * Sets a handler function to be executed when onChange event occurs.
   * @examples '<Radio onChange={onChangeHandler}/>'
   */
  "onChange": PropTypes.func,
  /**
   * Sets a handler function to be executed when onClick event occurs.
   * @examples '<Radio onClick={onClickHandler}/>'
   */
  "onClick": PropTypes.func,
  /**
   * Sets a handler function to be executed when onFocus event occurs.
   * @examples '<Radio onFocus={onFocusHandler}/>'
   */
  "onFocus": PropTypes.func,
  /**
   * Define a value for the radio button.
   * @examples '<Radio value="100"/>'
   */
  "value": PropTypes.any
};

Radio.defaultProps = {
  "className": "",
  "disabled": false,
  "inline": false
};

export default Radio;
