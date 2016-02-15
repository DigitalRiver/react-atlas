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

export default Th;
