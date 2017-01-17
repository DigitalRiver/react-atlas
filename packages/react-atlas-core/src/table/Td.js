import React, { PropTypes } from 'react';
import themeable from 'react-themeable';
import { classNames } from '../utils';

const Td = ({className, children, ...props}) => {

	const theme = themeable(props.theme);
	const classes = classNames({
			td: true
	}, className);

	return (
	    <td {...props} {...theme(1, ...classes)}>
	      {children}
	    </td>
	);
};

Td.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};
Td.defaultProps = {
  className: '',
	theme: {
		'td': true
	}
};

Td.styleguide = {
  category: 'Table',
  index: '7.6',
  example: `
<section>
  <h5>Td Example</h5>
    <table>
      <tbody>
        <tr>
          <Td>Just Td</Td>
          <Td>No Tr</Td>
        </tr>
        <tr>
          <Td>No Tbody</Td>
          <Td>No Table</Td>
        </tr>
      </tbody>
    </table>
</section>
`
};

export default Td;
