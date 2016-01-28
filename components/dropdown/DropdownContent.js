/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/
import React, { component, PropTypes } from 'react';
import style from '../dropdown.css';

const propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

const defaultProps = {
	className: ''
};

const DropdownContent = ({ children, className, ...props }) => {
    const classes = `${style.list} ${className}`;

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    )
};

export default DropdownContent;