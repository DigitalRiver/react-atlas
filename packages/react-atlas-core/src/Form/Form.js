import React from "react";
import PropTypes from "prop-types";
import messages from "../utils/messages";
import cx from "classnames";

class Form extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      "childState": {}
    };
  }

  componentWillMount() {
    this.updateChildState();
  }

  componentWillReceiveProps(nextProps) {
    /* Update the childState to account for any children changes */
    if (this.props.children !== nextProps.children) {
      this.updateChildState();
    }
  }

  /* Initialize Child state for all children with a name */
  updateChildState() {
    const recursiveChildState = children => {
      let childState = {};

      React.Children.forEach(children, child => {
        if (!React.isValidElement(child)) {
          return;
        }

        const childId = child.props.name;
        if (childId) {
          childState[childId] = {
            "value": child.props.value,
            "isValid": true,
            "onChange": child.props.onChange || null
          };
        }
        Object.assign(childState, recursiveChildState(child.props.children));
      });

      return childState;
    };

    const childState = recursiveChildState(this.props.children);

    this.setState({
      childState
    });
  }

  /* Recursively render children with additional props */
  renderChildren() {
    const { childClasses, autocomplete, novalidate } = this.props;

    const recursiveRenderChildren = children =>
      React.Children.map(children, child => {
        const { childState } = this.state;
        let props = {};

        const childId = child.props.name;

        if (childId) {
          const classes = cx(child.props.className, childClasses);
          props = {
            "className": classes,
            "autocomplete": autocomplete,
            "onChange": (value, event, isValid) =>
              this.onChangeHandler(value, event, isValid),
            "value": childState[childId].value,
            "isValid": childState[childId].isValid,
            "novalidate": novalidate
          };
        }

        if(!React.isValidElement(child.props.children)) {
          if(typeof child.props.children === 'string') {
            props.children = child.props.children;
          } else {
            props.children = recursiveRenderChildren(child.props.children);
          }
        } else {
          props.children = recursiveRenderChildren(child.props.children);
        }

        return React.cloneElement(child, props);
      });

    return recursiveRenderChildren(this.props.children);
  }

  validate = () => {
    let isValid = true;

    /* Validation needs to be refactored to use a Field level validation check or callback */

    /* Recursively step through children and check if a field is required and empty */
    const recursiveRequiredValidation = children => {
      let invalidChildren = {};

      React.Children.forEach(children, child => {
        if (!React.isValidElement(child)) {
          return;
        }

        const childId = child.props.name;
        if (childId) {
          if (child.props.required) {
            if (typeof this.state.childState[childId].value === 'undefined' || this.state.childState[childId].value === "") {
              isValid = false;
              invalidChildren[childId] = Object.assign(
                {},
                this.state.childState[childId],
                { "isValid": false }
              );
            }
          }
        }
        Object.assign(
          invalidChildren,
          recursiveRequiredValidation(child.props.children)
        );
      });

      return invalidChildren;
    };

    const newState = recursiveRequiredValidation(this.props.children);
    if (Object.keys(newState).length !== 0) {
      /* Copy state and set to avoid mutating existing state */
      const childState = Object.assign({}, this.state.childState, newState);
      this.setState({
        childState
      });
    }

    if (!isValid) {
      return null;
    }

    const { childState } = this.state;
    return Object.keys(childState).reduce((data, key) => {
      data[key] = childState[key].value;
      return data;
    }, {});
  };

  submitHandler = e => {
    /* Prevent form submission if action prop is not set. */
    if (!this.props.action) {
      e.preventDefault();
    }

    /* Validate children components before submitting. */
    let data = this.validate();
    if (!data) {
      /* Prevent form submission when action is set and the
       * form is not valid. */
      if (this.props.action) {
        e.preventDefault();
      }

      if (typeof this.props.onError !== "undefined") {
        this.props.onError(messages.missingRequired);
      }
      return;
    }

    /* Check if onSubmit was set. Call onSubmit if
  	 * it was passed throw a error if not set. */
    if (this.props.onSubmit) {
      this.props.onSubmit(e, data);
    } else {
      throw messages.onSubmitAction;
    }
  };

  /* Fires whenever a child input is changed. */
  onChangeHandler = (value, event, isValid) => {
    if (isValid === false && typeof this.props.onError !== "undefined") {
      this.props.onError(messages.missingRequired);
    }

    const childId = event.target.name;

    if (this.state.childState[childId].onChange) {
      this.state.childState[childId].onChange(value, event, isValid);
    }

    let child = {
      "value": value,
      "isValid": isValid,
      "onChange": this.state.childState[childId].onChange || null
    };

    const childState = Object.assign({}, this.state.childState, {
      [childId]: child
    });

    this.setState({ "childState": childState });
  };

  render() {
    const {
      className,
      action,
      method,
      style,
      target,
      name,
      enctype,
      novalidate
    } = this.props;

    return (
      <form
        style={style}
        action={action}
        method={method}
        className={cx(className)}
        onSubmit={this.submitHandler}
        target={target}
        name={name}
        encType={enctype}
        noValidate={novalidate}
      >
        {this.renderChildren()}
      </form>
    );
  }
}

Form.propTypes = {
  /** Children components, Usually a Textfield, Dropdown, Input, etc */
  "children": PropTypes.node,
  /** An Object, array, or string of CSS classes to apply to Form.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /** A callback that is fired when the form has passed validation
   * and is ready to submit. Returns the form data and the event object.  */
  "onSubmit": PropTypes.func,
  /** A Callback that is called when there is a form error. */
  "onError": PropTypes.func,
  /** The URL of the server to send data to. */
  "action": PropTypes.string,
  /** The text displayed inside the submit button. */
  "buttonText": PropTypes.string,
  /** The HTTP method to use when action is set and
   * the form is submitting. */
  "method": PropTypes.string,
  /** An Object, array, or string of CSS classes to
   * apply to form children components.*/
  "childClasses": PropTypes.node,
  /** Pass inline styling here. **/
  "style": PropTypes.object,
  /** Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an autocomplete attribute on an element belonging to the form. **/
  "autocomplete": PropTypes.bool,
  /** The name of the form.  **/
  "name": PropTypes.string,
  /** A name or keyword indicating where to display the response that is received after submitting the form. _self: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.
_blank: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.
_parent: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as _self.
_top: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as _self.  **/
  "target": PropTypes.string,
  /** This Boolean indicates wether to use HTML5 validations or not. **/
  "novalidate": PropTypes.bool,
  /** When the value of the method attribute is post, enctype is the MIME type of content that is used to submit the form to the server **/
  "enctype": PropTypes.string
};

Form.defaultProps = {
  "buttonText": "Submit",
  "method": "POST",
  "novalidate": true
};

export default Form;
