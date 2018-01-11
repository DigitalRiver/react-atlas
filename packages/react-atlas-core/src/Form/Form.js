import React from "react";
import PropTypes from "prop-types";
import messages from "../utils/messages";
import cx from "classnames";

class Form extends React.PureComponent {
  constructor(props) {
    super(props);

    let childState = [];

    React.Children.map(props.children, (child, i) => {
      let state = {
        "index": i,
        "value": child.props.value || "",
        "isValid": true,
        "onChange": child.props.onChange || null
      };

      childState.push(state);

      return child;
    });

    this.state = {
      "childState": childState
    };
  }

  validate = () => {
    let isValid = true;
    const data = React.Children.map(this.props.children, (child, i) => {
      if (typeof child.props.required !== "undefined") {
        if (this.state.childState[i].value === "") {
          const state = this.state.childState;
          state[i].isValid = false;
          this.setState({ state });
          isValid = false;
          return;
        }
      }

      /* Skip children with no name prop. */
      if (!child.props.name) {
        return;
      }

      let childData = {
        "name": child.props.name,
        "value": this.state.childState[i].value
      };

      return childData;
    });

    if (isValid) {
      return data;
    } else {
      return null;
    }
  };

  transformData = data => {
    let sumbitData = {};
    for (let i = 0; i < data.length; i++) {
      let key = data[i].name;
      let value = data[i].value;

      sumbitData[key] = value;
    }

    return sumbitData;
  };

  submitHandler = e => {
    /* Prevent form submission if action prop is not set. */
    if (!this.props.action) {
      e.preventDefault();
    }

    /* Validate children components before submiting. */
    let data = this.validate();
    if (!data) {
      /* Prevent form submission when action is set and the
       * form is not valid. */
      if (this.props.action) {
        e.preventDefault();
      }

      if (typeof this.props.onError !== "undefined") {
        this.props.onError(
          messages.missingRequired
        );
      }
      return;
    }

    /* Tranform data array from validate() to an object using name
     * as the key and the child's value as the object value. */
    let sumbitData = this.transformData(data);

    /* Check if onSubmit was set. Call onSubmit if
  	 * it was passed throw a error if not set. */
    if (this.props.onSubmit) {
      this.props.onSubmit(e, sumbitData);
    } else {
      throw messages.onSubmitAction;
    }
  };

  /* Fires whenever a child input is changed. */
  onChangeHandler = (value, event, isValid, state) => {
    if (isValid === false && typeof this.props.onError !== "undefined") {
      this.props.onError(errorCodes.MISSING_REQUIRED, messages.missingRequired);
    }
    let index = state.index;
    let childState = [];
    let count = React.Children.count(this.props.children);

    for (let i = 0; i < count; i++) {
      if (i === index) {
        if (this.state.childState[i].onChange) {
          this.state.childState[i].onChange(value, event, isValid);
        }
        let onChange = this.state.childState[i].onChange;
        let child = {
          "index": i,
          "value": value,
          "isValid": isValid,
          "onChange": onChange
        };
        childState.push(child);
        continue;
      }

      let child = this.state.childState[i];
      childState.push(child);
    }

    this.setState({ "childState": childState });
  };

  render() {
    const {
      className,
      children,
      action,
      method,
      childClasses,
      style,
      target,
      name,
      enctype,
      autocomplete,
      novalidate
    } = this.props;
    /* Loop through children components and set onChange handlers
     * and add CSS classes. */
    let kids = React.Children.map(children, (child, i) => {
      let classes = cx(child.props.className, childClasses);

      let props = {
        "className": classes,
        "autocomplete": autocomplete,
        "onChange": (value, event, isValid) =>
          this.onChangeHandler(value, event, isValid, this.state.childState[i]),
        "value": this.state.childState[i].value,
        "isValid": this.state.childState[i].isValid,
        "novalidate": novalidate
      };

      return React.cloneElement(child, props);
    });

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
        {kids}
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
