import React from 'react';
import classNames from 'classnames';
import FontIcon from '../font_icon';
import Tooltip from '../tooltip';
import style from './style';
import events from '../utils/events';

class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    outline: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    mini: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    raised: React.PropTypes.bool,
    toggle: React.PropTypes.bool,
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
    toggle: false,
    large: false,
    small: false,
    disabled: false
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  handleTouchStart = (event) => {
    events.pauseEvent(event);
    if (this.props.onTouchStart) this.props.onTouchStart(event);
  };

  render () {

    const {accent, outline, href, icon, label, loading, mini,
           primary, raised, tooltip, secondary, success, warning, danger, link, large, small, block, disabled, ...others} = this.props;
    const element = href ? 'a' : 'button';
    let className = classNames({
        [style.root]: true,
        [style.large]: large,
        [style.small]: small,
        [style.block]: block,
        [style.disabled]: disabled
    });

    if (outline) {
      className += ' '+ classNames({
        [style.primary_outline]: outline,
        [style.secondary_outline]: secondary,
        [style.success_outline]: success,
        [style.warning_outline]: warning,
        [style.danger_outline]: danger,
        [style.link_outline]: link
      });
    } else {
      className += ' '+ classNames({
        [style.secondary]: secondary,
        [style.success]: success,
        [style.warning]: warning,
        [style.danger]: danger,
        [style.link]: link
      });
    }

    if (this.props.className) className += ` ${this.props.className}`;
    if (mini) className += ` ${style.mini}`;

    const props = {
      ...others,
      href,
      className,
      disabled: disabled || this.props.loading,
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleTouchStart
    };

    return React.createElement(element, props,
      tooltip ? <Tooltip className={style.tooltip} label={tooltip}/> : null,
      icon ? <FontIcon className={style.icon} value={icon}/> : null,
      label ? label : this.props.children
    );
  }
}

export default Button;
