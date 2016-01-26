import React from 'react';
import style from './list.css';

const propTypes = {
  caption: React.PropTypes.string.isRequired,
  legend: React.PropTypes.any
};

const ListText = ({className, children, ...props}) => {
	let classNames = style.text;
	if (className) classNames += ` ${className}`;
	return (
		<span {...props} className={style.text}>
			{children}
		</span>
	)
};

ListText.propTypes = propTypes;

export default ListText;