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

        /* Check if we have data, if so, we're the source of truth */
        const currentState = this.state.childState[childId];
        if (currentState) {
          /* Allow them to modify onChange handler on the fly, but this is controlled. Form owns value/isValid */
          childState[childId] = Object.assign(currentState, {
            "onChange": child.props.onChange || null
          });
        } else if (childId) {
          childState[childId] = {
            "value": child.props.value,
            "isValid": child.props.isValid || true,
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
    const { childClasses } = this.props;

    const recursiveRenderChildren = children =>
      React.Children.map(children, child => {
        const { childState } = this.state;
        let props = {};

        /* Text strings are an invalid React component but should be returned or the DOM will render empty nodes */
        if (!React.isValidElement(child)) {
          return child;
        }

        const childId = child.props.name;

        if (childId) {
          props = {
            "onChange": (value, event, isValid) =>
              this.onChangeHandler(value, event, isValid),
            "value": childState[childId].value,
            "isValid": childState[childId].isValid
          };
        }

        props.className = cx(child.props.className, childClasses);
        props.children = recursiveRenderChildren(child.props.children);

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
            if (
              typeof this.state.childState[childId].value === "undefined" ||
              this.state.childState[childId].value === ""
            ) {
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
    if (typeof this.props.action === "undefined") {
      e.preventDefault();
    }
    /* Validate children components before submitting. */
    let data = this.validate();
    if (!data) {
      e.preventDefault();
      if (typeof this.props.onError !== "undefined") {
        this.props.onError(messages.missingRequired);
      }
      return;
    }

    /* Check if onSubmit was set. Call onSubmit.*/
    if (this.props.onSubmit) {
      let result = this.props.onSubmit(e, data);
      if (result === false) {
        e.preventDefault();
      }
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
      ...others
    } = this.props;

    return (
      <form
        {...others}
        style={style}
        action={action}
        method={method}
        className={cx(className)}
        onSubmit={this.submitHandler}
        target={target}
        name={name}
        encType={enctype}
      >
        {this.renderChildren()}
      </form>
    );
  }
}

Form.propTypes = {
  /** The URL of the server that Form will send data to. Data will be passed as a querystring.*/
  "action": PropTypes.string,

  /** When true, input elements will have their values
   * automatically completed by the browser. This setting can be overridden
   * by an autoComplete attribute on an element belonging to the form. */
  "autoComplete": PropTypes.bool,

  /** An object, array, or string of CSS classes to
   * apply to Form's children components.*/
  "childClasses": PropTypes.node,

  /** Children components, usually a TextField, Dropdown, Checkbox, etc. */
  "children": PropTypes.node,

  /** An object, array, or string of CSS classes to apply to Form.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /** When the value of the method attribute is post, enctype is the
   *  MIME type of content that will be used to submit Form to the server. */
  "enctype": PropTypes.string,

  /** The HTTP method that will be used when action is set and
   * the form is submitting. Default is POST.*/
  "method": PropTypes.string,

  /** The name of the Form.  */
  "name": PropTypes.string,

  /** When true, Form will not use HTML5 validation. */
  "noValidate": PropTypes.bool,

  /** A Callback that will be executed when there is a form error.
   * _Example: function(errorMsg)_*/
  "onError": PropTypes.func,

  /** A callback that will be executed when the form has passed validation
   * and is ready to submit. Returns the form data and the event object.
   * _Example: function(event, data) {}_*/
  "onSubmit": PropTypes.func,

  /** Pass inline styling here. */
  "style": PropTypes.object,

  /** A name or keyword indicating where to display the response that will be received after submitting the form.*/
  "target": PropTypes.string
};

Form.defaultProps = {
  "method": "POST",
  "noValidate": true
};

export default Form;
