import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './input.css';

const propTypes = {
    "disabled": PropTypes.bool,
    "className": PropTypes.string,
    "htmlFor": PropTypes.string,
    "maxLength": PropTypes.number,
    "inputText": PropTypes.string,
    "focus": PropTypes.string,
    "label": PropTypes.string,
    "multiline": PropTypes.bool,
    "type": PropTypes.string,
    "value": PropTypes.string,
    "onChange": PropTypes.func
  };

const defaultProps = {
    "disabled": false,
    "type": 'text',
    "inputLength": 0,
    "focus": false
  };

class Input extends Component {
    render () {
        const { disabled, label, maxLength, multiline, type, value, ...others} = this.props;

        const cx = classNames.bind(style);

        let inputClassName = cx({
          "input": type !== 'checkbox',
          "checkbox": type == 'checkbox',
          disabled,
          multiline,
          value
        });

        if (this.props.className) inputClassName += ` ${this.props.className}`;

        return (
          <div className={style.container}>
            <label {...this.props} className={style.label}>{label}</label>
            <input {...this.props} className={inputClassName} onChange={this.props.onChange} type={type} />
          </div>
        );
    }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
