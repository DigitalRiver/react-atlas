import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { InputCore } from "../Input";
import messages from "../utils/messages.js";

/**
 * Simple component for a basic checkbox
 */
class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "checked": this.props.checked || false,
      "valid": true,
      "errorMessage": "",
      "focus": false
    };
  }

  // Handles new checkbox clicks and sets value and checked status of hidden input
  _clickHandler = event => {
    if (!this.props.disabled) {
      event.persist();
      if (typeof this.props.onBeforeChange !== "undefined") {
        let result = this.props.onBeforeChange(this.state.checked);
        if (result === false) {
          return;
        }
      }

      this.setState({ "checked": !this.state.checked }, function() {
        this._validationHandler(this.props.errorCallback);

        /* Check if onClick has been passed, if so call it. */
        if (typeof this.props.onClick !== "undefined") {
          this.props.onClick(
            this.props.value,
            event,
            this.state.valid,
            this.state.checked,
            this.props.disabled
          );
        }

        /* Check if onChange has been passed, if so call it. */
        if (typeof this.props.onChange !== "undefined") {
          this.props.onChange(
            this.props.value,
            event,
            this.state.valid,
            this.state.checked,
            this.props.disabled
          );
        }
      });
    }
  };

  _validationHandler = callback => {
    // If custom validation callback is provided set validationObject with response, otherwise check if required
    const validationObject = callback
      ? callback(event, this.state.checked)
      : {
          "valid":
            this.props.required && this.state.checked || !this.props.required,
          "message": this.props.requiredMessage || messages.requiredMessage
        };
    this.setState({
      "valid": validationObject.valid,
      "errorMessage": validationObject.message
    });
  };

  render() {
    const {
      label,
      title,
      className,
      id,
      name,
      groupError,
      inline,
      labelPosition,
      disabled,
      hidden,
      style
    } = this.props;
    // TODO: Figure out why, if moved to constructor, the following variables cause issues on click
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
    const error = groupError || !this.state.valid;
    let checkboxClass = cx({
      "checked": this.state.checked,
      "error": error,
      "not_checked": !this.state.checked,
      "focus": this.state.focus
    });

    const forId = id !== "" && name !== "" ? id : "";

    return (
      <div
        onClick={this._clickHandler}
        styleName={inlineCheckbox}
        style={style}
        className={cx(className)}
      >
        <div styleName={disabledClass}>
          {label && 
            <label styleName={labelStyle} title={title_label} htmlFor={forId}>
              {label}
            </label>
          }
          <div styleName={checkboxDisplay}>
            <InputCore
              label={label}
              type="checkbox"
              disabled={disabled}
              checked={this.state.checked}
              hidden={hidden}
              id={id}
              name={name}
              /* Hardcode classes for InputCore because classes on styleName will not
               * be evaluated because we are using InputCore rather than Input.  */
              className={
                "ra_Input__checkbox ra_styles__marg-b-1 ra_Input__max ra_Input__opacity"
              }
            />
            <div styleName={checkboxClass}>
              {this.state.checked && <div styleName={"checkmark"} />}
            </div>
          </div>
          {this.props.required && <span styleName={"error_text"}>*</span>}
        </div>
        {error &&
          !groupError && 
            <div styleName={"error_message"}>{this.state.errorMessage}</div>
          }
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
   * Used to pass a function for custom validation. Should return either true or false.
   */
  "errorCallback": PropTypes.func,

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
   * Will set the html "name" property on the input element.
   */
  "name": PropTypes.string,

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
   * When true, Checkbox will return an error onBlur or onChange if not checked.
   */
  "required": PropTypes.bool,

  /**
   * A custom message that will be displayed if required property is set to true and user does not check Checkbox.
   */
  "requiredMessage": PropTypes.string,

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
   * The value of the Checkbox.
   */
  "value": PropTypes.string
};

Checkbox.defaultProps = {
  "className": "",
  "disabled": false,
  "inline": false,
  "checked": false,
  "required": false
};

export default Checkbox;
