import React from 'react';
import style from './list.css';

const propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node
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