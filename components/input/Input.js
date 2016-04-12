import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './input.css';

/**
 * Input component. Takes a label prop and wraps label and input in a div. Takes regular input attributes as props as well
 */

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
            <label htmlFor={this.props.htmlFor} className={style.label}>{label}</label>
            <input {...this.props} className={inputClassName} onChange={this.props.onChange} type={type} />
          </div>
        );
    }
}

Input.propTypes = {
    "disabled": PropTypes.bool,
    "className": PropTypes.string,
    "htmlFor": PropTypes.string,
    "maxLength": PropTypes.number,
    "inputText": PropTypes.string,
    "focus": PropTypes.bool,
    "label": PropTypes.string,
    "multiline": PropTypes.bool,
    "type": PropTypes.string,
    "value": PropTypes.string,
    "onChange": PropTypes.func
};

Input.defaultProps = {
    "disabled": false,
    "type": 'text',
    "inputLength": 0,
    "focus": false
};

Input.styleguide = {
  category: 'Form Components',
  example: `
<section>
  <h5>Inputs</h5>
  <p>lorem ipsum...</p>
  <Input
    type="text"
    label="First Label"
    maxLength={12}
    placeholder="First Label placeholder"
  />
  <Input
    type="text"
    label="Second Label"
    maxLength={12}
    placeholder="Second Label placeholder"
  />

  <Button>Submit</Button>
</section>  
`
};

export default Input;
