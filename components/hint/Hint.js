import React from 'react';
import style from './hint.css';

/**
 * Simple wrapper around a span to add 'hint'-like styles
 */
const Hint = ({className, children, ...props}) => {
	let classNames = style.base;
	if (className) classNames += ` ${className}`;
	return (
		<span {...props} className={classNames}>{children}</span>
	)
};

Hint.styleguide = {
  category: 'Form Components',
  index: '3.5',
  example: `
<div>
  <p>Here is some regular text. <Hint>Some Hint text</Hint></p>
  <Input label="Here is a Label" placeholder="Placeholder Text" />
  <Hint>some Hint text below the input</Hint>
</div>  
`
};

export default Hint;
