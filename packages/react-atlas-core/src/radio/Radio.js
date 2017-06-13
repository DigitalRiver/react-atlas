import React from "react";
import PropTypes from 'prop-types';
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

Radio.styleguide = {
  "category": "Form Components",
  "index": "3.8",
  "example": `
<section>
  <h5>Individual Radio Buttons</h5>
  <p>Not aware of each other, use RadioGroup for that.</p>
  <Radio label="Checked Radio" value="checkedRadio" defaultChecked />
  <Radio label="Disabled Radio" value="disabledRadio" disabled/>
  <Radio label="Inlined 1" value="inlined1" className="someClassIMadeUp" inline />
  <Radio label="Inlined 2" value="inlined2" inline />
</section>
`
};

export default Radio;
