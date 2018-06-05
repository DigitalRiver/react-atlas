import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./Radio.css";

export class Radio extends React.PureComponent {
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

  // Added to remove console warning for controlled/uncontrolled component
  _handleChange = () => {
    return false;
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
      /*eslint-disable */
      // Declaring the following variables so they don't get passed to the DOM element through the prop spread.
      groupSetChecked,
      onBeforeChange,
      /*eslint-enable */
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
              onChange={this._handleChange}
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
  /**
   * When true, Radio will be checked.
   * @examples '<Radio checked/>'
   */
  "checked": PropTypes.bool,

  /** An object, array, or string of CSS classes to apply to Radio.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, Radio will be disabled.
   * @examples '<Radio disabled/>'
   */
  "disabled": PropTypes.bool,

  /**
   * When true, Radio will be hidden.
   * @examples '<Radio hidden/>'
   */
  "hidden": PropTypes.bool,
  /** Will set the html "id" property on the Radio. */
  "id": PropTypes.string,
  /** Represents the index of the Radio within the parent RadioGroup. */
  "index": PropTypes.number,
  /**
   * When true, Radio will display inline.
   * @examples '<Radio inline/>'
   */
  "inline": PropTypes.bool,

  /**
   * Function that will be used as a callback to send to RadioGroup component.
   * @examples '<Radio groupSetChecked={...}/>'
   */
  "groupSetChecked": PropTypes.func,

  /**
   * Defines the text that will be displayed for Radio label.
   * @examples '<Radio label="test"/>'
   */
  "label": PropTypes.string,

  /**
   * Defines the label position.
   * @examples '<Radio labelPosition="top"/>'
   */
  "labelPosition": PropTypes.string,

  /**
   * Define a name for the Radio. Not necessary if using RadioGroup component as wrapper.
   * @examples '<Radio name="test"/>'
   */
  "name": PropTypes.string,

  /**
   * Function that will be executed before onChange event occurs.
   * @examples '<Radio onBeforeChange={onBeforeChangeHandler}/>'
   */
  "onBeforeChange": PropTypes.func,

  /**
   * Function that will be executed when onChange event occurs.
   * @examples '<Radio onChange={onChangeHandler}/>'
   */
  "onChange": PropTypes.func,

  /**
   * Function that will be executed when onClick event occurs.
   * @examples '<Radio onClick={onClickHandler}/>'
   */
  "onClick": PropTypes.func,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,

  /**
   * Defines the title attribute.
   * @examples '<Radio title="Test"/>'
   */
  "title": PropTypes.string,

  /**
   * Defines a value for the radio button.
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

export default CSSModules(Radio, styles, { "allowMultiple": true });
