import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './style.css';

const propTypes = {
  inline: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipDelay: PropTypes.number,
  tooltipHideOnClick: PropTypes.bool
};

const defaultProps = {
  className: ''
};

class Tooltip extends Component {
  render () {
    const {children, position, tooltip, inline, ...other} = this.props;

    let cx = classNames.bind(style);
    let tooltipClasses;
    if (!children.props.disabled) {
      tooltipClasses = cx({
        ["tooltip"]: true,
        ["tooltip-top"]: position !== 'left' && position !== 'bottom' && position !== 'right',
        ["tooltip-left"]: position == 'left',
        ["tooltip-bottom"]: position == 'bottom',
        ["tooltip-right"]: position == 'right'
      });
    }
    tooltipClasses = tooltipClasses ? tooltipClasses : '';

    let element = inline ? 'span' : 'div';
    
    const props = {
      ['data-tooltip']: tooltip,
      className: style.block + ' ' +tooltipClasses
    };

    return React.createElement(element, props, children);
  }
}

Tooltip.propTypes = propTypes;

Tooltip.defaultProps = defaultProps;

export default Tooltip;
