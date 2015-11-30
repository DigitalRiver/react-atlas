import React from 'react';
import classNames from 'classnames/bind';
import FontIcon from '../font_icon';
import Tooltip from '../tooltip';
import style from './style.css';

class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    outline: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    label: React.PropTypes.string,
    mini: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    raised: React.PropTypes.bool,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
    type: React.PropTypes.string
  };

  static defaultProps = {
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

  handleMouseDown = (event) => {
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  handleMouseUp = () => {
    this.refs.button.blur();
  };

  render () {

    const {accent, outline, href, icon, label, loading, mini,
           primary, raised, tooltip, secondary, success, warning, danger, link, large, small, block, disabled, children, ...others} = this.props;
    const element = href ? 'a' : 'button';
    var cx = classNames.bind(style);
    let className = cx({
        large: large,
        small: small,
        block: block,
        disabled: disabled
    });

    if (outline) {
      className += ' '+ cx({
        outline: true,
        primary_outline: primary,
        secondary: secondary,
        success_outline: success,
        warning_outline: warning,
        danger_outline: danger,
        link_outline: link
      });
    } else {
      className += ' '+ cx({
        root: true,
        primary: !secondary,
        secondary: secondary,
        success: success,
        warning: warning,
        danger: danger,
        link: link
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
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleTouchStart,
      onMouseUp: this.handleMouseUp,
      role: role,
      'data-react-toolbox': 'button'
    };

    return React.createElement(element, props,
      tooltip ? <Tooltip className={style.tooltip} label={tooltip}/> : null,
      icon ? <FontIcon className={style.icon} value={icon}/> : null,
      label,
      children
    );
  }
}

export default Button;
