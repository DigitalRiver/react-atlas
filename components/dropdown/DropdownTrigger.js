/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/

import React, { createClass, PropTypes } from 'react';
import style from './dropdown.css';

const DropdownTrigger = ({ children, ...props }) => (
	  <a
	    {...props}
	    href="#dropdown-trigger"
	  >
	    {children}
	  </a>
);

DropdownTrigger.propTypes = {
	children: PropTypes.any
};

export default DropdownTrigger;