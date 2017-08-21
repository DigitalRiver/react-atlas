import React from "react";
import PropTypes from 'prop-types';
import InputMask from "inputmask-core";
import { utils } from "../utils";
import cx from "classnames";

/**
 * Master Input component. To be used as core for different input types
 * components. Accepts all input properties and also supports custom
 * and maxlenght/required validations. Allows input masking.
 */
class Input extends React.Component {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      "value": props.value || "",
      "errorText": null,
      "isValid": props.isValid || true,
      "remaining": props.maxLength
    };

    // Configure input mask if required
    if (this.props.mask) {
      let maskOptions = {
        "pattern": this.props.mask,
        "value": this.props.value
      };

      this.mask = new InputMask(maskOptions);
    }

    // Display a console warning if custom validation is set w/o an error message
    if (this.props.validator && !this.props.errorText) {
      console.warn(
        "You set a custom validator without error text message. Please use 'errorText' property to set it up."
      );
    }
  }

  _updateMaskSelection = () => {
    this.mask.selection = utils.getSelection(this.input);
  };

  _updateInputSelection = () => {
    let selection = this.mask.selection;
    utils.setSelection(this.input, selection);
  };

  _getDisplayValue = () => {
    let value = this.mask.getValue();
    return value === this.mask.emptyValue ? "" : value;
  };

  _handleKeyDown = event => {
    /**
     * Handle proper deletion of masked input characters.
     * We do this onKeyDown because backspace key event
     * won't reach onKeyPress event.
     */
    if (this.props.mask) {
      if (event.key === "Backspace") {
        event.preventDefault();
        this._updateMaskSelection();

        if (this.mask.backspace()) {
          let value = this._getDisplayValue();
          event.target.value = value;
          if (value) {
            this._updateInputSelection();
          }
        }
      }

      // Fire onChange event
      this._handleChange(event);
    }
  };

  _handleKeyPress = event => {
    if (this.props.mask) {
      // Ignore modified key presses and enter key to allow form submission
      if (
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.key === "Enter"
      ) {
        return;
      }

      event.preventDefault();
      this._updateMaskSelection();

      // Check if pressed key corresponds to mask pattern
      if (this.mask.input(event.key || event.data)) {
        event.target.value = this.mask.getValue();
        this._updateInputSelection();
      }

      // Fire onChange event
      this._handleChange(event);
    }
  };

  _handlePaste = event => {
    /**
     * Support pasting text in masked input. If text doesn't
     * pass mask validation, it won't be pasted.
     */
    if (this.props.mask) {
      event.preventDefault();
      this._updateMaskSelection();

      if (this.mask.paste(event.clipboardData.getData("Text"))) {
        event.target.value = this.mask.getValue();
        // Timeout needed for IE
        setTimeout(this._updateInputSelection, 0);
      }

      // Fire onChange event
      this._handleChange(event);
    }
  };

  _handleBeforeChange = () => {
    if (this.props.onBeforeChange) {
      this.props.onBeforeChange();
    }
  };

  _validate = (inputValue) => {
    /* Validate max character length */
    if (this.props.maxLength) {
      // Keep difference between maxlength and input value in state for count
      this.setState({
        "remaining": this.props.maxLength - inputValue.length
      });
      // Make sure the user input is less than maxLength value
      if (inputValue.length > this.props.maxLength) {
        this.setState({
          "value": inputValue.substring(0, this.props.maxLength),
          "remaining": 0
        });
        return false;
      }
    }

    /* Execute custom validator and change state and error messages accordingly */
    let customValidationPass = false;
    if (this.props.validator) {
      let valid = this.props.validator(inputValue);
      if (!valid) {
        this.setState({
          "errorText": this.props.errorText,
          "isValid": false
        });
      } else {
        customValidationPass = true;
      }
    }

    /* If the field is required, and it has no value, change state and display error message */
    if (this.props.required) {
      if (!inputValue.length) {
        this.setState({
          "errorText": this.props.requiredText || "This field is required.",
          "isValid": false
        });
      } else {
        /* Set state after both validation checks to display both when required */
        if (this.props.validator) {
          if (customValidationPass) {
            this.setState({ "isValid": true });
          }
        } else {
          this.setState({
            "isValid": true
          });
        }
      }
    }

    return true;
  }

  _handleChange = event => {
    event.persist();
    let inputValue = event.target.value;

    /* Masked input validations */
    if (this.props.mask) {
      let maskValue = this.mask.getValue();

      if (inputValue !== maskValue) {
        // Cut or delete operations will have shortened the value
        if (inputValue.length < maskValue.length) {
          let sizeDiff = maskValue.length - inputValue.length;
          this._updateMaskSelection();
          this.mask.selection.end = this.mask.selection.start + sizeDiff;
          this.mask.backspace();
        }
        // Set new input value based on mask
        let newValue = this._getDisplayValue();
        inputValue = newValue;

        if (newValue) {
          this._updateInputSelection();
        }
      }
    }

    this._validate(inputValue);
    this.setState({
        "value": inputValue
        }, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state.value, event, this.state.isValid);
          }
        });
  };

  render() {
    const {
      className,
      small,
      medium,
      large,
      type,
      name,
      multiline,
      placeholder,
      disabled,
      hidden,
      errorLocation,
      checked,
      ...props // eslint-disable-line no-unused-vars
    } = this.props;

    /* If checkbox, we need to render only input component (no wrappers) */
    let isCheckbox = type === "checkbox";

    let inputClasses = cx({
      "input": !isCheckbox,
      "checkbox": isCheckbox,
      "invalid": !this.state.isValid,
      "blockInput": errorLocation === "bottom",
      "small": small,
      "medium": medium,
      "large": large,
      "max": !small && !medium && !large,
      disabled,
      hidden
    });

    let eventHandlers = {
      "onClick": this._handleBeforeChange,
      "onChange": this._handleChange,
      "onKeyDown": this._handleKeyDown,
      "onKeyPress": this._handleKeyPress,
      "onPaste": this._handlePaste
    };

    let inputElement = multiline
      ? <textarea
          name={name}
          value={this.state.value}
          placeholder={placeholder}
          styleName={inputClasses}
          className={cx(className)}
          onChange={this._handleChange}
        />
      : <input
          type={type}
          name={name}
          value={this.state.value}
          placeholder={placeholder}
          styleName={inputClasses}
          className={cx(className)}
          ref={input => {
            this.input = input;
          }}
          {...eventHandlers}
        />;

    let errorTextElement =
      this.state.errorText &&
      <span styleName={cx("error")}>{this.state.errorText}</span>;

    return isCheckbox
      ? <input
          type="checkbox"
          name={name}
          styleName={inputClasses}
          className={cx(className)}
          checked={checked}
          {...eventHandlers}
        />
      : <div styleName={cx("container")}>
          {inputElement}
          {this.state.isValid ? null : errorTextElement}
        </div>;
  }
}

