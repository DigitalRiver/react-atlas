import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './radio.css';

const propTypes = {
  defaultChecked: PropTypes.bool,
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

const defaultProps = {
  className: '',
  disabled: false,
  inline: false
};

const Radio = ({className, disabled, inline, name, label, ...props}) => {
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
        {...props}
        disabled={disabled}
        name={name}
        type="radio"
      />
      {label ? <span> {label}</span> : null}
    </label>
  );
};

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
