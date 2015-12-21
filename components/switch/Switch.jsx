import React from 'react';
import style from './style.css';
import classNames from 'classnames/bind';
import events from '../utils/events';

class Switch extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

  handleChange = (event) => {
    events.pauseEvent(event);
    if (this.props.onChange && !this.props.disabled) {
      const value = !this.refs.input.checked;
      this.props.onChange(value, event);
    }
  };

  render () {
    const switchClassName = style[this.props.checked ? 'on' : 'off'];
    if (this.props.className) labelClassName += ` ${this.props.className}`;

    const {checked, className, disabled, inline, name, slider, handle} = this.props;
    var cx = classNames.bind(style);

    return (
      <label className={style.slider}>
        <input className={style.input} type="checkbox"></input>
        <span className={style.handle}></span>
      </label>


    );
  }
}

export default Switch;
