import React from 'react';
import classNames from 'classnames/bind';
import style from './style.css';

const propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  tooltipDelay: React.PropTypes.number,
  tooltipHideOnClick: React.PropTypes.bool
};

const defaultProps = {
  className: ''
};

const Tooltip = (ComposedComponent) => class extends React.Component {
  render () {
    const {children, position, tooltip, ...other} = this.props;

    let cx = classNames.bind(style);

    let tooltipClasses = cx({
      ["tooltip"]: true,
      ["tooltip-top"]: position !== 'left' &&  position !== 'bottom' && position !== 'right',
      ["tooltip-left"]: position == 'left',
      ["tooltip-bottom"]: position == 'bottom',
      ["tooltip-right"]: position == 'right'
    });

    return (
      <ComposedComponent
        {...other}
        data-tooltip={tooltip}
        className={tooltipClasses}
      >
        {children ? children : null}
      </ComposedComponent>
    );
  }
};

Tooltip.propTypes = propTypes;

Tooltip.defaultProps = defaultProps;

export default Tooltip;
