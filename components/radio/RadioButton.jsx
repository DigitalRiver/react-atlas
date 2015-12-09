import React from 'react';
import classNames from 'classnames/bind';
import style from './style.css';

class RadioButton extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    value: React.PropTypes.any
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
  }

  _handleFocus = (event) => {
    if (!this.props.disabled && this.props.onFocus) {
      this.props.onFocus(event, this);
    }
  }

  render () {
    const {checked, className, disabled, inline} = this.props;

    var cx = classNames.bind(style);

    let labelClassName = cx({
      block: !inline,
      inline: inline,
      disabled: disabled
    });

    if(this.props.className) labelClassName += ` ${this.props.className}`
    
    return (
      <label className={labelClassName}>
        <input
          {...this.props}
          onChange={this._handleChange}
          onClick={this._handleClick}
          onBlur={this._handleBlur}
          onFocus={this._handleFocus}
          type='radio'
        />
        {this.props.label ? <span> {this.props.label}</span> : null}
      </label>
    );
  }
}

export default RadioButton;
