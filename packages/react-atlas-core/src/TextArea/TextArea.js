import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import cx from "classnames";

class TextArea extends React.PureComponent {
  constructor(props) {
    super(props);
	// Initial state
    this.state = {
      "value": props.value || "",
      "remaining": props.maxLength,
      "active": false,
      "valid": true
    };
  }

  _handleChange = event => {
  	event.persist();
  	let value = event.target.value;

    if (this.props.maxLength) {
      // Keep difference between maxlength and input value in state for count
      this.setState({ "remaining": this.props.maxLength - value.length });
    }

    if (this.props.required) {
    	// Set valid state depending on InputCore state
    	this.setState({ "valid": this.inputRef.state.isValid });
    }

    if (this.props.onChange) {
    	// Execute app code
    	this.props.onChange(event);
    }
  }

  _handleFocus = event => {
	this.setState({ "active": true });
  }

  _handleBlur = event => {
	this.setState({ "active": false });
  }

  render() {
  	const {
  		maxLength,
  		resizable,
  		small,
  		medium, 
  		large,
  		disabled, 
  		hidden,
  		...props
  	} = this.props;

    let remainingCount = 
		maxLength &&
		<div styleName={cx("remainingCount")}>{maxLength - this.state.remaining}/{maxLength}</div>;

	let wrapperClasses = cx({
		hidden,
		small,
		medium,
		large
	}, "textareaWrapper");

	let textAreaClasses = cx({
		resizable,
		disabled,
		"active": this.state.active,
		"invalid": !this.state.valid
	}, "textarea");

  	return (
  		<div 
  			styleName={wrapperClasses}
  			onFocus={this._handleFocus}
  			onBlur={this._handleBlur}>
	  		<InputCore 
	  			multiline
	  			maxLength={maxLength}
	  			styleName={textAreaClasses}
	  			onChange={this._handleChange}
	  			disabled={disabled}
	  			hidden={hidden}
	  			ref={(node) => (this.inputRef = node)}
	  			{...props}
			/>
			{remainingCount}
		</div>
	);
  }
}

TextArea.PropTypes = {
	/**
	 * Define a custom css class name.
	 * @examples 'switch', 'switch-elem'
	 */
	"className": PropTypes.string,
	/**
	 * Define a name for the textarea input.
	 * @examples '<TextArea name="test"/>'
	 */
	"name": PropTypes.string,
	/**
	 * Defines a small sized textarea.
	 * @examples '<Switch small/>'
	 */
	"small": PropTypes.bool,
	/**
	 * Defines a medium sized textarea.
	 * @examples '<Switch medium/>'
	 */
	"medium": PropTypes.bool,
	/**
	 * Defines a large sized textarea.
	 * @examples '<Switch large/>'
	 */
	"large": PropTypes.bool,
	/**
	 * Sets a handler function to be executed when onChange event occurs (at input element).
	 * @examples <TextArea onChange={this.customOnChangeFunc}/>
	 */
	"onChange": PropTypes.func,
	/**
	 * Determines if the textarea is disabled.
	 * @examples '<TextArea disabled/>'
	 */
	"disabled": PropTypes.bool,
	/**
	 * Determines if the textarea is hidden.
	 * @examples '<TextArea hidden/>'
	 */
	"hidden": PropTypes.bool
};

TextArea.defaultProps = {
  "className": "",
  "resizable": true,
  "disabled": false,
  "hidden": false
};

export default TextArea;