import React, { PropTypes, cloneElement } from "react";
import cx from "classNames";

const RadioGroup = ({ className, children, name, inline, ...props }) => {
  return (
    <div {...props} className={className} styleName={cx("radioGroup")}>
      {React.Children.map(children, child => {
        if (child.type.displayName === "Radio") {
          child = cloneElement(child, {
            name,
            inline
          });
        }

        return child;
      })}
    </div>
  );
};

RadioGroup.propTypes = {
  /**
   * Anything that can be in a radio group. Almost always radio components alone.
   * @examples '<RadioGroup><Radio/><Radio/></RadioGroup>'
   */
  "children": PropTypes.node,
  /**
   * Define a custom css class name.
   * @examples 'radioGroup', 'radio-group'
   */
  "className": PropTypes.string,
  /**
   * Form name for the element, this will set all Radio children the same form name (so they can't be selected at the same time).
   * @examples '<RadioGroup name="test"></RadioGroup>'
   */
  "name": PropTypes.string,
  /**
   * Defines if the radio group should display as an inline element.
   * @examples '<RadioGroup inline></RadioGroup>'
   */
  "inline": PropTypes.bool
};

RadioGroup.styleguide = {
  "category": "Form Components",
  "index": "3.9",
  "example": `
<section>
  <h5>RadioGroup with Radio Buttons</h5>
  <RadioGroup name="comic">
    <Radio label="Checked Radio" value="checkedRadio" defaultChecked />
    <Radio label="Disabled Radio" value="disabledRadio" disabled/>
    <Radio label="Inlined 1" value="inlined1" className="someClassIMadeUp" inline onFocus={this.handleFocus}/>
    <Radio label="Inlined2" value="inlined2" inline onBlur={this.handleBlur}/>
  </RadioGroup>
</section>
`
};

export default RadioGroup;
