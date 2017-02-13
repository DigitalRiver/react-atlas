import React, { Component, PropTypes } from 'react';
import { classNames } from '../utils';
import themeable from 'react-themeable';

/**
 * Input component. Takes a label prop and wraps label and input in a div. Takes regular input attributes as props as well
 */

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    /* Check if max length has been set. If max length has been
    set make sure the user input is less than max Length. */
    if(this.props.maxLength) {
      if(event.target.value.length > this.props.maxLength) {
        this.setState({ value: event.target.value.substring(0, this.props.maxLength) });
        return;
      }
    }
    this.setState({ value: event.target.value });
  }

  render () {
    const { disabled, label, maxLength, multiline, type, value, ...others} = this.props;
    const theme = themeable(others.theme);

    let inputClassName = classNames({
      "input": type !== 'checkbox',
      "checkbox": type == 'checkbox',
      disabled,
      multiline,
      value,
      [`${this.props.className}`]: !!this.props.className
    });

    return (
      <div {...theme(1, 'container')}>
        {this.props.label ? <label htmlFor={this.props.htmlFor} {...theme(2, 'label')}>{label}</label> : null}
          <input value={this.state.value} {...theme(3, ...inputClassName)} onChange={this.handleChange} type={type} />
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
    "focus": false,
    "theme": {
      'container': true
    }
};

Input.styleguide = {
  category: 'Form Components',
  index: '3.6',
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