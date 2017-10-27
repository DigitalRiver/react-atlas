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
      "disabled": this.props.disabled || false,
      "valid": true,
      "errorMessage": "",
      "focus": false
    };
  }

  // Handles new checkbox clicks and sets value and checked status of hidden input
  _clickHandler = event => {
    if (!this.state.disabled) {
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
            this.state.disabled
          );
        }

        /* Check if onChange has been passed, if so call it. */
        if (typeof this.props.onChange !== "undefined") {
          this.props.onChange(
            this.props.value,
            event,
            this.state.valid,
            this.state.checked,
            this.state.disabled
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
      name,
      groupError,
      inline,
      labelPosition,
      style
    } = this.props;
    // TODO: Figure out why, if moved to constructor, the following variables cause issues on click
    const inlineCheckbox = cx({
      "inline_block": inline,
      "checkbox_padding": !inline,
      "inline_padding": inline
    });
    const labelStyle = cx({
      "label": labelPosition !== "left",
      "label_left": labelPosition === "left"
    });
    const checkboxDisplay =
      labelPosition === "left" ? "float_right" : "float_left";
    const title_label = title ? title : label;
    let disabledClass = this.state.disabled
      ? cx({
          "disabled": true,
          "inline_block": true,
          "relative": true,
          "padding": !inline
        })
      : cx({ "inline_block": true, "relative": true, "padding": !inline });
    const error = groupError || !this.state.valid;
    let checkboxClass = cx({
      "checked": this.state.checked,
      "error": error,
      "not_checked": !this.state.checked,
      "focus": this.state.focus
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
            <label styleName={labelStyle} title={title_label}>
              {label}
            </label>
          }
          <div styleName={checkboxDisplay}>
            <InputCore
              label={label}
              type="checkbox"
              disabled={this.state.disabled}
              checked={this.state.checked}
              hidden={this.state.disabled}
              name={name}
              /* Hardcode classes for InputCore because classes on styleName will not
               * be evaluated because were using InputCore not Input.  */
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
   * Text for checkbox label
   * @examples 'Some Label'
   */
  "label": PropTypes.string,
  /** An Object, array, or string of CSS classes to apply to checkbox.*/
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
   * If included, renders the checkbox and it's label inline, so it can be side-by-side to other content.
   */
  "inline": PropTypes.bool,
  /**
   * Text for checkbox label title. (i.e. "alt-text" for checkboxes, useful for accessibility). If not provided, will be label text.
   * @examples 'Some Title'
   */
  "title": PropTypes.string,
  /**
   * Defines if checkbox should be checked on load.
   */
  "checked": PropTypes.bool,
  /**
   * Allows user to pass a callback for click events.
   */
  "onClick": PropTypes.func,
  /**
   * Allows user to pass a function to be executed when the checkbox state is changed.
   */
  "onChange": PropTypes.func,
  /**
   * Allows user to ask for user feedback before changing the "checked" state of the checkbox.
   */
  "onBeforeChange": PropTypes.func,
  /**
   * If included, checkbox will return and error onBlur or onChange if not checked.
   */
  "required": PropTypes.bool,
  /**
   * A custom message to be displayed if required property is set to true..
   */
  "requiredMessage": PropTypes.string,
  /**
   * Allows the user to pass a function for custom validation. Should return either true or false.
   */
  "errorCallback": PropTypes.func,
  /**
   * Determines if the checkbox label is to the left or the right of the checkbox.
   */
  "labelPosition": PropTypes.string,
  /**
   * Sets the html "name" property on the input element.
   */
  "name": PropTypes.string,
  /**
   * The value of the checkbox. This value is used by forms.
   */
  "value": PropTypes.string,
  /**
   * States whether or not an error state has been passed down from the parent CheckboxGroup.
   */
  "groupError": PropTypes.bool,

  /* Pass inline styles here. */
  "style": PropTypes.node
};

Checkbox.defaultProps = {
  "className": "",
  "disabled": false,
  "inline": false,
  "checked": false,
  "required": false
};

export default Checkbox;
