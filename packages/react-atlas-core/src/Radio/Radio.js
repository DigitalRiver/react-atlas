import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Radio extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    /* Since Radio is controlled, the only changes that can occur need to come from property updates */
    if (this.props.onChange && nextProps.checked !== this.props.checked) {
      this.props.onChange({
        "checked": nextProps.checked,
        "value": this.props.value
      });
    }
  }

  // Handles new radio clicks and sets value and checked status of hidden input
  _clickHandler = () => {
    if (this.props.disabled) {
      return false;
    }

    if (this.props.onClick) {
      this.props.onClick({ "index": this.props.index, "value": this.props.value });
    }

    if (
      typeof this.props.onBeforeChange === "undefined" ||
      this.props.onBeforeChange({
        "checked": this.props.checked,
        "value": this.props.value
      })
    ) {
      this.props.groupSetChecked(this.props.index);
    }
  };

  render() {
    const {
      checked,
      className,
      disabled,
      hidden,
      id,
      inline,
      label,
      labelPosition,
      style,
      title,
      ...others
    } = this.props;

    /* Classes and styles setup */
    let wrapperStyles = cx(
      {
        "inline_block": inline,
        "hidden": hidden
      },
      "radio_padding"
    );

    let labelStyle = cx(
      {
        "label_left": labelPosition === "left"
      },
      "label"
    );

    let radioDisplay = labelPosition === "left" ? "float_right" : "float_left";

    let labelTitle = title || label;

    let radioClass = cx({
      "radio": true,
      "checked": checked
    });

    return (
      <div style={style} onClick={this._clickHandler} styleName={wrapperStyles}>
        <div
          styleName={cx({ disabled }, "inline_block", "relative", "padding")}
        >
          {label && 
            <label
              styleName={labelStyle}
              title={labelTitle}
              className={cx(className)}
              htmlFor={id}
            >
              {label}
            </label>
          }
          <div styleName={radioDisplay}>
            <input
              {...others}
              type="radio"
              checked={checked}
              disabled={disabled}
              hidden={hidden}
              id={id}
              styleName={cx("input_style")}
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
  /** Will set the html "id" property on the Radio. */
  "id": PropTypes.string,
  /** Represents the index of the Radio within the parent RadioGroup. */
  "index": PropTypes.number,
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
