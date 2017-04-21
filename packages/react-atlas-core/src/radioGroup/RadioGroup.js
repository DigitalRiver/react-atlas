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
  "children": PropTypes.node,
  "className": PropTypes.string,
  "name": PropTypes.string,
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
