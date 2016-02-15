/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/
import React, { component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './dropdown.css';

const DropdownContent = ({ children, className, active, ...props }) => {
    const cx = classNames.bind(style);

    const classes = cx(className, {
        inactive: !active,
        active: active
    });

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    )
};

DropdownContent.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

DropdownContent.defaultProps = {
	className: ''
};

export default DropdownContent;