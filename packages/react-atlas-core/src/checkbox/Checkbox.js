import React, { PropTypes } from "react";
import cx from 'classNames';

/**
 * Simple component for a basic checkbox
 */
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "inputValue": '',
      "checked": this.props.defaultChecked || false
    };
  }

  // Handles new checkbox clicks and sets value and checked status of hidden input
  _clickHandler = (event) => {
    if (this.wrapperRef && this.wrapperRef.contains(event.target)) {
      if(this.state.inputValue === "off" || this.state.inputValue === "" || this.state.inputValue === null) {
        this.setState({'inputValue': "on"});
      } else {
        this.setState({'inputValue': "off"});
      }

      if(this.state.defaultChecked === true){
        this.setState({'checked': false})
      } else {
        this.setState({'checked': true})
      }

    }
  };

  render() {
    const { title, label, checked, disabled, inline, className, defaultChecked, ...props } = this.props;
    const inlineText = inline ? "inline" : "";
    const controlStyle = cx({
      "control": true,
      "control--checkbox": true
    })

    const title_label = title ? title : label;
    const labelClasses = cx("control__indicator", inlineText);

    return (
      <label styleName={controlStyle} title={title_label} ref={(checkbox) => { this.wrapperRef = checkbox; }} className={cx(className)}>
        <input
            {...props}
            name={label}
            type="checkbox"
            disabled={disabled}
            value={this.state.inputValue}
            defaultChecked={this.state.checked}
            />

        {label && <div styleName={labelClasses} onClick={this._clickHandler.bind(this)}><div styleName={"control__label"}>{label}</div></div>}
      </label>
    );
  }
}

Checkbox.propTypes = {
  /**
   * Text for checkbox label
   * @examples 'Some Label'
   */
  "label": PropTypes.string,
  /**
   * A css class name that will be appended to the wrapping <label> element around the <input> and <span> elements.
   */
  "className": PropTypes.string,
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
  "defaultChecked": PropTypes.bool,
  /**
   * Defines if checkbox should be checked on load.
   */
  "checked": PropTypes.bool
};

Checkbox.defaultProps = { "className": "", "disabled": false, "inline": false, "checked": false };

export default Checkbox;