import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './table.css';

const Th = ({className, children, ...props}) => {
	const cx = ClassNames.bind(style);
	const classNames = cx({
			th: true,
			className
		}
	);

	return (
	    <th {...props} className={classNames}>
	      {children}
	    </th>
	);
};

Th.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

Th.defaultProps = {
  className: ''
};

Th.styleguide = {
  category: 'Table',
  index: '7.3',
  example: `
<section>
  <h5>Th Example</h5>
    <table>
      <thead>
        <tr>
          <Th>Heading</Th>
          <Th>Another</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Just Th</td>
          <td>No Thead, No Tr</td>
        </tr>
        <tr>
          <td>No Tbody, No Td</td>
          <td>No Table</td>
        </tr>
      </tbody>
    </table>
</section>
`
};

export default Th;
