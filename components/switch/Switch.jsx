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

    var black = "#000000";
    var divStyle = {
      background: black
    };

    var offColor2 = {
      background: offColor
    };
    var onColor2 = {
        background: onColor
    };

    var buttonColor2 = {
      background: buttonColor
    };

    return (
      <label className={labelClassName} style={onColor2}>
        <input className={inputClassName} style={offColor2} type="checkbox" />
        <span className={spanClassName} style={buttonColor2}></span>
      </label>
    );
  }
}

export default Switch;
