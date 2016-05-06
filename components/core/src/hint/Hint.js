import React from 'react';

/**
 * Simple wrapper around a span to add 'hint'-like styles
 */
const Hint = ({children, theme = {}, ...props}) => {
	return (
		<span {...props} className={theme.base}>{children}</span>
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
