import React, { Component, PropTypes } from 'react';
import style from './style.css';
import classNames from 'classnames/bind';

const propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
  };

 const defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

class Switch extends Component {
  render () {
    const {checked, className, disabled, inline, name, slider, handle} = this.props;

    const cx = classNames.bind(style);
    let labelClassname = cx({
      slider: true,
      [className]: true
    });

    return (
      <label className={labelClassname}>
        <input className={style.input} type="checkbox"></input>
        <span className={style.handle}></span>
      </label>
    );
  }
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
