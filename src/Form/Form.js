import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { Alert } from "../Alert";
import blacklist from "blacklist";

export class Form extends React.PureComponent {
  constructor(props) {
    super(props);
    this.formRefs = [];
    this.state = {
      errorList: [] // Array of errors to be displayed in Alert message.
    };
  }

  // We only want to add the values of "checked" radios or checkboxes to a submit object.
  _isChecked = (element, isCheckboxOrRadio) => {
    const stateExists =
      element.state !== null && typeof element.state !== "undefined"; // Does node have a state object?
    const isRadio = isCheckboxOrRadio && !stateExists; // Is node Radio? Radio components do not have state.
    return (
      isCheckboxOrRadio &&
      ((isRadio && element.props.checked) ||
        (!isRadio && element.state.checked))
    );
  };

  // Helps determine whether or not to use props or state for different values later.
  _isCheckboxOrRadio = element => {
    const propsExist =
      element.props !== null && typeof element.props !== "undefined"; // Does node have an props object?
    return propsExist && typeof element.props.checked === "boolean";
  };

  // Takes an element and adds it to the submitObject to be sent back to the user.
  _updateSubmitObject = (
    element,
    submitObject,
    isCheckboxGroup,
    isCheckboxOrRadio,
    elementName,
    elementValue,
    isHtmlInput
  ) => {
    const newObject = Object.assign({}, submitObject); // Clone of submitObject to be modified.
    const isChecked = this._isChecked(element, isCheckboxOrRadio); // Is node checked?
    if (
      !isCheckboxGroup &&
      ((isHtmlInput && !element.disabled) ||
        (!isHtmlInput && !element.props.disabled)) &&
      (isChecked || !isCheckboxOrRadio)
    ) {
      if (typeof newObject[elementName] !== "undefined") {
        if (typeof newObject[elementName] === "object") {
          // Element name was found in the submit object as an array, add new value to array.
          newObject[elementName].push(elementValue);
        } else {
          // Element name was found in submit object as a string, convert to array, then add new value to the array.
          newObject[elementName] = [newObject[elementName]];
          newObject[elementName].push(elementValue);
        }
      } else {
        // Element name was not found in the submit object.
        newObject[elementName] = elementValue;
      }
    }
    return newObject;
  };

  // Validates a react-atlas input component and returns an object containing a human-readable name and error message.
  _validateElement = (
    element,
    isCheckboxGroup,
    elementName,
    elementValue,
    isHtmlInput
  ) => {
    // If validate is set to false, or if the element does not have a _formValidate method, is disabled, or set to readOnly return early.
    if (
      !this.props.validate ||
      (isHtmlInput && element.disabled) ||
      (!isHtmlInput && element.props.disabled) ||
      (isHtmlInput && element.readonly) ||
      (!isHtmlInput && element.props.readOnly) ||
      typeof element._formValidate === "undefined"
    ) {
      return false;
    }

    const validationObject = element._formValidate(elementValue);

    // If the validation status is not "error" return early since this element does not need to be added to the error array.
    if (validationObject.status !== "error") {
      return false;
    }

    // Set a human-readable name for the element.
    let errorName = isCheckboxGroup ? "Checkbox Group" : elementName;
    if (typeof element.props !== "undefined" && element.props.label) {
      errorName = element.props.label;
    }
    if (typeof element.props !== "undefined" && element.props.title) {
      errorName = element.props.title;
    }

    // Create an object containing the human-readable name of the element and the error message for that element.
    const errorObject = {
      name: errorName,
      message: validationObject.message
    };

    return errorObject;
  };

