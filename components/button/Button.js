import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Tooltip from '../tooltip';
import style from './button.css';

const propTypes = {
  accent: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  inverse: PropTypes.bool,
  label: PropTypes.string,
  loading: PropTypes.bool,
  mini: PropTypes.bool,
  primary: PropTypes.bool,
  raised: PropTypes.bool,
  tooltip: PropTypes.string,
  tooltipDelay: PropTypes.number,
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
  accent: false,
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

class Button extends Component {

  render () {

    const {accent, outline, href, icon, label, loading, mini,
           primary, raised, tooltip, secondary, success, warning, danger, link, large, small, block, disabled, children, ...others} = this.props;

    const element = href ? 'a' : 'button';

    const cx = classNames.bind(style);

    let className = cx({
        large,
        small,
        block,
        disabled
    });

    if (outline) {
      className += ' ' + cx({
        primary_outline: !secondary && !success && !warning && !danger && !link,
        secondary,
        success_outline: success,
        warning_outline: warning,
        danger_outline: danger,
        link_outline: link
      });
    } else {
      className += ' ' + cx({
        primary: !secondary && !success && !warning && !danger && !link,
        secondary,
        success,
        warning,
        danger,
        link
      });
    }

    if (this.props.className) className += ` ${this.props.className}`;
    let role;
    if (element === 'a') {
      role = 'button';
    }
    const props = {
      ...others,
      href,
      className,
      disabled: disabled || this.props.loading,
      role
    };

    return React.createElement(element, props,
      label,
      children
    );
  }
}

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
