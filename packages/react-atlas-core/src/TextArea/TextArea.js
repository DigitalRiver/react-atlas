import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import cx from "classnames";

class TextArea extends React.PureComponent {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      "value": props.value || "",
      "remaining": props.maxLength,
      "active": false,
      "valid": true
    };
  }

  _handleChange = event => {
    event.persist();
    let value = event.target.value;

    if (this.props.maxLength) {
      // Keep difference between maxlength and input value in state for count
      this.setState({ "remaining": this.props.maxLength - value.length });
    }

    if (this.props.required) {
      // Set valid state depending on InputCore state
      this.setState({ "valid": this.inputRef.state.isValid });
    }

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
      header,
      placeholder,
      maxLength,
      resizable,
      small,
      medium,
      large,
      required,
      disabled,
      hidden,
      className
    } = this.props;

    let remainingCount =
      maxLength &&
      <div styleName={cx("remainingCount")}>
        {maxLength - this.state.remaining}/{maxLength}
      </div>;

    let textAreaHeader =
      header &&
      <div styleName={cx("header")}>
        <span styleName={cx("headerFont")}>{header}</span>
        {required && <span styleName={"error_text"}> *</span>}
      </div>

    let wrapperClasses = cx(
      {
        hidden,
        small,
        medium,
        large
      },
      "textareaWrapper"
    );

    let textAreaClasses = cx(
      {
        resizable,
        disabled,
        "active": this.state.active,
        "invalid": !this.state.valid
      },
      "textarea"
    );

    return (
      <div
        styleName={wrapperClasses}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        className={cx(className)}
      >
        {textAreaHeader}
        <InputCore
          multiline
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          styleName={textAreaClasses}
          onChange={this._handleChange}
          required={required}
          disabled={disabled}
          hidden={hidden}
          ref={node => this.inputRef = node}
        />
        {remainingCount}
      </div>
    );
  }
}

TextArea.PropTypes = {
  /**
	 * Define a custom css class name.
	 * @examples 'textarea', 'textarea-elem'
	 */
  "className": PropTypes.string,
  /**
	 * Define a name for the textarea input.
	 * @examples '<TextArea name="test"/>'
	 */
  "name": PropTypes.string,
  /**
   * Define a title or header to be displayed above the textarea.
   * @examples '<TextArea header="test"/>'
   */
  "header": PropTypes.string,
  /**
	 * Defines a small sized textarea.
	 * @examples '<TextArea small/>'
	 */
  "small": PropTypes.bool,
  /**
	 * Defines a medium sized textarea.
	 * @examples '<TextArea medium/>'
	 */
  "medium": PropTypes.bool,
  /**
	 * Defines a large sized textarea.
	 * @examples '<TextArea large/>'
	 */
  "large": PropTypes.bool,
  /**
   * Sets a maximum character length that will be validated onChange.
   * @examples '<TextArea maxLenght={25}/>'
   */
  "maxLength": PropTypes.number,
  /**
   * Defines placeholder text.
   * @examples '<TextArea placeholder="test input"/>'
   */
  "placeholder": PropTypes.string,
  /**
	 * Sets a handler function to be executed when onChange event occurs (at input element).
	 * @examples <TextArea onChange={this.customOnChangeFunc}/>
	 */
  "onChange": PropTypes.func,
  /**
   * Sets the field as required. Will be validated onChange.
   * @examples '<TextArea required/>'
   */
  "required": PropTypes.bool,
  /**
	 * Determines if the textarea is disabled.
	 * @examples '<TextArea disabled/>'
	 */
  "disabled": PropTypes.bool,
  /**
	 * Determines if the textarea is hidden.
	 * @examples '<TextArea hidden/>'
	 */
  "hidden": PropTypes.bool
};

TextArea.defaultProps = {
  "className": "",
  "resizable": true,
  "disabled": false,
  "hidden": false
};

export default TextArea;
