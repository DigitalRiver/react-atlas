import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './tooltip.css';

class Tooltip extends Component {
  render () {
    const {children, position, tooltip, inline, ...other} = this.props;

    const cx = classNames.bind(style);
    let tooltipClasses;
    if (!children.props.disabled) {
      tooltipClasses = cx({
        ["tooltip"]: true,
        ["tooltip-top"]: position !== 'left' && position !== 'bottom' && position !== 'right',
        ["tooltip-left"]: position === 'left',
        ["tooltip-bottom"]: position === 'bottom',
        ["tooltip-right"]: position === 'right'
      });
    }
    tooltipClasses = tooltipClasses ? tooltipClasses : '';

    const element = inline ? 'span' : 'div';

    const props = {
      ['data-tooltip']: tooltip,
      className: style.block + ' ' + tooltipClasses
    };

    return React.createElement(element, props, children);
  }
}

Tooltip.propTypes = {
  inline: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipDelay: PropTypes.number,
  tooltipHideOnClick: PropTypes.bool,
  position: PropTypes.string
};

Tooltip.defaultProps = {
  className: '',
  children: <p>This is some text with tooltip</p>,
  tooltip: 'Sample Tooltip Text'
};

export default Tooltip;
