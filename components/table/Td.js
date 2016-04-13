import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './table.css';

const Td = ({className, children, ...props}) => {

	const cx = ClassNames.bind(style);
	const classNames = cx({
			td: true,
			className
		}
	);

	return (
	    <td {...props} className={classNames}>
	      {children}
	    </td>
	);
};

Td.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};
Td.defaultProps = {
  className: ''
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
