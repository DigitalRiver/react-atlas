import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import InputMask from "inputmask-core";
import { Label } from "../Label";
import { utils } from "../utils";
import CSSModules from "react-css-modules";
import styles from "./TextField.css";
import blacklist from "blacklist";

/**
 * TextField's documentation can be found below. Documentation on the mask prop can be found at: https://github.com/insin/inputmask-core
 */
export class TextField extends React.PureComponent {
  constructor(props) {
    super(props);

    let value = props.value || "";

    if (this.props.mask) {
      let maskOptions = {
        "pattern": props.mask,
        "value": value
      };

      this.mask = new InputMask(maskOptions);

      if (props.value) {
        value = this.mask.getValue();
      }
    }

    this.state = {
      "value": value,
      "active": false,
      "status": props.status || null,
      "message": props.message || null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      let value = nextProps.value;
      if (this.props.mask) {
        this.mask.setValue(nextProps.value);
        value = this.mask.getValue();
      }
      this.setState({
        "value": value
      });
    }
    if (nextProps.mask && nextProps.mask !== this.props.mask) {
      this.mask.setPattern(nextProps.mask, { "value": this.mask.getRawValue() });
    }
    if (
      typeof nextProps.status !== "undefined" &&
        nextProps.status !== this.props.status ||
      typeof nextProps.message !== "undefined" &&
        nextProps.message !== this.props.message
    ) {
      this.setState({
        "status": nextProps.status,
        "message": nextProps.message
      });
    }
  }

  _updateMaskSelection = () => {
    this.mask.selection = utils.getSelection(this.input);
  };

  _updateMaskSelection = () => {
    let selection = this.mask.selection;
    utils.setSelection(this.input, selection);
  };

  _getMaskDisplayValue = () => {
    let value = this.mask.getValue();
    return value === this.mask.emptyValue ? "" : value;
  };

  _eventHandlers = (e, change) => {
    let rawValue = null;
    if (this.props.mask) {
      rawValue = this.mask.getRawValue();
    }

    const data = {
      "rawValue": rawValue,
      "value": this.state.value,
      "status": this.state.status,
      "message": this.state.message
    };

    if (!change && this.props.onBlur) {
      this.props.onBlur(e, data);
    }

    if (change && this.props.onChange) {
      this.props.onChange(e, data);
    }
  };

  _validate = (event, inputValue, change) => {
    const validationObject = utils.validate(
      inputValue,
      this.props.valid,
      this.props.status,
      this.props.message,
      this.props.required,
      event
    );

    this.setState(
      {
        "status": validationObject.status,
        "message": validationObject.message,
        "value": inputValue,
        "active": change
      },
      () => {
        this._eventHandlers(event, change);
      }
    );
  };

  _handleChange = e => {
    e.persist();
    let value = e.target.value;

    /* Masked input validations */
    if (this.props.mask) {
      let maskValue = this.mask.getValue();

      if (value !== maskValue) {
        // Cut or delete operations will have shortened the value
        if (value.length < maskValue.length) {
          let sizeDiff = maskValue.length - value.length;
          this._updateMaskSelection();
          this.mask.selection.end = this.mask.selection.start + sizeDiff;
          this.mask.backspace();
        }
        // Set new input value based on mask
        let newValue = this._getMaskDisplayValue();
        value = newValue;

        if (newValue) {
          this._updateMaskSelection();
        }
      }
    }

    let rawValue = null;
    if (this.props.mask) {
      rawValue = this.mask.getRawValue();
    }

    const data = {
      "rawValue": rawValue,
      "value": value,
      "status": this.state.status,
      "message": this.state.message
    };

    if (typeof this.props.onBeforeChange !== "undefined") {
      let result = this.props.onBeforeChange(event, data);
      if (result === false) {
        return false;
      }
    }

    if (this.props.uppercase) {
      value = value.toUpperCase();
    }

    this._validate(e, value, true);
  };

  _handleFocus = e => {
    e.persist();
    this.setState({ "active": true }, function() {
      if (typeof this.props.onFocus === "function") {
        this.props.onFocus(e, {
          "value": this.state.value,
          "status": this.state.status,
          "message": this.state.message
        });
      }
    });
  };

  _handleBlur = e => {
    e.persist();
    const value = e.target.value;
    this._validate(e, value, false);
  };

  _handleClick = e => {
    e.persist();
    if (typeof this.props.onClick === "function") {
      this.props.onClick(e, {
        "value": this.state.value,
        "status": this.state.status,
        "message": this.state.message
      });
    }
  };

  _handleKeyDown = e => {
    e.persist();
    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(e, {
        "value": this.state.value,
        "status": this.state.status,
        "message": this.state.message
      });
    }

