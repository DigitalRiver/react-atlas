import React from 'react';
import style from './hint.css';

const Hint = ({className, children, ...props}) => {
	let classNames = style.base;
	if (className) classNames += ` ${className}`;
	return (
		<span {...props} className={classNames}>{children}</span>
	)
};

export default Hint;
