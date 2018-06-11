import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Label } from "../Label";
import { utils } from "../utils";
import CSSModules from "react-css-modules";
import styles from "./TextField.css";

export class TextField extends React.PureComponent {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      "value": props.value || "",
      "active": false,
      "status": props.status || null,
      "message": props.message || null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
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

  _handleChange = e => {
    e.persist();
    let value = e.target.value;

    const validationObject = utils.validate(
      value,
      this.props.valid,
      this.props.status,
      this.props.message,
      this.props.required
    );

    const data = {
      "value": value,
      "status": validationObject.status,
      "message": validationObject.message
    };

    let result = true;
    if (this.props.onBeforeChange) {
      result = this.props.onBeforeChange(e, data);
    }

    if (result === false) {
      return;
    }

    if (this.props.uppercase) {
      value = value.toUpperCase();
    }

    let change = true;

    this.setState(
      {
        "status": validationObject.status,
        "message": validationObject.message,
        "value": value,
        "active": change
      },
      () => {
        this._eventHandlers(e, change);
      }
    );
  };

  _handleFocus = e => {
    e.persist();
    this.setState({ "active": true }, function() {
      if (typeof this.props.onFocus === "function") {
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
    const validationObject = utils.validate(
      value,
      this.props.valid,
      this.props.status,
      this.props.message,
      this.props.required
    );
    let change = false;
    this.setState(
      {
        "status": validationObject.status,
        "message": validationObject.message,
        "value": value,
        "active": change
      },
      () => {
        this._eventHandlers(e, change);
      }
    );
  };

  _handleClick = e => {
    e.persist();
    if (typeof this.props.onClick === "function") {
      this.props.onClick(e, {
        "value": this.state.value,
        "status": this.state.status
      });
    }
  };

  _handleKeyDown = e => {
    e.persist();
    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(e, {
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
      /*eslint-disable */
      // Declaring the following variables so they don't get passed to the input element through the prop spread.
      uppercase,
      valid,
      /*eslint-enable */
      ...others
    } = this.props;

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

    console.log("TF VALUE: ", this.state.value);

    return (
      <div styleName={wrapperClasses}>
        {textFieldLabel}
        <input
          {...others}
          id={id}
          type={type}
          ref={this.props.input}
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
   * A reference to the underlying input DOM node.
   */
  "input": PropTypes.func,
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