import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { utils } from "../utils";
import messages from "../utils/messages.js";
import CSSModules from "react-css-modules";
import styles from "./Checkbox.css";
import { Text } from "../Text";

/**
 * Simple component for a basic checkbox
 */
export class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      "checked": this.props.checked || false,
      "status": props.status || null,
      "message": props.message || null,
      "focus": false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        "checked": nextProps.checked || false
      });
    }
  }
  // Handles new checkbox clicks and sets value and checked status of hidden input
  _clickHandler = event => {
    if (this.props.disabled) {
      return false;
    }
    event.persist();
    if (typeof this.props.onBeforeChange !== "undefined") {
      let result = this.props.onBeforeChange(this.state.checked);
      if (result === false) {
        return;
      }
    }
    const validationObject = this._validationHandler(this.props.valid);
    this.setState(
      {
        "checked": !this.state.checked,
        "status": validationObject.status,
        "message": validationObject.message
      },
      function() {
        const data = {
          "value": this.props.value,
          "status": this.state.status,
          "checked": this.state.checked
        };
        /* Check if onClick has been passed, if so call it. */
        if (typeof this.props.onClick !== "undefined") {
          this.props.onClick(data);
        }
        /* Check if onChange has been passed, if so call it. */
        if (typeof this.props.onChange !== "undefined") {
          this.props.onChange(data);
        }
      }
    );
  };

  // Added to remove console warning for controlled/uncontrolled component
  _handleChange = () => {
    return false;
  };

  _validationHandler = callback => {
    // If custom validation callback is provided set validationObject with response, otherwise check if required
    const validationObject = callback
      ? callback(event, !this.state.checked)
      : {
          "status":
            this.props.required && !this.state.checked || !this.props.required
              ? null
              : "error",
          "message": this.props.requiredMessage || messages.requiredMessage
        };
    return validationObject;
  };

  render() {
    const {
      className,
      disabled,
      groupError,
      hidden,
      id,
      inline,
      label,
      labelPosition,
      required,
      status,
      style,
      title,
      /*eslint-disable */
      // Declaring the following variables so they don't get passed to the input through the prop spread.
      onBeforeChange,
      valid,
      /*eslint-enable */
      ...others
    } = this.props;
    const inlineCheckbox = cx({
      "inline_block": inline,
      "checkbox_padding": !inline,
      "inline_padding": inline,
      hidden
    });
    const labelStyle = cx({
      "label": labelPosition !== "left",
      "label_left": labelPosition === "left"
    });
    const checkboxDisplay =
      labelPosition === "left" ? "float_right" : "float_left";
    const title_label = title ? title : label;
    let disabledClass = cx({
      disabled,
      "inline_block": true,
      "relative": true,
      "padding": !inline
    });
    const error = groupError || this.state.status === "error";
    let checkboxClass = cx({
      "checked": this.state.checked,
      "error": error,
      "not_checked": !this.state.checked,
      "focus": this.state.focus
    });

    // Gets the appropriate jsx to render a "required" identifier next to the Checkbox.
    const reqText = typeof required === "string" ? required : "*";

    // Gets the appropriate jsx to render an error message below the Checkbox.
    const errorMessage =
      error && !groupError ? utils.getErrorMessage(this.state.message) : null;

    const requiredClasses = cx({
      "required": true,
      "required_error": status === "error"
    });

    return (
      <div
        onClick={this._clickHandler}
        styleName={inlineCheckbox}
        style={style}
        className={cx(className)}
      >
        <div styleName={disabledClass}>
          {label && 
            <label styleName={labelStyle} title={title_label} htmlFor={id}>
              {label}
            </label>
          }
          <div styleName={checkboxDisplay}>
            <input
              {...others}
              label={label}
              type="checkbox"
              disabled={disabled}
              checked={this.state.checked}
              required={required}
              hidden={hidden}
              id={id}
              onChange={this._handleChange}
              styleName={cx("opacity")}
            />
            <div styleName={checkboxClass}>
              {this.state.checked && <div styleName={"checkmark"} />}
            </div>
          </div>
          {required &&
            required !== "" && 
              <span styleName={requiredClasses}>
                {" "}
                <Text>{reqText}</Text>
              </span>
            }
        </div>
        {errorMessage}
      </div>
    );
  }
}

Checkbox.propTypes = {
  /**
   * When true, Checkbox will be checked on load.
   */
  "checked": PropTypes.bool,

  /** An object, array, or string of CSS classes to apply to Checkbox.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * If included, checkbox is disabled
   * @examples <Checkbox disabled />, <Checkbox disabled={true} />
   */
  "disabled": PropTypes.bool,

  /**
   * For use when an error state has been passed down from the parent CheckboxGroup.
   */
  "groupError": PropTypes.bool,
  /**
   * Determines if the Checkbox is hidden.
   * @examples '<Checkbox hidden/>'
   */
  "hidden": PropTypes.bool,

  /** Will set the html "id" property on the Checkbox.*/
  "id": PropTypes.string,

  /**
   * When true, will render the Checkbox and its label inline.
   */
  "inline": PropTypes.bool,

  /**
   * Text for Checkbox label.
   * @examples 'Some Label'
   */
  "label": PropTypes.string,

  /**
   * Will position the Checkbox label to the left or the right of the checkbox.
   */
  "labelPosition": PropTypes.string,

  /**
   * Function that will be executed before changing the "checked" state of the Checkbox.
   */
  "onBeforeChange": PropTypes.func,

  /**
   * Function that will be executed when the Checkbox state is changed.
   */
  "onChange": PropTypes.func,

  /**
   * Function that will be executed on click.
   */
  "onClick": PropTypes.func,

  /**
   * Sets the Checkbox as required. Will be validated in _validationHandler. Accepts a boolean or a string.
   * If a string is passed it will be displayed instead of the traditional * next to the Checkbox.
   * @examples '<TextField required/>'
   */
  "required": PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,

  /**
   * Text for Checkbox label title. (i.e. "alt-text" for checkboxes, useful for accessibility). If not provided, label text will be used.
   * @examples 'Some Title'
   */
  "title": PropTypes.string,

  /**
   * Used to pass a function for custom validation. Should return either true or false.
   */
  "valid": PropTypes.func,

  /**
   * The value of the Checkbox.
   */
  "value": PropTypes.string,

  /**
   * Sets the status of the Checkbox. Options are null, "success", "error", and "warning".
   * @examples '<Checkbox status="error" />'
   */
  "status": PropTypes.string,

  /**
   * Sets the status message of the Checkbox.
   * @examples '<Checkbox
   label="Required Example"
   valid={ function(checked){ return {status: "success", message: "Checkbox is required"} } }
   />'
   */
  "message": PropTypes.string
};

Checkbox.defaultProps = {
  "className": "",
  "disabled": false,
  "inline": false,
  "checked": false,
  "required": false
};

export default CSSModules(Checkbox, styles, { "allowMultiple": true });
