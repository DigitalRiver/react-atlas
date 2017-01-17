import React from 'react';
import themeable from 'react-themeable';

/**
 * Simple wrapper around a span to add 'hint'-like styles
 */
const Hint = ({children, ...props}) => {
	const theme = themeable(props.theme);
	return (
		<span {...props} {...theme(1, 'base')} >{children}</span>
	)
};

Hint.defaultProps = {
	theme: {
		'base': true
	}
}

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