Input.propTypes = {
  "isValid": PropTypes.bool,
  /**
   * Defines a custom css class name.
   * @examples 'custom-imput'
   */
  "className": PropTypes.string,
  /**
   * Defines the input type. Accepts HTML5 input types.
   * @examples 'text', 'checkbox', 'radio', 'password', 'email'
   */
  "type": PropTypes.string,
  /**
   * Defines a name for the input.
   * @examples '<Input type="text" name="test"/>'
   */
  "name": PropTypes.string,
  /**
   * Sets the field as required. Will be validated onChange.
   * @examples '<Input type="text" required/>'
   */
  "required": PropTypes.bool,
  /**
   * Defines error message to be displayed when input is empty and required.
   * Otherwise, it will display pre-defined required field message.
   * @examples '<Input type="text" required requiredText="Custom required msg"/>'
   */
  "requiredText": PropTypes.string,
  /**
   * Defines error message to be displayed on custom validation.
   * @examples '<Input type="text" validator={this.validateTest} errorText="Custom validation msg"/>'
   */
  "errorText": PropTypes.string,
  /**
   * Defines error messages location (on validation).
   * > Valid values are 'right' and 'bottom'.
   * > Default value is 'right'.
   * @examples '<Input type="text" required requiredText="Custom required msg" errorLocation="buttom"/>'
   */
  "errorLocation": PropTypes.string,
  /**
   * Defines a determinate value for the input.
   * @examples '<Input type="text" value="test input"/>'
   */
  "value": PropTypes.string,
  /**
   * Determines if the input is disabled.
   * @examples '<Input type="text" disabled/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the input is hidden.
   * @examples '<Input type="text" hidden/>'
   */
  "hidden": PropTypes.bool,
  /**
   * Only for input type checkbox. Determines if the input is checked.
   * @examples '<Input type="checkbox" checked/>'
   */
  "checked": PropTypes.bool,
  /**
   * Sets a maximum character lenght that will be validated onChange.
   * @examples '<Input type="text" maxLenght={25}/>'
   */
  "maxLength": PropTypes.number,
  /**
   * Defines placeholder text.
   * @examples '<Input type="text" placeholder="test input"/>'
   */
  "placeholder": PropTypes.string,
  /**
   * Renders a textarea element instead. To be used in TextArea component.
   * @examples '<Input multiline/>'
   */
  "multiline": PropTypes.bool,
  /**
   * Defines a small sized input element.
   * @examples '<Input type="text" small/>'
   */
  "small": PropTypes.bool,
  /**
   * Defines a medium sized input element.
   * @examples '<Input type="text" small/>'
   */
  "medium": PropTypes.bool,
  /**
   * Defines a large sized input element.
   * @examples '<Input type="text" small/>'
   */
  "large": PropTypes.bool,
  /**
   * Defines a pattern for masked input.
   * @examples '<Input type="text" mask="1111-1111-1111"/>'
   */
  "mask": PropTypes.string,
  /**
   * Sets a custom validator function that will be executed onChange.
   * > Should return a boolean value, otherwise will evaluate to false.
   * > Error message to be displayed will come from errorText prop.
   * @examples '<Input type="text" validator={this.validateTest} errorText="Custom validation msg"/>'
   */
  "validator": PropTypes.func,
  /**
     * Sets a handler function to be executed before onChange event occurs (executed onClick).
     * @examples <Input type="text" onBeforeChange={this.customOnClickFunc}/>
     */
  "onBeforeChange": PropTypes.func,
  /**
     * Sets a handler function to be executed when onChange event occurs.
     * @examples <Input type="text" onChange={this.customOnChangeFunc}/>
     */
  "onChange": PropTypes.func
};

Input.defaultProps = {
  "className": "",
  "disabled": false,
  "hidden": false,
  "focus": false,
  "errorLocation": "right"
};

export default Input;
