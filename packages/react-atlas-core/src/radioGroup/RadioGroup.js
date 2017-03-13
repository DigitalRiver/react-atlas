import React, { PropTypes } from "react";
import Radio from "../radio";
import cx from 'classNames';

const RadioGroup = ({ className, children, name, ...props }) => {
  return (
    <div {...props} styleName={className}>
      {React.Children.map(children, child => {
        if (child.type === Radio) {
          return <Radio {...child.props} name={name}/>;
        } else {
          return child;
        }
      })}
    </div>
  );
};

RadioGroup.propTypes = {
  "children": PropTypes.node,
  "className": PropTypes.string,
  "name": PropTypes.string
};

RadioGroup.styleguide = {
  "category": "Form Components",
  "index": "3.9",
  "example": 
    `
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
