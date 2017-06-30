import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { InputCore } from "../Input";
import messages from "../utils/messages.js";

let labelStyle, title_label, disabledClass, checkboxDisplay;
/**
 * Simple component for a basic checkbox
 */
class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked || false,
      valid: true,
      errorMessage: "",
      focus: false
    };
    console.log(props.inline + ", " + props.name);
    labelStyle = cx({
      label: props.labelPosition !== "left",
      label_left: props.labelPosition === "left"
    });
    title_label = props.title ? props.title : props.label;
    disabledClass = props.disabled
      ? cx("disabled", "inline_block", "relative", "padding")
      : cx("inline_block", "relative", "padding");
    checkboxDisplay = props.labelPosition === "left"
      ? cx("float_right")
      : cx("float_left");
  }

  // Handles new checkbox clicks and sets value and checked status of hidden input
  _clickHandler = event => {
    if (!this.props.disabled) {
      /* Check if onClick has been passed, if so call it. */
      if (this.props.onClick) {
        /* Pass the event object, and a data object to the click handler.
         The data object contains a boolean for whether the checkbox was
         clicked or not, plus all the props passed to the object.  */
        this.props.onClick(event, {
          checked: this.state.checked,
          props: this.props
        });
      }

      this._handleChange();

      /* Check if onChange has been passed, if so call it. */
      if (this.props.onChange) {
        /* Pass the event object, and a data object to the click handler.
         The data object contains a boolean for whether the checkbox was
         clicked or not, plus all the props passed to the object.  */
        this.props.onChange(event, {
          checked: this.state.checked,
          props: this.props
        });
      }
    }
  };

  _validationHandler = callback => {
    // If custom validation callback is provided set validationObject with response, otherwise check if required
    const validationObject = callback
      ? callback(event, this.state.checked)
      : {
          valid:
            (this.props.required && this.state.checked) || !this.props.required,
          message: this.props.requiredMessage || messages.requiredMessage
        };
    this.setState({
      valid: validationObject.valid,
      errorMessage: validationObject.message
    });
  };

  _blur = callback => {
    this.setState({ focus: false });
    this._validationHandler(callback);
  };

  _focus = () => {
    this.setState({ focus: true });
  };

  _handleChange = () => {
    if (
      typeof this.props.onBeforeChange === "undefined" ||
      this.props.onBeforeChange(this.state.checked)
    ) {
      if (this.state.checked) {
        this.setState({ checked: false }, function() {
          this._validationHandler(this.props.errorCallback);
          if (typeof this.props.groupHandleClick !== "undefined") {
            this.props.groupHandleClick(this.state.checked);
          }
        });
      } else {
        this.setState({ checked: true }, function() {
          this._validationHandler(this.props.errorCallback);
          if (typeof this.props.groupHandleClick !== "undefined") {
            this.props.groupHandleClick(this.state.checked);
          }
        });
      }
    }
  };

  render() {
    const {
      label,
      disabled,
      className,
      name,
      groupError,
      errorCallback,
      inline
    } = this.props;
    const inlineCheckbox = cx({ inline_block: inline, checkbox_padding: true }); // Leave in render function, If moved to constructor it will cause an error with CheckboxGroup
    const error = groupError || !this.state.valid;
    let checkboxClass = cx({
      checked: this.state.checked,
      error: error,
      not_checked: !this.state.checked,
      focus: this.state.focus
    });

    return (
      <div
        onClick={this._clickHandler}
        styleName={inlineCheckbox}
        onFocus={() => {
          this._focus();
        }}
        onBlur={() => {
          this._blur(errorCallback);
        }}
      >
        <div styleName={disabledClass}>
          {label &&
            <label
              styleName={labelStyle}
              title={title_label}
              className={cx(className)}
            >
              {label}
            </label>}
          <div styleName={checkboxDisplay}>
            <InputCore
              label={label}
              type="checkbox"
              disabled={disabled}
              checked={this.state.checked}
              hidden={disabled}
              name={name}
            />
            <div styleName={checkboxClass}>
              {this.state.checked && <div styleName={cx("checkmark")} />}
            </div>
          </div>
        </div>
        {error &&
          !groupError &&
          <div styleName={cx("error_message")}>{this.state.errorMessage}</div>}
      </div>
    );
  }
}

Checkbox.propTypes = {
  /**
   * Text for checkbox label
   * @examples 'Some Label'
   */
  label: PropTypes.string,
  /**
   * A css class name that will be appended to the wrapping <label> element around the <input> and <span> elements.
   */
  className: PropTypes.string,
  /**
   * If included, checkbox is disabled
   * @examples <Checkbox disabled />, <Checkbox disabled={true} />
   */
  disabled: PropTypes.bool,
  /**
   * If included, renders the checkbox and it's label inline, so it can be side-by-side to other content.
   */
  inline: PropTypes.bool,
  /**
   * Text for checkbox label title. (i.e. "alt-text" for checkboxes, useful for accessibility). If not provided, will be label text.
   * @examples 'Some Title'
   */
  title: PropTypes.string,
  /**
   * Defines if checkbox should be checked on load.
   */
  checked: PropTypes.bool,
  /**
   * Allows user to pass a callback for click events.
   */
  onClick: PropTypes.func,
  /**
   * Allows user to pass a function to be executed when the checkbox state is changed.
   */
  onChange: PropTypes.func,
  /**
   * Allows user to ask for user feedback before changing the "checked" state of the checkbox.
   */
  onBeforeChange: PropTypes.func,
  /**
   * If included, checkbox will return and error onBlur or onChange if not checked.
   */
  required: PropTypes.bool,
  /**
   * A custom message to be displayed if required property is set to true..
   */
  requiredMessage: PropTypes.string,
  /**
   * Allows the user to pass a function for custom validation. Should return either true or false.
   */
  errorCallback: PropTypes.func,
  /**
   * Determines if the checkbox label is to the left or the right of the checkbox.
   */
  labelPosition: PropTypes.string,
  /**
   * Sets the html "name" property on the input element.
   */
  name: PropTypes.string,
  /**
   * Updates the parent CheckboxGroup component when state changes.
   */
  groupHandleClick: PropTypes.func,
  /**
   * States whether or not an error state has been passed down from the parent CheckboxGroup.
   */
  groupError: PropTypes.bool
};

Checkbox.defaultProps = {
  className: "",
  disabled: false,
  inline: false,
  checked: false,
  required: false
};

export default Checkbox;
