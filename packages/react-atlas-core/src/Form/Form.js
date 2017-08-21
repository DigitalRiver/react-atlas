import React from "react";
import PropTypes from 'prop-types';
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
          console.log('Must pass value for required prop');
          isValid = false;
          return;
        }
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
  onChangeHandler = (value, event, isValid, state) => {
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
          onChange: (value, e, isValid, childState) => this.onChangeHandler(value, e, isValid, this.state.childState[i]),
          value: this.state.childState[i].value,
          errorText: "This field is required",
          isValid: this.state.childState[i].isValid
        };

        return React.cloneElement(child, props);
    });

    return (
      <form action={action} method={method} className={cx(className)}>
        {kids}
        <ButtonCore className={cx(buttonClasses)} styleName={"form-button"} onClick={this.clickHandler}>{buttonText}</ButtonCore>
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
