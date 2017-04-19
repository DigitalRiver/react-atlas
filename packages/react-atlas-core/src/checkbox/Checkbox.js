import React, { PropTypes } from "react";
import cx from 'classNames';

/**
 * Simple component for a basic checkbox
 */
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "active": false,
      "onChange": this.props.onChange
    };
  }


  _clickHandler = (event) => {
    const selected = event.target.innerText;
    if (this.wrapperRef && this.wrapperRef.contains(event.target)) {
      console.log("state-inner?: ", this.state.active)

      this.setState({
        'active': !this.state.active
      })
    }
    console.log("state-outer?: ", this.state.active)
  };

  render() {
    const { title, label, checked, disabled, inline, className, defaultChecked, ...props } = this.props;
    const inlineText = inline ? "inline" : "";
    const componentClasses = cx({
      "block": !inline,
      inline,
      disabled,
      [className]: className
    });

    const controlStyle = cx({
      "control": true,
      "control--checkbox": true
    })

    const title_label = title ? title : label;

    const classes = cx(inline);
    const labelClasses = cx("control__indicator", inlineText);

    return (
      <label styleName={controlStyle} title={title_label} ref={(checkbox) => { this.wrapperRef = checkbox; }}>
        <CheckboxInput checked={this.state.active} disabled={disabled} defaultChecked={this.props.defaultChecked} label={label}/>

        {label && <div styleName={labelClasses} onClick={this._clickHandler.bind(this)}><div styleName={"control__label"}>{label}</div></div>}
      </label>
    );
  }
}

class CheckboxInput extends React.Component {

  render() {
    const { checked, className, defaultChecked, disabled, ...props } = this.props;
    return (
      <input
        type="checkbox"
        styleName={"input"}
        disabled={this.props.disabled}
        checked={this.props.checked}
        value={this.props.checked}
        defaultChecked={this.props.defaultChecked}
      />
    );
  }
}

CheckboxInput.propTypes = {
  /**
   * Defines if checkbox should be checked on load.
   */
  "checked": PropTypes.bool,
  /**
   * Defines if checkbox should be checked on load.
   */
  "defaultChecked": PropTypes.bool
};

CheckboxInput.defaultProps = { "className": "", "checked": false, "defaultChecked": false};

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

Checkbox.defaultProps = { "className": "", "disabled": false, "inline": false };

Checkbox.styleguide = {
  "category": "Form Components",
  "index": "3.2",
  "example": 
    `
<section style={{textAlign:"left"}}>
  <h4 style={{marginBottom: "10px"}}>Checkboxes</h4>
  <Checkbox
    defaultChecked={true}
    label="Checked"
  />
  <Checkbox
    defaultChecked={false}
    label="Not checked"

  />
  <Checkbox
    defaultChecked={true}
    label="Disabled checkbox"
    disabled
  />
  <Checkbox
    defaultChecked={false}
    label="Inline checkbox 1"
    inline
  />
  <Checkbox
    defaultChecked={false}
    label="Inline checkbox 2"
    inline
  />
</section>
`
  
};

export default Checkbox;