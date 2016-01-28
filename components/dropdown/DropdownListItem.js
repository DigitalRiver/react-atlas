/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/
import React, { component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './dropdown.css';

const propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

const defaultProps = {
	className: ''
};

const DropdownListItem = ({ children, className, active, ...props }) => {

    const classes = classNames(className, style.item);

    return (
      <li {...props} className={classes}>
        {children}
      </li>
    )
};

export default DropdownListItem;