import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './table.css';

const propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

const defaultProps = {
  className: ''
};

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

Th.propTypes = propTypes;
Th.defaultProps = defaultProps;

export default Th;
