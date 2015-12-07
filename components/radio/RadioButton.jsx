import React from 'react';
import classNames from 'classnames/bind';
import Ripple from '../ripple';
import style from './style.css';
import events from '../utils/events';

class RadioButton extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    value: React.PropTypes.any
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

  handleChange = (event) => {
    if (!this.props.checked && this.props.onChange) {
      this.props.onChange(event, this);
    }
  };

  handleClick = (event) => {
    events.pauseEvent(event);
    if (!this.props.disabled) this.handleChange(event);
  };

  handleInputClick = (event) => {
    events.pauseEvent(event);
  };

  handleMouseDown = (event) => {
    if (!this.props.disabled) this.refs.ripple.start(event);
  };

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    var cx = classNames.bind(style);

    let labelClassName = cx({
      root: true,
      className: true
    });

    return (
      <label className={labelClassName} onClick={this.handleClick}>
        <input
          {...this.props}
          ref='input'
          className={style.input}
          onChange={this.handleChange}
          onClick={this.handleInputClick}
          type='radio'
        />
        {this.props.label ? <span className={style.text}>{this.props.label}</span> : null}
      </label>
    );
  }
}

export default RadioButton;
