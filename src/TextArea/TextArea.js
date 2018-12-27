import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Label } from "../Label";
import { utils } from "../utils";
import CSSModules from "react-css-modules";
import styles from "./TextArea.css";
import blacklist from "blacklist";

export class TextArea extends React.PureComponent {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      value: props.value || "",
      active: false,
      status: props.status || null,
      message: props.message || null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
    if (
      (typeof nextProps.status !== "undefined" &&
        nextProps.status !== this.props.status) ||
      (typeof nextProps.message !== "undefined" &&
        nextProps.message !== this.props.message)
    ) {
      this.setState({
        status: nextProps.status,
        message: nextProps.message
      });
    }
  }

  _eventHandlers = (e, change) => {
    const data = {
      value: this.state.value,
      status: this.state.status,
      message: this.state.message
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

    if (this.props.uppercase) {
      value = value.toUpperCase();
    }

    const validationObject = utils.validate(
      value,
      this.props.valid,
      this.props.status,
      this.props.message,
      this.props.required
    );

    const data = {
      value: value,
      status: validationObject.status,
      message: validationObject.message
    };

    let result = true;
    if (this.props.onBeforeChange) {
      result = this.props.onBeforeChange(e, data);
    }

    if (result === false) {
      return;
    }

    let change = true;

    this.setState(
      {
        status: validationObject.status,
        message: validationObject.message,
        value: value,
        active: change
      },
      () => {
        this._eventHandlers(e, change);
      }
    );
  };

  // Used from a parent Form component to validate only
  _formValidate = inputValue => {
    const validationObject = utils.validate(
      inputValue,
      this.props.valid,
      this.props.status,
      this.props.message,
      this.props.required
    );
    this.setState({
      status: validationObject.status,
      message: validationObject.message
    });
    return validationObject;
  };

  _handleFocus = e => {
    e.persist();
    this.setState({ active: true }, function() {
      if (typeof this.props.onFocus === "function") {
        this.props.onFocus(e, {
          value: this.state.value,
          status: this.state.status,
          message: this.state.message
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
      this.props.required,
      e
    );

    this.setState(
      {
        status: validationObject.status,
        message: validationObject.message,
        value: value,
        active: false
      },
      () => {
        this._eventHandlers(e, false);
      }
    );
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
      resizable,
      style,
      tooltip,
      type,
      tooltipPosition,
      ...others
    } = this.props;

    // Declaring the following variables so they don't get passed to the Textarea through the prop spread.
    const othersFiltered = blacklist(others, "onBeforeChange", "uppercase");

    let wrapperClasses = cx({
      leftLabel,
      inline,
      textareaWrapper: true
    });

    let inputClasses = cx({
      textarea: true,
      textareaWidth: !this.props.cols,
      active: this.state.active,
      error: this.state.status === "error",
      success: this.state.status === "success",
      warning: this.state.status === "warning",
      unsizable: resizable === false,
      disabled
    });

    let messageClasses = cx({
      success_message: this.state.status === "success",
      error_message: this.state.status === "error",
      warning_message: this.state.status === "warning"
    });

    let textAreaLabel = (label || tooltip) && (
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
    );

    return (
      <div styleName={wrapperClasses}>
        {textAreaLabel}
        <textarea
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
        />
        {this.state.message !== null && (
          <div>
            <span styleName={messageClasses}>{this.state.message}</span>
          </div>
        )}
      </div>
    );
  }
}

TextArea.propTypes = {
  /** An Object, array, or string of CSS classes to apply to TextArea.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * The cols prop gets passed to TextArea which specifies the visible width of the text area.
   * @examples '<TextArea cols={50}
   */
  cols: PropTypes.number,
  /**
   * Determines if the TextArea is disabled.
   * @examples '<TextArea disabled/>'
   */
  disabled: PropTypes.string,
  /** Define an id for the text input.*/
  id: PropTypes.string,
  /** Sets whether or not TextArea will display as inline */
  inline: PropTypes.bool,
  /**
   * Define a label to be displayed above the TextArea.
   * @examples '<TextArea label="test"/>'
   */
  label: PropTypes.string,
  /**
   * Allows user to move the label to the left of the TextArea instead of above it
   */
  leftLabel: PropTypes.bool,
  /**
   * Sets the status message to display below the TextArea. The color of the message will be determined by the value of the "status" property.
   * @examples '<TextArea message="Incorrect answer" status="error" />'
   */
  message: PropTypes.string,
  /**
   * A callback that fires onBlur.
   */
  onBlur: PropTypes.func,
  /**
   * Sets a handler function to be executed when onChange event occurs (at input element).
   * @examples <TextArea onChange={this.customOnChangeFunc}/>
   */
  onChange: PropTypes.func,
  /**
   * A callback that fires onFocus.
   */
  onFocus: PropTypes.func,
  /**
   * Sets a handler function to be executed before change event occurs (at input element).
   * return true if you want the chaneg to happen, pass false to deny the change.
   * @examples <TextField onBeforeChange={this.onBeforeChange}/>
   */
  onBeforeChange: PropTypes.func,
  /**
   * Sets the TextArea as required. Will be validated onChange. Accepts a boolean or a string. If a string is passed it will be displayed instead of the traditional * next to the field label.
   * @examples '<TextArea required/>'
   */
  required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * Allows TextArea to be resizable.  Accepts a boolean.
   * @examples '<TextArea resizable={false}/>'
   */
  resizable: PropTypes.bool,
  /**
   * Sets the status of the TextArea. Options are null, "success", "error", and "warning".
   * @examples '<TextArea status="error" />'
   */
  status: PropTypes.string,
  /** Pass inline styling here. */
  style: PropTypes.object,
  /** Sets an element to be displayed along with the TextArea. Traditionally used with the Tooltip component, but will accept any component or HTML element. */
  tooltip: PropTypes.node,
  /** Sets the position of the embedded Tooltip. Defaults to "right", any other value will move it next to the label. */
  tooltipPosition: PropTypes.string,
  /**
   * Define a type for the text input. Default is "text".
   * @examples '<TextArea type="password"/>'
   */
  type: PropTypes.string,
  /**
   * Converts all entered text to uppercase.
   */
  uppercase: PropTypes.bool,
  /**
   * Sets a handler function to be executed and validate against. Will override the required property (you can still use the required prop to add a required indicator next to the label) and must return an object with a status (Options: null, "success", "error") and a message (Options: null or string)
   * @examples '<TextArea valid={this.customValidator}/>'
   */
  valid: PropTypes.func,
  /**
   * Define a default value for the text input.
   * @examples '<TextArea value="TextArea value here"/>'
   */
  value: PropTypes.string
};

TextArea.defaultProps = {
  type: "text",
  tooltipPosition: "right"
};

export default CSSModules(TextArea, styles, { allowMultiple: true });
