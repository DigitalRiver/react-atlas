import React from 'react';
import ClassNames from 'classnames';
import * as FontAwesome from './fa';

const propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  value: React.PropTypes.string
};

const defaultProps = {
  className: ''
};

const FontIcon = ({ children, className, value, ...other}) => {
  let icon = value;
  let iconValue = value.replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });

  iconValue = iconValue.charAt(0).toUpperCase() + iconValue.slice(1);

  if (FontAwesome[iconValue]) {
    icon = React.createElement(FontAwesome[iconValue], null)
  }

  const classes = ClassNames(className);

  return (
    <span className={classes} {...other} >
      {icon ? icon : children}
    </span>
  );
};

FontIcon.propTypes = propTypes;
FontIcon.defaultProps = defaultProps;

export default FontIcon;
