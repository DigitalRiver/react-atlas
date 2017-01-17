import React, { Component, PropTypes } from 'react';
import themeable from 'react-themeable';
import { classNames } from '../utils';

export default class Switch extends React.Component {

  render () {

    const {checked,  disabled, inline, name, slider, small, medium, large, onColor, offColor, buttonColor, ...other} = this.props;

    const theme = themeable(other.theme);

    let offClassName = classNames({
      sliderSmall: small && !medium && !large,
      sliderMedium: !small && !large,
      sliderLarge: large && !medium && !small,
      disabled
    });

    let inputClassName = classNames({
      inputSmall: small && !medium && !large,
      inputMedium: !small && !large,
      inputLarge: large && !medium && !small,
      disabled
    });

    let buttonClassName = classNames({
      handleSmall: small && !medium && !large,
      handleMedium: !small && !large,
      handleLarge: large && !medium && !small,
      disabled
    });

    let onClassName = classNames({
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
      <label {...theme(1, ...offClassName)} style={offColorStyle}>
        <input {...theme(2, ...inputClassName)} style={onColorStyle} type="checkbox" />
        <div {...theme(3, ...buttonClassName)} style={buttonColorStyle}></div>
        <div {...theme(4, ...onClassName)} style={onColorStyle}></div>
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
    disabled: false,
    theme: {
      sliderMedium: '!small && !large'
    }
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
