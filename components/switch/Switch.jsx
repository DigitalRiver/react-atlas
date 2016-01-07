import React from 'react';
import style from './style.css';
import classNames from 'classnames/bind';

class Switch extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onColor: React.PropTypes.string,
    offColor: React.PropTypes.string,
    buttonColor: React.PropTypes.string
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false,

  };  

  render () {
 
    const {checked, className, disabled, inline, name, slider, small, medium, large, onColor, offColor, buttonColor} = this.props;

    var cx = classNames.bind(style);

    let labelClassName = cx({
      sliderSmall: small && !medium && !large,
      sliderMedium: !small && !large,
      sliderLarge: large && !medium && !small,
      disabled
    });

    let inputClassName = cx({
      inputSmall: small && !medium && !large,
      inputMedium: !small && !large,
      inputLarge: large && !medium && !small,
      disabled
    });

    let spanClassName = cx({
      handleSmall: small && !medium && !large,
      handleMedium: !small && !large,
      handleLarge: large && !medium && !small,
      disabled
    });

    var offColorStyle = {
      background: offColor
    };
    var onColorStyle = {
        background: onColor
    };

    var buttonColorStyle = {
      background: buttonColor
    };

    return (
      <label className={labelClassName} style={offColorStyle}>
        <input className={inputClassName} style={onColorStyle} type="checkbox" />
        <span className={spanClassName} style={buttonColorStyle}></span>
      </label>
    );
  }
}

export default Switch;
