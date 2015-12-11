import React from 'react';
import classNames from 'classnames/bind';
import style from './style.css';

let cx = classNames.bind(style);

const Tooltip = (ComposedComponent) => class extends React.Component {

  render () {
    const {children, position, tooltip, tooltipDelay, tooltipHideOnClick, ...other} = this.props;

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
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        data-tooltip={tooltip}
        className={tooltipClasses}
      >
        {children ? children : null}
      </ComposedComponent>
    );
  }
};

Tooltip.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  tooltip: React.PropTypes.string,
  tooltipDelay: React.PropTypes.number,
  tooltipHideOnClick: React.PropTypes.bool
};

Tooltip.defaultProps = {
    className: ''
  };

export default Tooltip;
