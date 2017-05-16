import React, { Component, PropTypes } from "react";
import cx from 'classNames';

/**
 * Input component. Takes a label prop and wraps label and input in a div. Takes regular input attributes as props as well
 */
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      "value": props.value || "",
      "errorText": undefined,
      "isValid": true,
      "remaining": props.maxLength
    };
  }

  handleChange = (event) => {
    let inputValue = event.target.value;

    /* Validate max character length */
    if (this.props.maxLength) {
      // Keep difference between maxlenght and input value in state for count
      this.setState({
        "remaining": this.props.maxLength - event.target.value.length
      });
      // Make sure the user input is less than maxLength value
      if (inputValue.length > this.props.maxLength) {
        this.setState({
          "value": inputValue.substring(0, this.props.maxLength),
          "remaining": 0
        });
        return;
      }
    }

    /* Execute custom validator and change state and error messages accordingly */
    let customValidationPass = false;
    if (this.props.validator) {
      let valid = this.props.validator(inputValue);
      if (!valid) {
        this.setState({
          "errorText": this.props.errorText,
          "isValid": false
        });
      } else {
        customValidationPass = true;
      }
    }

    /* If the field is required, and it has no value, change state and display error message */
    if (this.props.required) {
      if(!inputValue.length) {
        this.setState({
          "errorText": this.props.requiredText || "This field is required.",
          "isValid": false
        });
      } else {
        /* Set state after both validation checks to display both when required */
        if(this.props.validator) {
          if(customValidationPass) {
            this.setState({ "isValid": true });
          }
        } else {
          this.setState({ "isValid": true });
        }
      }
    }

    /* Regardless of validations, set value in the component state */
    this.setState({ "value": inputValue });
  }

  render() {
    const { 
      className, 
      small, 
      medium, 
      large, 
      type, 
      value, 
      multiline,
      maxLength, 
      placeholder, 
      disabled, 
      hidden, 
      errorText, 
      errorLocation,
      ...others 
    } = this.props;

    let inputClasses = cx({
      "input": type !== "checkbox",
      "checkbox": type === "checkbox",
      "invalid": !this.state.isValid,
      "blockInput": errorLocation === "bottom", 
      "small": small,
      "medium": medium,
      "large": large,
      "max": !small && !medium && !large,
      disabled,
      hidden
    });

    let inputElement = multiline ? (
      <textarea
        value={this.state.value}
        placeholder={placeholder}
        styleName={inputClasses}
        className={cx(className)}
        onChange={this.handleChange}
      />
    ) : (
      <input
        type={type}
        value={this.state.value}
        placeholder={placeholder}
        styleName={inputClasses}
        className={cx(className)}
        onChange={this.handleChange}
      />
    );

    let errorTextElement = this.state.errorText && (
      <span styleName={cx("error")}>{this.state.errorText}</span>
    );

    return (
      <div styleName={cx("container")}>
        {inputElement}
        {this.state.isValid ? null : errorTextElement}
      </div>
    );
  }
}

Input.propTypes = {
  "className": PropTypes.string,
  "type": PropTypes.string,
  "required": PropTypes.bool,
  "requiredText": PropTypes.string,
  "errorText": PropTypes.string,
  "errorLocation": PropTypes.string,
  "value": PropTypes.string,
  "disabled": PropTypes.bool,
  "hidden": PropTypes.bool,
  "maxLength": PropTypes.number,
  "minLength": PropTypes.number,
  "placeholder": PropTypes.string,
  "focus": PropTypes.bool,
  "multiline": PropTypes.bool,
  "small": PropTypes.bool,
  "medium": PropTypes.bool,
  "large": PropTypes.bool,
  "onChange": PropTypes.func,
  "validator": PropTypes.func
};

Input.defaultProps = {
  "className": "",
  "disabled": false,
  "hidden": false,
  "focus": false,
  "errorLocation": "right"
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
