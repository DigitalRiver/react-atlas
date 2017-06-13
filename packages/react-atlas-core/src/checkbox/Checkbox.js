import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';
import { InputCore } from "../input";

/**
 * Simple component for a basic checkbox
 */
class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "inputValue": '',
      "checked": this.props.defaultChecked || false
    };
  }

  // Handles new checkbox clicks and sets value and checked status of hidden input
  _clickHandler = event => {
    /* Check if onClick has been passed, if so call it. */
    if (this.props.onClick) {
      /* Pass the event object, and a data object to the click handler.
       The data object contains a boolean for whether the checkbox was
       clicked or not, plus all the props passed to the object.  */
      this.props.onClick(event, {"checked": this.state.checked, "props": this.props});
    }

    if (this.state.checked === true) {
      this.setState({ checked: false });
    } else {
      this.setState({ checked: true });
    }

    /* Check if onChange has been passed, if so call it. */
    if (this.props.onChange) {
      /* Pass the event object, and a data object to the click handler.
       The data object contains a boolean for whether the checkbox was
       clicked or not, plus all the props passed to the object.  */
      this.props.onChange(event, {"checked": this.state.checked, "props": this.props});
    }
  };

  render() {
    const { title, label, disabled, inline, className } = this.props;
    const display = inline ? "inline" : "block";
    const controlStyle = cx("control", "control--checkbox", display);
    const title_label = title ? title : label;
    const labelClasses = this.state.checked
      ? cx("checked", display)
      : cx("not_checked", display);

    return (
      <div onClick={this._clickHandler}>  
        <InputCore
          label={label}
          type="checkbox"
          disabled={disabled}
          checked={this.state.checked}
        />
        <label
          styleName={controlStyle}
          title={title_label}
          className={cx(className)}
        >
        {label &&
          <div styleName={labelClasses}>
            <div styleName={"label_left"}>{label}</div>
          </div>}
        </label>
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
  onClick: PropTypes.func
};

Checkbox.defaultProps = {
  className: "",
  disabled: false,
  inline: false,
  checked: false
};

export default Checkbox;
