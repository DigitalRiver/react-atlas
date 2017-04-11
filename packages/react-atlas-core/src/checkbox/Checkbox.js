import React, { PropTypes } from "react";
import cx from 'classNames';

/**
 * Simple component for a basic checkbox
 */
const Checkbox = (
  {
    title,
    label,
    checked,
    disabled,
    inline,
    className,
    ...props
  }
) => {

  const disabledStyle = disabled ? "disabled" : "";
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

  title = title ? title : label;

  const classes = cx(disabledStyle);

  return (
    <div styleName={"control-group"}>
      <label styleName={controlStyle} title={title}>
        <input
          {...props}
          type="checkbox"
          disabled={disabled}
          styleName={"input"}
          checked={checked}
        />
        {label && <div styleName={"control__indicator"}><span>{label}</span></div>}
      </label>
    </div>
  );
};

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
  "defaultChecked": PropTypes.bool
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
