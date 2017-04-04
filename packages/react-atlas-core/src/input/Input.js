import React, { Component, PropTypes } from "react";
import cx from 'classNames';

/**
 * Input component. Takes a label prop and wraps label and input in a div. Takes regular input attributes as props as well
 */

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { "value": "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    /* Check if max length has been set. If max length has been
    set make sure the user input is less than max Length. */
    if (this.props.maxLength) {
      if (event.target.value.length > this.props.maxLength) {
        this.setState({
          "value": event.target.value.substring(0, this.props.maxLength)
        });
        return;
      }
    }
    this.setState({ "value": event.target.value });
  }

  render() {
    const { disabled, label, multiline, type, value, ...others } = this.props;

    let inputClassName = cx({
      "input": type !== "checkbox",
      "checkbox": type === "checkbox",
      disabled,
      multiline,
      value,
      [`${this.props.className}`]: !!this.props.className
    });

    return (
      <div styleName={cx("container")}>
        {this.props.label
          ? <label htmlFor={this.props.htmlFor} styleName={cx("label")}>
              {label}
            </label>
          : null}
        <input
          value={this.state.value}
          styleName={inputClassName}
          onChange={this.handleChange}
          type={type}
        />
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
  "type": "text",
  "inputLength": 0,
  "focus": false
};

Input.styleguide = {
  "category": "Form Components",
  "index": "3.6",
  "example": 
    `
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
