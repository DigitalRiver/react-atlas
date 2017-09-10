import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { ButtonCore } from "../Button";

/**
 * Master Dropdown Component
 * Only used for dropdown component
 * Supports required, disabled, custom width, custom error messaging, onclick and onchange functions
 */
class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    let childrenState = React.Children.map(this.props.children, child => {
      let value = child.props.value || " ";
      let display = child.props.children;
      let childState = { "value": value, "display": display };
      return childState;
    });

    let initialValue = childrenState[0].value;
    let initialDisplay = childrenState[0].display;

    this.state = {
      "active": false,
      "childrenState": childrenState,
      "value": initialValue,
      "output": initialDisplay,
      "isValid": true,
      "errorMessage": "This field is required",
      "focus": false,
      "zIndex": false
    };
    let isFocus = false; // eslint-disable-line no-unused-vars
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isValid !== this.state.isValid) {
      this.setState({ "isValid": nextProps.isValid });
    }
  }

  /**
   * closes dropdown click outside of browser window
   */
  _onWindowBlur = () => {
    if (this.state.active === true) {
      this.setState({
        "active": false,
        "zIndex": false
      });
    }
  };

  /**
   *  _clickHandler is used when the dropdown option is selected.
   *
   */
  _clickHandler = (i, event) => {
    if (this.props.disabled) {
      return;
    }

    event.persist();

    if (typeof this.props.onBeforeChange !== "undefined") {
      if (this.props.onBeforeChange(this.state.active) === false) {
        return;
      }
    }

    const output = this.state.childrenState[i].display;
    const inputValue = this.state.childrenState[i].value;

    this.setState(
      {
        "index": i,
        "output": output,
        "active": !this.state.active,
        "value": inputValue,
        "isValid": true,
        "zIndex": false
      },
      function() {
        this._validationHandler(this.props.errorCallback);
        if (this.props.onChange) {
          this.props.onChange(inputValue, event, this.state.isValid);
        }
        if (this.props.onClick) {
          this.props.onClick(event);
        }
      }
    );
  };

  _toggle = (focus, event) => {
    /* Toggles the dropdown from active to inactive state, sets valid to true and zIndex to true.
      Active is used to show/hide options, valid is used to show/hide error messaging related to validation and zIndex sets a class on the component to ensure it has the proper index on the DOM
     */
    let canProceed = true;
    if (focus === "click" && this.isFocus) {
      canProceed = false;
      this.isFocus = false;
    } else if (focus === true) {
      this.isFocus = true;
    }
    if (!this.props.disabled && canProceed) {
      const action = focus && !this.state.active ? true : false;
      if (action) {
        this.setState({
          "focus": true,
          "active": true,
          "isValid": true,
          "zIndex": true
        });
      } else {
        /* When the user exits dropdown the state is change for focus and validation method is called
         */
        this.setState({ "focus": false, "active": false, "zIndex": false });
        this._validationHandler(this.props.errorCallback);
      }

      if (this.props.onClick) {
        this.props.onClick(event);
      }
    }
  };

  _validationHandler = callback => {
    /* Checks that required has been set to true and determines if errorCallback message was passed in a custom error message.
      Also sets state of valid depending on user action
      */
    let validation;
    if (callback) {
      validation = callback(event, this.state.value);

      if (typeof validation === "undefined") {
        throw "undefined returned from the error callback";
      }

      if (typeof validation === "object") {
        this.setState({
          "isValid": validation.isValid,
          "errorMessage": validation.message
        });
        return;
      }

      if (typeof validation === "boolean") {
        this.setState({
          "isValid": validation,
          "errorMessage": this.state.errorMessage
        });
        return;
      }
    }
    /* No error Callback was passed so just check if required was set. */
    validation = {
      "isValid":
        this.props.required && this.state.value !== "" ||
        !this.props.required,
      "message": this.state.errorMessage
    };
    this.setState({
      "isValid": validation.isValid,
      "errorMessage": validation.message
    });
  };

  _keyDown = event => {
    const indexValid = typeof this.state.index === "number";
    let newIndex;
    event.preventDefault();
    if (event.key === "ArrowDown") {
      newIndex = indexValid ? this.state.index + 1 : 0;
      let count = React.Children.count(this.props.children);
      if (newIndex < count) {
        this.setState({
          "index": newIndex
        });
      }
    } else if (event.key === "ArrowUp") {
      newIndex = this.state.index - 1;
      if (newIndex >= 0) {
        this.setState({
          "index": newIndex
        });
      }
    } else if (event.key === "Enter") {
      this._clickHandler(this.state.index, event);
    }
  };

  render() {
    const {
      className,
      required,
      customLabel,
      buttonWidth,
      disabled,
      name
    } = this.props;
    const active = this.state.active;
    const error = !this.state.isValid && !disabled ? true : false;
    let zIndex = this.state.zIndex ? true : false;
    const classes = cx({
      "active": active,
      "container": true,
      "zIndex": zIndex
    });

    const buttonClasses = cx({
      "ra_dropdown__dropdown-button": true,
      "ra_dropdown__error": error,
      "ra_dropdown__disabledClass": disabled
    });

    let count = React.Children.count(this.props.children);

    // Builds the option list from the children passed in
    // firstChild, lastChild and selected each have unique styling and those classes are added here
    const bound_children = React.Children.map(
      this.props.children,
      (child, i) => {
        let childClasses = cx({
          "ra_dropdown__selected": i === this.state.index,
          "ra_dropdown__firstChild": i === 0,
          "ra_dropdown__lastChild": i === count - 1
        });
        let kid =
          <li
            key={i}
            className={"ra_dropdown__item " + childClasses}
            onMouseDown={e => {
              // onMouseDown fires before onBlur. If changed to onClick it will fire after onBlur and not work.
              this._clickHandler(i, e);
            }}
          >
            {child}
          </li>
        ;
        return kid;
      }
    );

    const dropdownButtonClasses = cx(buttonClasses);

    return (
      <div
        name={name}
        className={className}
        styleName={classes}
        onFocus={e => {
          this._toggle(true, e);
        }}
        onBlur={e => {
          this._toggle(false, e);
        }}
        onKeyDown={e => {
          this._keyDown(e);
        }}
      >
        {customLabel &&
          <div styleName={"labelSpacing"}>
            {customLabel}
            {required && <span styleName={"requiredIndicator"}>*</span>}
          </div>
        }
        <div
          onClick={e => {
            this._toggle("click", e);
          }}
          styleName={"content"}
        >
          <div style={{ "width": buttonWidth + "px" }}>
            <ButtonCore
              styleName={"buttonClass"}
              className={dropdownButtonClasses}
            >
              <span>{this.state.output}</span>
              <i styleName="arrow" />
            </ButtonCore>
          </div>
          {this.state.active && <ul styleName={"list"}>{bound_children}</ul>}
          <input type="hidden" value={this.state.value} />
        </div>
        {error &&
          <span styleName={"error_message"}>{this.state.errorMessage}</span>
        }
      </div>
    );
  }
}

