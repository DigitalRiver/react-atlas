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
                    name: child.props.name || ''
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

  render() {
    const { className, children, action, buttonText} = this.props;

    /* Loop through children components and set onChange handlers
     * and add CSS classes. */
    let kids = React.Children.map(children, (child, i) => {

        const classes = cx(child.props.className, "ra_form__component");

        let props = {
          className: classes, 
          onChange: (e, childState) => this.onChangeHandler(e, this.state.childState[i]),
          value: this.state.childState[i].value
        };

        return React.cloneElement(child, props);
    });

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
