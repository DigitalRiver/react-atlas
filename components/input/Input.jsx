import React from 'react';
import classNames from 'classnames/bind';
import style from './style.css';

class Input extends React.Component {
  static propTypes = {
    "disabled": React.PropTypes.bool,
    "className": React.PropTypes.string,
    "htmlFor": React.PropTypes.string,
    "maxLength": React.PropTypes.number,
    "inputText": React.PropTypes.string,
    "focus": React.PropTypes.string
  };

  static defaultProps = {
    "disabled": false,
    "type": 'text',
    "inputLength": 0,
    "focus": false
  };

  render () {
    const { disabled, labelText, maxLength, multiline, type, value, ...others} = this.props;

    let cx = classNames.bind(style);

    let inputClassName = cx({
      "input": true,
      "disabled": disabled,
      "multiline": multiline,
      "value": value
    });

    let labelClassName = cx({
      label: true
    });

    if(this.props.className) inputClassName += ` ${this.props.className}`;


    return (
      <div data-react-toolbox='input'>
        <label className={labelClassName} {...this.props} >{labelText}</label>
        <input className={inputClassName} {...this.props} onChange={this._handleChange} type={type} ref='input'/>
      </div>
    );
  }
}

export default Input;