Dropdown.propTypes = {
  /**
   * Text for dropdown label
   * @examples 'Some Label'
   */
  "customLabel": PropTypes.string,

  /* Boolean value taht tells the dropdown whether to
    be open or not.*/
  "active": PropTypes.bool,

  /* Boolean value that tells the dropdown whether the value is valid and controls error message is returns false.*/
  "isValid": PropTypes.bool,

  /**
   * If included, dropdown is disabled
   * @examples <Dropdown disabled />, <Dropdown disabled={true} />
   */
  "disabled": PropTypes.bool,

  /**
   * Allows user to pass a callback for click events.
   */
  "onClick": PropTypes.func,

  /**
   * Allows user to pass a function to be executed when the dropdown state is changed.
   */
  "onChange": PropTypes.func,

  /**
   * If included, dropdown will return and error onBlur or onChange if not checked.
   */
  "required": PropTypes.bool,

  /**
   * Allows the user to pass a function for custom validation. Should return either true or false, or
   * an object with the properties valid and message. If false is returned the default error message
   * is used. If an object is used and the valid property is false, the string in the property message
   * will be used for the error message.
   */
  "errorCallback": PropTypes.func,

  /* . */
  "clickEvent": PropTypes.func,

  /* The children elements to be wrapped by the dropdown menu. */
  "children": PropTypes.node.isRequired,

  /* Pass CSS styles to className to set them on the dropdown component. */
  "className": PropTypes.string,

  /* The name of the key value used when submitting the dropdown value. */
  "name": PropTypes.string,

  /* Default text to show in collapsed dropdown on initial render */
  "defaultText": PropTypes.string,

  /* Allows user to ask for user feedback before changing the selected value of the Dropdown. */
  "onBeforeChange": PropTypes.func,

  /* Allows user to set custom width of dropdown */
  "buttonWidth": PropTypes.string
};

Dropdown.defaultProps = {
  "className": "",
  "buttonWidth": "160",
  "required": false,
  "disabled": false
};

export default Dropdown;
