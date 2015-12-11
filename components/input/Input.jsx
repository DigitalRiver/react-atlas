import React from 'react';
import classNames from 'classnames/bind';
import FontIcon from '../font_icon';
import style from './style.css';

class Input extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    multiline: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
    type: React.PropTypes.string,
    value: React.PropTypes.any
  };

  static defaultProps = {
    className: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    type: 'text'
  };

  handleChange = (event) => {
    if (this.props.onChange) this.props.onChange(event.target.value, event);
  };

  renderInput () {
    const {multiline, value, ...others} = this.props;
    const className = classNames(style.input, {[style.filled]: value});

    return React.createElement(multiline ? 'textarea' : 'input', {
      ...others,
      className,
      onChange: this.handleChange,
      ref: 'input',
      role: 'input',
      value
    });
  }

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    const { children, disabled, error, floating, icon,
            label: labelText, maxLength, multiline, type, value, ...others} = this.props;
    const length = maxLength && value ? value.length : 0;
    const labelClassName = classNames(style.label, {[style.fixed]: !floating});

    const className = classNames(style.root, {
      [style.disabled]: disabled,
      [style.errored]: error,
      [style.hidden]: type === 'hidden',
      [style.withIcon]: icon
    }, this.props.className);

    let cx = classNames.bind(style);
    const classes = cx([

      ]);

    const InputElement = React.createElement(multiline ? 'textarea' : 'input', {
      ...others,
      className: classNames(style.input, {[style.filled]: value}),
      onChange: this.handleChange,
      ref: 'input',
      role: 'input',
      value
    });

    return (
      <div data-react-toolbox='input' className={className}>
        {InputElement}
        {icon ? <FontIcon className={style.icon} value={icon} /> : null}
        <span className={style.bar}></span>
        {labelText ? <label className={labelClassName}>{labelText}</label> : null}
        {error ? <span className={style.error}>{error}</span> : null}
        {maxLength ? <span className={style.counter}>{length}/{maxLength}</span> : null}
        {children}
      </div>
    );
  }
}

export default Input;
