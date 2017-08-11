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
  constructor(props) {
    super(props);

    let childState = [];

    React.Children.map(props.children, (child, i) => {

      let state = {
                    index: i,
                    value: child.props.value || '',
                    ref: null
                  };

      childState.push(state)

      return child
    });

    this.state = {
      "childState": childState
    };
  }

  clearForm = () => {

  }

  validate = () => {
    let isValid = true;
  	const data = React.Children.map(this.props.children, (child, i) => {
  		const name = utils.getComponentName(child);

      if(typeof child.props.required !== 'undefined') {
        if(this.state.childState[i].value === '') {
          console.log('Must pass value for required prop');
          isValid = false;
          return;
        }
      }

      // let isValid = this.state.childState[i].ref._validate();
      // console.log("isValid: ", isValid);

      let childData = {
                        "name": child.props.name,
                        "value": this.state.childState[i].value
                      };

      return childData;
    });

    if(isValid) {
      return data;
    } else {
      return null;
    }
  }

  clickHandler = (e) => {
  	/* Prevent form submission if action prop is not set. */
  	if(!this.props.action) {
  	  e.preventDefault();
  	}

  	/* Validate children components before submiting. */
  	let data = this.validate();
    if(!data) {
      return;
    }

  	/* Check if onSubmit was set. Call onSubmit if
  	 * it was passed throw a error if not set. */
  	if(this.props.onSubmit) {
  		this.props.onSubmit(e, data);
  	} else {
        throw "Pass either onSubmit or action";
  	}
  }

  /* Fires whenever a child input is changed. */
  onChangeHandler = (event, state) => {
    let index = state.index;
    // let childState = this.state.childState;
    let childState = [];
    let count = React.Children.count(this.props.children);

    for(let i = 0; i < count; i++) {
      if(i === index) {
        let child = {index: i, value: event.target.value};
        childState.push(child);
        continue;
      }

      let child = this.state.childState[i];
      childState.push(child);
    }

    this.setState({"childState": childState});
  }

  /* Throw error message if value is not truthy/set */
  validator = (value) => {
    if(value)
      return true
    else
      return false
  }

  render() {
    const { className, children, action, buttonText, group} = this.props;

    /* Loop through children components and set onChange handlers
     * and add CSS classes. */
    let kids = React.Children.map(children, (child, i) => {

        /* Check if the user wants the form inputs grouped
         * together, if yes set the form_component class. */
        let classes;
        if(group) {
          classes = cx(child.props.className, "ra_form__component");
        } else {
          classes = cx(child.props.className);
        }

        let props = {
          className: classes,
          onChange: (e, childState) => this.onChangeHandler(e, this.state.childState[i]),
          value: this.state.childState[i].value,
          validator: this.validator,
          errorText: "This field is required",
          ref: (input) => { this.state.childState[i].ref = input; }
        };

        return React.cloneElement(child, props);
    });

    return (
      <form action={action} className={cx(className)}>
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