    /**
     * Handle proper deletion of masked input characters.
     * We do this onKeyDown because backspace key event
     * won't reach onKeyPress event.
     */
    if (this.props.mask) {
      if (e.key === "Backspace") {
        e.preventDefault();
        this._updateMaskSelection();

        if (this.mask.backspace()) {
          let value = this._getMaskDisplayValue();
          e.target.value = value;
          if (value) {
            this._updateMaskSelection();
          }
        }
        this._handleChange(e);
      }
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
        this._updateMaskSelection();
        this._handleChange(event);
      }
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
        setTimeout(this._updateMaskSelection, 0);
      }

      // Fire onChange event
      this._handleChange(event);
    }
  };

  render() {
    const {
      className,
      disabled,
      id,
      inline,
      label,
      leftLabel,
      required,
      style,
      tooltip,
      tooltipPosition,
      type,
      ...others
    } = this.props;

    // Declaring the following variables so they don't get passed to the input element through the prop spread.
    const othersFiltered = blacklist(
      others,
      "uppercase",
      "valid",
      "onBeforeChange"
    );

    let wrapperClasses = cx({
      leftLabel,
      inline,
      "setWidth": typeof style !== "undefined" && style.width,
      "textfieldWrapper": true
    });

    let inputClasses = cx({
      "textfield": true,
      "active": this.state.active,
      "error": this.state.status === "error",
      "success": this.state.status === "success",
      "warning": this.state.status === "warning",
      "fillInput": leftLabel,
      disabled
    });

    let messageClasses = cx({
      "success_message": this.state.status === "success",
      "error_message": this.state.status === "error",
      "warning_message": this.state.status === "warning"
    });

    let textFieldLabel = (label || tooltip) && 
      <Label
        htmlFor={id}
        inline={inline}
        label={label}
        leftLabel={leftLabel}
        required={required}
        status={this.state.status}
        tooltip={tooltip}
        tooltipPosition={tooltipPosition}
      />
    ;

    return (
      <div styleName={wrapperClasses}>
        {textFieldLabel}
        <input
          {...othersFiltered}
          id={id}
          type={type}
          value={this.state.value}
          styleName={inputClasses}
          style={style}
          className={className}
          required={required}
          disabled={disabled}
          onChange={this._handleChange}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onClick={this._handleClick}
          onKeyDown={this._handleKeyDown}
          onKeyPress={this._handleKeyPress}
          onPaste={this._handlePaste}
          ref={input => {
            this.input = input;
          }}
        />
        {this.state.message !== null && 
          <div>
            <span styleName={messageClasses}>{this.state.message}</span>
          </div>
        }
      </div>
    );
  }
}

TextField.propTypes = {
  /** An Object, array, or string of CSS classes to apply to TextField.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Determines if the TextField is disabled.
   * @examples '<TextField disabled/>'
   */
  "disabled": PropTypes.string,
  /** Define an id for the text input.*/
  "id": PropTypes.string,
  /** Sets whether or not TextField will display as inline */
  "inline": PropTypes.bool,
  /**
   * Define a label to be displayed above the textfield.
   * @examples '<TextField label="test"/>'
   */
  "label": PropTypes.string,
  /**
   * Allows user to move the label to the left of the TextField instead of above it
   */
  "leftLabel": PropTypes.bool,
  /**
   * Defines a pattern for masked input.
   * @examples '<TextField mask="1111-1111-1111"/>'
   */
  "mask": PropTypes.string,
  /**
   * Sets the status message to display below the TextField. The color of the message will be determined by the value of the "status" property.
   * @examples '<TextField message="Incorrect answer" status="error" />'
   */
  "message": PropTypes.string,
  /**
   * A callback that fires onBlur.
   */
  "onBlur": PropTypes.func,
  /**
   * Sets a handler function to be executed when onChange event occurs (at input element).
   * @examples <TextField onChange={this.customOnChangeFunc}/>
   */
  "onChange": PropTypes.func,
  /**
   * Sets a handler function to be executed when onClick event occurs (at input element).
   * @examples <TextField onClick={this.customOnClickFunc}/>
   */
  "onClick": PropTypes.func,
  /**
   * A callback that fires onFocus.
   */
  "onFocus": PropTypes.func,
  /**
   * Sets a handler function to be executed when onKeyDown event occurs (at input element).
   * @examples <TextField onKeyDown={this.customOnKeyDownFunc}/>
   */
  "onKeyDown": PropTypes.func,
  /**
   * Sets a handler function to be executed before change event occurs (at input element).
   * return true if you want the chaneg to happen, pass false to deny the change.
   * @examples <TextField onBeforeChange={this.onBeforeChange}/>
   */
  "onBeforeChange": PropTypes.func,
  /**
   * Sets the TextField as required. Will be validated onChange. Accepts a boolean or a string. If a string is passed it will be displayed instead of the traditional * next to the field label.
   * @examples '<TextField required/>'
   */
  "required": PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * Sets the status of the TextField. Options are null, "success", "error", and "warning".
   * @examples '<TextField status="error" />'
   */
  "status": PropTypes.string,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /** Sets an element to be displayed along with the TextField. Traditionally used with the Tooltip component, but will accept any component or HTML element. */
  "tooltip": PropTypes.node,
  /** Sets the position of the embedded Tooltip. Defaults to "right", any other value will move it next to the label. */
  "tooltipPosition": PropTypes.string,
  /**
   * Define a type for the text input. Default is "text".
   * @examples '<TextField type="password"/>'
   */
  "type": PropTypes.string,
  /**
   * Converts all entered text to uppercase.
   */
  "uppercase": PropTypes.bool,
  /**
   * Sets a handler function to be executed and validate against. Will override the required property (you can still use the required prop to add a required indicator next to the label) and must return an object with a status (Options: null, "success", "error", "warning") and a message (Options: null or string), or a boolean for simple validation.
   * @examples '<TextField valid={this.customValidator}/>'
   */
  "valid": PropTypes.func,
  /**
   * Define a default value for the text input.
   * @examples '<TextField value="Textfield value here"/>'
   */
  "value": PropTypes.string
};

TextField.defaultProps = {
  "type": "text",
  "tooltipPosition": "right"
};

export default CSSModules(TextField, styles, { "allowMultiple": true });
