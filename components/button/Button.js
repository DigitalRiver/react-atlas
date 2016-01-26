import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import Tooltip from '../tooltip';
import style from './button.css';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  primary: PropTypes.bool,
  type: PropTypes.string,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  link: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  block: PropTypes.bool
};

const defaultProps = {
  className: '',
  outline: false,
  loading: false,
  mini: false,
  primary: false,
  secondary: false,
  success: false,
  warning: false,
  danger: false,
  link: false,
  raised: false,
  large: false,
  small: false,
  disabled: false
};

const Button = ({className, outline, href, loading, primary, secondary, success, warning, danger, link, large, small, block, disabled, children, ...others}) => {

    const element = href ? 'a' : 'button';
    const cx = ClassNames.bind(style);
    let classNames = cx({
        large,
        small,
        block,
        disabled,
        className
    });

    if (outline) {
      classNames += ' ' + cx({
        primary_outline: !secondary && !success && !warning && !danger && !link,
        secondary,
        success_outline: success,
        warning_outline: warning,
        danger_outline: danger,
        link_outline: link
      });
    } else {
      classNames += ' ' + cx({
        primary: !secondary && !success && !warning && !danger && !link,
        secondary,
        success,
        warning,
        danger,
        link
      });
    }

    let role;
    if (element === 'a') {
      role = 'button';
    }
    const props = {
      ...others,
      href,
      className,
      disabled: disabled || loading,
      role
    };

    return React.createElement(element, props,
      children
    );

};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
