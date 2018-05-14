import React from "react";
import PropTypes from "prop-types";
import messages from "../utils/messages.js";
import Input from "../Input";
import Tooltip from "../Tooltip";
import Button from "../Button";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./TextField.css";

export class TextField extends React.PureComponent {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      "value": props.value,
      "active": false,
      "status": props.status || null,
      "message": props.message || null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({
        "value": nextProps.value
      });
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

  _eventHandlers = (e, change) => {
    const data = {
      "value": this.state.value,
      "status": this.state.status
    };

    if (!change && this.props.onBlur) {
      this.props.onBlur(e, data);
    }

    if (change && this.props.onChange) {
      this.props.onChange(e, data);
    }
  };

  _validate = (e, inputValue, change) => {
    let status = null;
    let message = null;

    /* Execute custom validator and change state and error messages accordingly */
    if (typeof this.props.valid === "function") {
      let validationObject = this.props.valid(inputValue);
      if (validationObject === false) {
        validationObject = { "status": "error", "message": null };
      }
      if (typeof validationObject === "undefined") {
        validationObject = { "status": null, "message": null };
      }
      status = validationObject.status;
      message = validationObject.message;
    } else if (
      !inputValue.length &&
      (this.props.required ||
        typeof this.props.required === "string" && this.props.required === "")
    ) {
      /* If the field is required, and it has no value, change state and display error message */
      message = messages.requiredMessage;
      status = "error";
    }

    this.setState(
      {
        "status": status,
        "message": message,
        "value": inputValue,
        "active": change
      },
      () => {
        this._eventHandlers(e, change);
      }
    );
  };

  _handleChange = e => {
    e.persist();
    let value = e.target.value;

    if (this.props.uppercase) {
      value = value.toUpperCase();
    }

    this._validate(e, value, true);
  };

  _handleFocus = e => {
    e.persist();
    this.setState({ "active": true }, function() {
      if (typeof this.props.onFocus !== "undefined") {
        this.props.onFocus(e, {
          "value": this.state.value,
          "status": this.state.status
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
    if (typeof this.props.onClick !== "undefined") {
      this.props.onClick(e, {
        "value": this.state.value,
        "status": this.state.status
      });
    }
  };

  _handleKeyPress = e => {
    e.persist();
    if (typeof this.props.onKeyPress !== "undefined") {
      this.props.onKeyPress(e, {
        "value": this.state.value,
        "status": this.state.status
      });
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

    const reqText = typeof required === "string" ? required : "*";

    let wrapperClasses = cx({
      leftLabel,
      inline,
      "textfieldWrapper": true
    });

    let labelClasses = cx({
      "labelSpacing": !leftLabel,
      "label": true
    });

    let labelContainerClasses = cx({
      "tooltipRight": tooltipPosition === "right",
      "labelContainer": true
    });

    let labelPadding = cx({
      "verticalPadding": !leftLabel,
      "horizontalPadding": true
    });

    let inputClasses = cx({
      "textfield": true,
      "active": this.state.active,
      "error": this.state.status === "error",
      "success": this.state.status === "success",
      "warning": this.state.status === "warning",
      disabled
    });

    let messageClasses = cx({
      "success_message": this.state.status === "success",
      "error_message": this.state.status === "error",
      "warning_message": this.state.status === "warning"
    });

    const requiredClasses = cx({
      "required": true,
      "required_error": this.state.status === "error"
    });

    let textFieldLabel = (label || tooltip) && 
      <div styleName={labelContainerClasses}>
        <div styleName={cx(labelPadding)}>
          {label && 
            <label styleName={labelClasses} htmlFor={id}>
              {label}
            </label>
          }
          {required &&
            required !== "" && 
              <span styleName={requiredClasses}> {reqText}</span>
            }
        </div>
        {tooltip}
      </div>
    ;

    return (
      <div styleName={wrapperClasses}>
        {textFieldLabel}
        <input
          {...others}
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
          onKeyPress={this._handleKeyPress}
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
   * A callback that fires onFocus.
   */
  "onFocus": PropTypes.func,
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
   * Sets a handler function to be executed and validate against. Will override the required property (you can still use the required prop to add a required indicator next to the label) and must return an object with a status (Options: null, "success", "error") and a message (Options: null or string)
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
