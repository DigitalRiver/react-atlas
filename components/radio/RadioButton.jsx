import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './radio.css';

class RadioButton extends Component {
  static propTypes = {
    checked: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.any
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false,
    inline: false
  };

  _handleChange = (event) => {
    if (!this.props.checked && this.props.onChange) {
      this.props.onChange(event, this);
    }
  };

  _handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event, this);
    }
  };

  _handleBlur = (event) => {
    if (!this.props.disabled && this.props.onBlur) {
      this.props.onBlur(event, this);
    }
  };

  _handleFocus = (event) => {
    if (!this.props.disabled && this.props.onFocus) {
      this.props.onFocus(event, this);
    }
  };

  render () {
    const {className, disabled, inline, name, label} = this.props;

    const cx = classNames.bind(style);

    const labelClassName = cx({
      block: !inline,
      inline,
      disabled,
      className
    });

    return (
      <label className={labelClassName}>
        <input
          {...this.props}
          name={name}
          onChange={this._handleChange}
          onClick={this._handleClick}
          onBlur={this._handleBlur}
          onFocus={this._handleFocus}
          type="radio"
        />
        {label ? <span> {label}</span> : null}
      </label>
    );
  }
}

export default RadioButton;
