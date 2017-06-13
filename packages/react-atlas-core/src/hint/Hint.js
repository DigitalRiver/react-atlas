import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

/**
 * Simple wrapper around a span to add 'hint'-like styles
 */
const Hint = ({ children, className, ...props }) => {
  return <span {...props} className={cx(className)} styleName={cx("base")}>{children}</span>;
};

Hint.propTypes = {
  "children": PropTypes.node
};

Hint.styleguide = {
  "category": "Form Components",
  "index": "3.5",
  "example": 
    `
<div>
  <p>Here is some regular text. <Hint>Some Hint text</Hint></p>
  <Input label="Here is a Label" placeholder="Placeholder Text" />
  <Hint>some Hint text below the input</Hint>
</div>
`
  
};

export default Hint;
