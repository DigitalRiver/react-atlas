import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { InputCore } from "../Input";

class Radio extends React.PureComponent {
  constructor(props) {
    super(props);

    /* Classes and styles setup */
    let inlineRadio = cx(
      {
        "inline_block": this.props.inline,
        "hidden": this.props.hidden
      },
      "radio_padding"
    );

    let labelStyle = cx({
      "label": this.props.labelPosition !== "left",
      "label_left": this.props.labelPosition === "left"
    });

    let radioDisplay =
      this.props.labelPosition === "left" ? "float_right" : "float_left";

    let labelTitle = this.props.title ? this.props.title : this.props.label;

    this.classes = {
      inlineRadio,
      labelStyle,
      labelTitle,
      radioDisplay
    };
  }

  // Handles new radio clicks and sets value and checked status of hidden input
  _clickHandler = event => {
    if (!this.props.disabled) {
      /* Check if onClick has been passed, if so call it. */
      if (this.props.onClick) {
        /* Pass the event object, and a data object to the click handler.
         The data object contains a boolean for whether the radio was
         clicked or not, plus all the props passed to the object.  */
        this.props.onClick(event, {
          "checked": this.props.checked,
          "props": this.props
        });
      }

      this._handleChange();

      /* Check if onChange has been passed, if so call it. */
      if (this.props.onChange) {
        /* Pass the event object, and a data object to the change handler.
         The data object contains a boolean for whether the radio was
         clicked or not, plus all the props passed to the object.  */
        this.props.onChange(event, {
          "checked": this.props.checked,
          "props": this.props
        });
      }
    }
  };

  _handleChange = () => {
    if (
      typeof this.props.onBeforeChange === "undefined" ||
      this.props.onBeforeChange(this.props.checked)
    ) {
      if (!this.props.checked) {
        this.props.groupSetChecked(this.props.value);
      }
    }
  };

  render() {
    const {
      className,
      value,
      label,
      name,
      checked,
      disabled,
      hidden,
      style
    } = this.props;

    const { inlineRadio, labelStyle, labelTitle, radioDisplay } = this.classes;

    let radioClass = cx({
      "checked": checked,
      "not_checked": !checked
    });

    let disabledClass = disabled
      ? cx("disabled", "inline_block", "relative", "padding")
      : cx("inline_block", "relative", "padding");

    return (
      <div style={style} onClick={this._clickHandler} styleName={inlineRadio}>
        <div styleName={disabledClass}>
          {label && 
            <label
              styleName={labelStyle}
              title={labelTitle}
              className={cx(className)}
            >
              {label}
            </label>
          }
          <div styleName={radioDisplay}>
            <InputCore
              label={label}
              type="radio"
              checked={checked}
              disabled={disabled}
              hidden={hidden}
              name={name}
              value={value}
              /* Hardcode classes for InputCore because classes on styleName will not
               * be evaluated because we are using InputCore rather than Input.  */
              className={"ra_Input__max ra_Input__opacity"}
            />
            <div styleName={radioClass}>
              {checked && <div styleName={"checkmark"} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Radio.propTypes = {
  /**
   * Determines if the radio button is checked by default.
   * @examples '<Radio defaultChecked/>'
   */
  "defaultChecked": PropTypes.bool,
  /** An Object, array, or string of CSS classes to apply to Radio.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Define the element title.
   * @examples '<Radio title="Test"/>'
   */
  "title": PropTypes.string,
  /**
   * Determines if the radio button is checked.
   * @examples '<Radio checked/>'
   */
  "checked": PropTypes.bool,
  /**
   * Determines if the radio button is disabled.
   * @examples '<Radio disabled/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the radio button is hidden.
   * @examples '<Radio hidden/>'
   */
  "hidden": PropTypes.bool,
  /**
   * Determines if the radio button is displayed as an inline element.
   * @examples '<Radio inline/>'
   */
  "inline": PropTypes.bool,
  /**
   * Define a label for the radio button.
   * @examples '<Radio label="test"/>'
   */
  "label": PropTypes.string,
  /**
   * Defines the label position.
   * @examples '<Radio labelPosition="top"/>'
   */
  "labelPosition": PropTypes.string,
  /**
   * Define a name for the radio button. Not necessary if using radio group component as wrapper.
   * @examples '<Radio name="test"/>'
   */
  "name": PropTypes.string,
  /**
   * Sets a handler function to be executed when onChange event occurs.
   * @examples '<Radio onChange={onChangeHandler}/>'
   */
  "onChange": PropTypes.func,
  /**
   * Sets a handler function to be executed when onClick event occurs.
   * @examples '<Radio onClick={onClickHandler}/>'
   */
  "onClick": PropTypes.func,
  /**
   * Sets a handler function to be executed before onChange event occurs.
   * @examples '<Radio onBeforeChange={onBeforeChangeHandler}/>'
   */
  "onBeforeChange": PropTypes.func,
  /**
   * Inner function to be used as a callback to send to RadioGroup component.
   * @examples '<Radio groupSetChecked={...}/>'
   */
  "groupSetChecked": PropTypes.func,
  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,
  /**
   * Define a value for the radio button.
   * @examples '<Radio value="100"/>'
   */
  "value": PropTypes.any
};

Radio.defaultProps = {
  "className": "",
  "disabled": false,
  "hidden": false,
  "inline": false
};

export default Radio;