  // Loops through all the refs in the Form, validates if necessary, and creates a submitObject if necessary.
  // Then either submits HTML form or return submitObject to the user.
  _validateAndSubmit = e => {
    e.preventDefault();
    let submitObject = {};
    let errorArray = [];
    const onSubmitExists = typeof this.props.onSubmit !== "undefined";
    this.formRefs.map(elementRef => {
      const element = elementRef.current; // Current Node
      if (element !== null) {
        const isHtmlInput = typeof element.nodeType !== "undefined";
        const isCheckboxGroup = typeof element.maxMinMessage !== "undefined"; // Is node CheckboxGroup?
        const isCheckboxOrRadio = this._isCheckboxOrRadio(element); // Is node Checkbox or Radio?
        let elementValue = ""; // Value of the input
        if (isHtmlInput) {
          elementValue = element.value;
        } else {
          elementValue = isCheckboxOrRadio
            ? element.props.value
            : element.state.value;
        }
        const elementName = isHtmlInput ? element.name : element.props.name; // Name of the input
        // Get the input's value and add it to the submitObject.
        submitObject = this._updateSubmitObject(
          element,
          submitObject,
          isCheckboxGroup,
          isCheckboxOrRadio,
          elementName,
          elementValue,
          isHtmlInput
        );

        // Validate the current node. If an error is returned, add it to the errorArray.
        const errorObject = this._validateElement(
          element,
          isCheckboxGroup,
          elementName,
          elementValue,
          isHtmlInput
        );
        if (errorObject) {
          errorArray.push(errorObject);
        }
      }
    });

    if (errorArray.length === 0) {
      if (onSubmitExists) {
        e.preventDefault(); // User has a custom onSubmit function, so stop the form from submitting.
      }
      this.setState(
        {
          errorList: [] // Reset the errorList to an empty array.
        },
        () => {
          if (onSubmitExists) {
            this.props.onSubmit(submitObject);
          }
        }
      );
    } else {
      e.preventDefault(); // There are errors, so stop form from submitting.
      this.setState({
        errorList: errorArray
      });
    }
  };

  // Inspect a specific child element. Add a ref if necessary.
  _addRef = child => {
    let kid;
    // If child has a name property or is a CheckboxGroup then add a ref.
    if (
      (typeof child.props !== "undefined" && child.props.name) ||
      (typeof child.type !== "undefined" &&
        child.type.displayName === "CheckboxGroup")
    ) {
      // If child is a CheckboxGroup, continue to evaluate its children after adding the ref.
      if (child.type.displayName === "CheckboxGroup") {
        if (child.ref === null) {
          const newRef = React.createRef();
          this.formRefs.push(newRef);
          kid = cloneElement(
            child,
            {
              ref: newRef
            },
            this._addRefs(child.props.children)
          );
        } else {
          kid = cloneElement(child, {}, this._addRefs(child.props.children));
        }
      } else {
        if (child.ref === null) {
          // If child has a name property and is not a CheckboxGroup then give it a ref and ignore its children.
          const newRef = React.createRef();
          this.formRefs.push(newRef);
          kid = cloneElement(child, {
            ref: newRef
          });
        } else {
          this.formRefs.push(child.ref);
          kid = child;
        }
      }
    } else {
      // If child is not an input and has children, evaluate those children for more inputs. If child does not have children, return child.
      if (
        typeof child.props !== "undefined" &&
        typeof child.props.children !== "undefined" &&
        typeof child.props.children !== "string"
      ) {
        kid = cloneElement(child, {}, this._addRefs(child.props.children));
      } else {
        kid = child;
      }
    }
    return kid;
  };

  /*
    Loop through all children of the Form. If an input is found, make sure it has a ref for future reference.
    The second argument determines if the children are being re-generated and clears the list of Refs.
  */
  _addRefs = (children, first) => {
    if (first) {
      this.formRefs = [];
    }
    let elements;
    if (typeof children !== "string" && children.length > 0) {
      elements = children.map(child => {
        return this._addRef(child);
      });
    } else {
      elements = this._addRef(children);
    }
    return elements;
  };

  render() {
    const { children, ...others } = this.props;
    // Declaring the following variables so they don't get passed to the Textarea through the prop spread.
    const othersFiltered = blacklist(others, "onSubmit", "hideErrors");
    const elements = this._addRefs(children, true);
    const errorList = this.state.errorList.length > 0 &&
      !this.props.hideErrors && (
        <Alert type="danger">
          <ul>
            {this.state.errorList.map(error => {
              return (
                <li key={"errorItem_" + error.name}>
                  {error.name}: {error.message}
                </li>
              );
            })}
          </ul>
        </Alert>
      );
    return (
      <React.Fragment>
        {errorList}
        <form
          noValidate={this.props.validate}
          autoComplete="off"
          onSubmit={this._validateAndSubmit}
          {...othersFiltered}
        >
          {elements}
        </form>
      </React.Fragment>
    );
  }
}

Form.propTypes = {
  /** Child elements, either React components or HTML elements. */
  children: PropTypes.node,
  /** Sets whether or not to hide the Alert containing all input errors. */
  hideErrors: PropTypes.bool,
  /** A callback that fires onSubmit. */
  onSubmit: PropTypes.func,
  /** Sets whether or not to use internal component validation. */
  validate: PropTypes.bool
};

Form.defaultProps = {
  hideErrors: false,
  validate: true
};

export default Form;
