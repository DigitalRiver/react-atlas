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

Td.propTypes = propTypes;
Td.defaultProps = defaultProps;

export default Td;
