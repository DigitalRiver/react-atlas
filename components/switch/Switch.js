import React, { Component, PropTypes } from 'react';
import style from './switch.css';
import classNames from 'classnames/bind';

class Switch extends React.Component {

  render () {

    const {checked,  disabled, inline, name, slider, small, medium, large, onColor, offColor, buttonColor} = this.props;

    var cx = classNames.bind(style);

    let offClassName = cx({
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

    let buttonClassName = cx({
      handleSmall: small && !medium && !large,
      handleMedium: !small && !large,
      handleLarge: large && !medium && !small,
      disabled
    });

    let onClassName = cx({
      onColorSmall: small && !medium && !large,
      onColorMedium: !small && !large,
      onColorLarge: large && !medium && !small
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
      <label className={offClassName} style={offColorStyle}>
        <input className={inputClassName} style={onColorStyle} type="checkbox" />
        <div className={buttonClassName} style={buttonColorStyle}></div>
        <div className={onClassName} style={onColorStyle}></div>
      </label>
    );
  }
}

Switch.propTypes = {
    disabled: React.PropTypes.bool,
    name: React.PropTypes.string,
    onColor: React.PropTypes.string,
    offColor: React.PropTypes.string,
    buttonColor: React.PropTypes.string
};

Switch.defaultProps = {
    checked: false,
    className: '',
    disabled: false
};

Switch.styleguide = {
  category: 'Form Components',
  index: '3.12',
  example: `
<section>
  <h5>Toggle Switches</h5>
  <Switch />

  <h5>Toggle Switch Colors</h5>

  <p>On Switch Color</p>
  <Switch onColor="black"/>

  <p>Off Switch Color</p>
  <Switch offColor="black"/>

  <p>Button Switch Color</p>
  <Switch buttonColor='black'/>

  <p>Disabled</p>
  <Switch disabled/>

  <h5>Switch sizes</h5>
  <p>Small</p>
  <Switch small/>

  <p>Medium</p>
  <Switch medium checked />

  <p>Large</p>
  <Switch large/>
</section>
`
};
export default Switch;
