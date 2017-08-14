import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import cx from "classnames";

class TextField extends React.PureComponent {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      "value": props.value || "",
      "remaining": props.maxLength,
      "active": false,
      "valid": props.isValid || true
    };
  }

  _handleChange = (value, event) => {
    console.log("Event: ", event);
    event.persist();
    // let value = event.target.value;

    if (this.props.maxLength) {
      // Keep difference between maxlength and input value in state for count
      this.setState({ "remaining": this.props.maxLength - value.length });
    }

    // Set value and valid state depending on InputCore state
    this.setState({
      "value": this.inputRef.state.value,
      "valid": this.inputRef.state.isValid
    });

    if (this.props.onChange) {
      // Execute app code
      this.props.onChange(event);
    }
  };

  _handleFocus = event => {
    this.setState({ "active": true });
  };

  _handleBlur = event => {
    this.setState({ "active": false });
  };

  render() {
    const {
      name,
      type,
      header,
      placeholder,
      maxLength,
      small,
      medium,
      large,
      required,
      validator,
      errorText,
      mask,
      disabled,
      hidden,
      className
    } = this.props;

    let textFieldHeader =
      header &&
      <div styleName={cx("header")}>
        <span styleName={cx("headerFont")}>{header}</span>
        {required && <span styleName={"error_text"}> *</span>}
      </div>;

    let wrapperClasses = cx(
      {
        hidden,
        small,
        medium,
        large
      },
      "textfieldWrapper"
    );

    let textFieldClasses = cx(
      {
        disabled,
        "active": this.state.active,
        "invalid": !this.state.valid
      },
      "textfield"
    );

    return (
      <div
        styleName={wrapperClasses}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        className={cx(className)}
      >
        {textFieldHeader}
        <InputCore
          type={type}
          name={name}
          placeholder={placeholder}
          value={this.state.value}
          maxLength={maxLength}
          styleName={textFieldClasses}
          onChange={this._handleChange}
          required={required}
          validator={validator}
          errorText={errorText}
          mask={mask}
          disabled={disabled}
          hidden={hidden}
          ref={node => this.inputRef = node}
        />
      </div>
    );
  }
}

TextField.PropTypes = {
  "isValid": PropTypes.bool,
  /**
	 * Define a custom css class name.
	 * @examples 'textfield', 'textfield-elem'
	 */
  "className": PropTypes.string,
  /**
	 * Define a name for the text input.
	 * @examples '<TextField name="test"/>'
	 */
  "name": PropTypes.string,
  /**
   * Define a type for the text input. Default is "text".
   * @examples '<TextField type="password"/>'
   */
  "type": PropTypes.string,
  /**
   * Define a default value for the text input.
   * @examples '<TextField value="Textfield value here"/>'
   */
  "value": PropTypes.string,
  /**
	 * Defines a small sized text input.
	 * @examples '<TextField small/>'
	 */
  "small": PropTypes.bool,
  /**
   * Define a title or header to be displayed above the textfield.
   * @examples '<TextField header="test"/>'
   */
  "header": PropTypes.string,
  /**
	 * Defines a medium sized text input.
	 * @examples '<TextField medium/>'
	 */
  "medium": PropTypes.bool,
  /**
	 * Defines a large sized text input.
	 * @examples '<TextField large/>'
	 */
  "large": PropTypes.bool,
  /**
   * Sets a maximum character length that will be validated onChange.
   * @examples '<TextField maxLenght={25}/>'
   */
  "maxLength": PropTypes.number,
  /**
   * Sets a handler function to be executed and validate against. If it returns any falsy value, validation error will trigger.
   * @examples '<TextField validator={this.customValidator}/>'
   */
  "validator": PropTypes.func,
  /**
   * Defines the error text to be shown when custom validation occurs.
   * @examples '<TextField errorText="Custom error message."/>'
   */
  "errorText": PropTypes.string,
  /**
   * Sets a mask for the input field.
   * @examples '<TextField mask="AAA 11111"/>'
   */
  "mask": PropTypes.string,
  /**
   * Defines placeholder text.
   * @examples '<TextField placeholder="test input"/>'
   */
  "placeholder": PropTypes.string,
  /**
	 * Sets a handler function to be executed when onChange event occurs (at input element).
	 * @examples <TextField onChange={this.customOnChangeFunc}/>
	 */
  "onChange": PropTypes.func,
  /**
   * Sets the field as required. Will be validated onChange.
   * @examples '<TextField required/>'
   */
  "required": PropTypes.bool,
  /**
	 * Determines if the text input is disabled.
	 * @examples '<TextField disabled/>'
	 */
  "disabled": PropTypes.bool,
  /**
	 * Determines if the text input is hidden.
	 * @examples '<TextField hidden/>'
	 */
  "hidden": PropTypes.bool
};

TextField.defaultProps = {
  "className": "",
  "type": "text",
  "disabled": false,
  "hidden": false
};

export default TextField;
