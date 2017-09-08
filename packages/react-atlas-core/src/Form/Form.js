import React from "react";
import PropTypes from 'prop-types';
import messages from '../utils/messages';
import { ButtonCore } from '../Button';
import utils from '../utils/utils';
import cx from "classnames";

class Form extends React.PureComponent {
  constructor(props) {
    super(props);

    let childState = [];

    React.Children.map(props.children, (child, i) => {

      let state = {
                    index: i,
                    value: child.props.value || '',
                    isValid: true
                  };

      childState.push(state)

      return child
    });

    this.state = {
      "childState": childState
    };
  }

  validate = () => {
    let isValid = true;
  	const data = React.Children.map(this.props.children, (child, i) => {

      if(typeof child.props.required !== 'undefined') {
        if(this.state.childState[i].value === '') {
          const state = this.state.childState;
          state[i].isValid = false;
          this.setState({state});
          isValid = false;
          return;
        }
      }

      /* Skip children with no name prop. */
      if(!child.props.name) {
        return;
      }

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

  transformData = (data) => {
    let sumbitData = {};
    for(let i = 0; i < data.length; i++) {
      let key = data[i].name;
      let value = data[i].value;

      sumbitData[key] = value;

    }

    return sumbitData;
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

    /* Tranform data array from validate() to an object using name
     * as the key and the child's value as the object value. */
    let sumbitData = this.transformData(data);

  	/* Check if onSubmit was set. Call onSubmit if
  	 * it was passed throw a error if not set. */
  	if(this.props.onSubmit) {
  		this.props.onSubmit(e, sumbitData);
  	} else {
      throw messages.onSubmitAction;
  	}
  }

  /* Fires whenever a child input is changed. */
  onChangeHandler = (value, event, isValid, state) => {
    console.log("FormIsValid: ", isValid);
    let index = state.index;
    let childState = [];
    let count = React.Children.count(this.props.children);

    for(let i = 0; i < count; i++) {
      if(i === index) {
        let child = {index: i, value: value, isValid: isValid};
        childState.push(child);
        continue;
      }

      let child = this.state.childState[i];
      childState.push(child);
    }

    this.setState({"childState": childState});
  }

  render() {
    const { className, children, action, buttonText, group, method, childClasses, buttonClasses} = this.props;
    console.log("children: ", this.props.children);
    /* Loop through children components and set onChange handlers
     * and add CSS classes. */
    let kids = React.Children.map(children, (child, i) => {

        /* Check if the user wants the form inputs grouped
         * together, if yes set the form_component class. */
        let classes;
        if(group) {
          classes = cx(child.props.className, childClasses, "ra_form__component");
        } else {
          classes = cx(child.props.className, childClasses);
        }

        let props = {
          className: classes,
          onChange: (value, event, isValid, state) => this.onChangeHandler(value, event, isValid, this.state.childState[i]),
          value: this.state.childState[i].value,
          errorText: "This field is required",
          isValid: this.state.childState[i].isValid
        };

        return React.cloneElement(child, props);
    });

    return (
      <form action={action} method={method} className={cx(className)}>
        {kids}
        <ButtonCore type={"submit"} className={cx(buttonClasses)} styleName={"form-button"} onClick={this.clickHandler}>{buttonText}</ButtonCore>
      </form>
    );
  }
}

Form.propTypes = {
  /** An Object, array, or string of CSS classes to apply to the form submit button.  */
  "buttonClasses": PropTypes.node,
  /** Children components, Usually a Textfield, Dropdown, Input, etc */
  "children": PropTypes.node,
  /** An Object, array, or string of CSS classes to apply to form.*/
  "className": PropTypes.node,
  /** A callback that is fired when the form has passed validation
   * and is ready to submit. Returns the form data and the event object.  */
  "onSubmit": PropTypes.func,
  /** The URL of the server to send data to. */
  "action": PropTypes.string,
  /** The text displayed inside the submit button. */
  "buttonText": PropTypes.string,
  /** The HTTP method to use when action is set and
   * the form is submitting. */
  "method": PropTypes.string,
    /** An Object, array, or string of CSS classes to
     * apply to form children components.*/
  "childClasses": PropTypes.node
};

Form.defaultProps = {
  "buttonText": "Submit",
  "method": "POST"
}

export default Form;
