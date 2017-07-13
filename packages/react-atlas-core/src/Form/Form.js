import React from "react";
import PropTypes from 'prop-types';
import { ButtonCore } from '../Button';
import utils from '../utils/utils';
import cx from "classnames";

const buttonClasses = cx({
  'ra_button__button': true,
  'ra_button__default_btn': true,
  'ra_button__base': true,
  'ra_form__button': true,
  'ra_styles__marg-0': true,
  'ra_styles__bold': true,
  'ra_styles__button-pad-1': true,
  'ra_styles__default-text': true,
  'ra_styles__default-border': true,
  'ra_styles__cursor-pointer': true,
  'ra_styles__primary-button-border-width': true,
  'ra_button__primary': true,
  'ra_styles__bg-primary': true,
  'ra_styles__hover-bg-primary': true,
  'ra_styles__border-blue': true,
  'ra_styles__white': true,
});


class Form extends React.PureComponent {

  clearForm = () => {

  }

  setupInitialState = (childArray) => {
  	for(let i = 0; i < childArray.length; i++) {

  	}
  }

  validate = () => {
  	{React.Children.map(this.props.children, (child, i) => {
  		const name = utils.getComponentName(child);

        return child;
    })}
  }

  clickHandler = (e) => {
  	/* Prevent form submission if action prop is not set. */
  	if(!this.props.action) {
  	  e.preventDefault();
  	}

  	/* Validate children components before submiting. */
  	this.validate();

  	/* Check if onSubmit was set. Call onSubmit if
  	 * it was passed throw a error if not set. */
  	if(this.props.onSubmit) {
  		this.props.onSubmit(e);
  	} else {
        throw "Pass either onSubmit or action";
  	}
  }

  /* Fires whenever a child input is changed. */
  onChangeHandler = (e) => {
  	console.log("Click: ", e);
  }

  render() {
    const { className, children, action, buttonText} = this.props;

    let kids = React.Children.map(children, (child, i) => {
        const classes = cx(child.props.className, "ra_form__component");
        return React.cloneElement(child, {className: classes, onChange: this.onChangeHandler, index: i});
    });

    this.setupInitialState(kids);

    return (
      <form action={action} className={cx(className)} styleName={"container"}>
        {kids}
        <ButtonCore className={buttonClasses} onClick={this.clickHandler}>{buttonText}</ButtonCore>
      </form>
    );
  }
}

Form.propTypes = {
  "children": PropTypes.node,
  "className": PropTypes.string,
  "onSubmit": PropTypes.func,
  "action": PropTypes.string,
  "buttonText": PropTypes.string
};

Form.defaultProps = {
  "buttonText": "Submit"
}

export default Form;
