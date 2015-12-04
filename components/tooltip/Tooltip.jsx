import React from 'react';
import classNames from 'classnames/bind';
import style from './style.css';

const Tooltip = (ComposedComponent) => class extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
    tooltipHideOnClick: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    tooltipDelay: 0,
    tooltipHideOnClick: true
  };

  state = {
    active: false
  };

  handleMouseEnter = () => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() =>this.setState({active: true}), this.props.tooltipDelay);
    if (this.props.onMouseEnter) this.props.onMouseEnter();
  };

  handleMouseLeave = () => {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.state.active) this.setState({active: false});
    if (this.props.onMouseLeave) this.props.onMouseLeave();
  };

  handleClick = () => {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.props.tooltipHideOnClick) this.setState({active: false});
    if (this.props.onClick) this.props.onClick();
  }

  render () {
    const {children, className, tooltip, tooltipDelay, tooltipHideOnClick, ...other} = this.props;
    const cx = classNames.bind(style);
    let composedClassName = cx({
      base: true,
      className: true
    });
    let tooltipClassName = cx({
      tooltip: true,
      active: this.state.active
    });

    return (
      <ComposedComponent
        {...other}
        className={composedClassName}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children ? children : null}
        <span data-react-toolbox="tooltip" className={tooltipClassName}>{tooltip}</span>
      </ComposedComponent>
    );
  }
};

export default Tooltip;
