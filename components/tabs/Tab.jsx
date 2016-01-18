import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './tabs.css';

const propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  label: PropTypes.any.isRequired,
  onActive: PropTypes.func,
  onClick: PropTypes.func
};

const defaultProps = {
  active: false,
  className: '',
  disabled: false,
  hidden: false
};

class Tab extends Component {
  componentDidUpdate (prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  _handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };

  render () {
    let { active, hidden, disabled, label } = this.props;

    const cx = ClassNames.bind(style);

    const className = cx({
      label: !active && !hidden && !disabled,
      active,
      hidden,
      disabled
    }, this.props.className);

    return (
      <label className={className} onClick={this._handleClick}>
        {label}
      </label>
    );
  }
}

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;
