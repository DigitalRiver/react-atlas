import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { ButtonCore } from "../Button";
import messages from "../utils/messages.js";

/**
 * Master Dropdown Component
 * Only used for dropdown component
 * Supports required, disabled, custom width, custom error messaging, onclick and onchange functions
 */
class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    if (typeof this.props.children === "undefined") {
      throw "You must pass at least one child component to Dropdown";
    }

    let initialValue;
    let initialDisplay;
    let initialIndex;
    const dropdownValue = this.props.value;

    let childrenState = React.Children.map(
      this.props.children,
      (child, index) => {
        let value = child.props.value || undefined;
        let display = child.props.children;
        if (value === dropdownValue) {
          initialValue = value;
          initialDisplay = display;
          initialIndex = index;
        }
        let childState = {
          value: value,
          display: display
        };
        return childState;
      }
    );
    this.getInitialValue = function() {
      if (props.value) {
        return initialValue;
      } else if (props.defaultText) {
        return "";
      } else {
        return childrenState[0].value;
      }
    };

    this.getInitialDisplay = function() {
      if (props.value) {
        return initialDisplay;
      } else if (props.defaultText) {
        return props.defaultText;
      } else {
        return childrenState[0].display;
      }
    };

    this.getInitialIndex = function() {
      if (props.value) {
        return initialIndex;
      } else if (props.defaultText) {
        return null;
      } else {
        return 0;
      }
    };

    this.state = {
      active: false,
      childrenState: childrenState,
      value: this.getInitialValue(),
      output: this.getInitialDisplay(),
      index: this.getInitialIndex(),
      isValid: props.isValid,
      errorMessage: messages.requiredMessage,
      focus: false,
      zIndex: false,
      clicked: false
    };
  }

  /* Check if isValid has been passed and if it has a different
   * value than it's current value. If so update isValid and rerender.
   * This method is needed so user's or other components can control if
   * dropdown is valid or not just by passing true or false. Without
   * this lifecycle method dropdown does not rerender.
   */
  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.isValid !== "undefined" &&
      nextProps.isValid !== this.state.isValid
    ) {
      this.setState({ isValid: nextProps.isValid });
    }
  }

  /**
   *  _clickHandler is used when the dropdown option is selected.
   *
   */
  _clickHandler = (i, event) => {
    if (this.props.disabled) {
      return;
    }

    event.persist();

    this.setState({ clicked: !this.state.clicked });

    if (typeof this.props.onBeforeChange !== "undefined") {
      if (this.props.onBeforeChange(this.state.active) === false) {
        return;
      }
    }

    const output = this.state.childrenState[i].display;
    const inputValue = this.state.childrenState[i].value;

    this.setState(
      {
        index: i,
        output: output,
        active: !this.state.active,
        value: inputValue,
        zIndex: false
      },
      function() {
        this._validationHandler(this.props.errorCallback);
        if (this.props.onChange) {
          this.props.onChange(inputValue, event, this.state.isValid, this.props.name);
        }
        if (this.props.onClick) {
          this.props.onClick(inputValue, event, this.state.isValid, this.props.name);
        }
      }
    );
  };

  /* Toggles the dropdown from active to inactive state, sets valid to true and zIndex to true.
   * Active is used to show/hide options, valid is used to show/hide error messaging related to
   * validation and zIndex sets a class on the component to ensure it has the proper index on the DOM
   */
  _toggle = event => {
    if (this.props.disabled === true) {
      return;
    }

    if (this.state.active === true && event.type === "click") {
      this.setState({ active: false, zIndex: false });
    } else if (this.state.active === false && event.type === "click") {
      this.setState({ active: true, zIndex: true });
    } else if (event.type === "focus") {
      this.setState({ focus: true });
    } else if (event.type === "blur") {
      this.setState({ focus: false, active: false, zIndex: false });
    }

    this._validationHandler(this.props.errorCallback);

    if (typeof this.props.onClick !== "undefined") {
      this.props.onClick(this.state.value, event, this.state.isValid);
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
          isValid: validation.isValid,
          errorMessage: validation.message
        });
        return;
      }

      if (typeof validation === "boolean") {
        this.setState({
          isValid: validation,
          errorMessage: this.state.errorMessage
        });
        return;
      }
    }
    /* No error Callback was passed so just check if required was set. */
    validation = {
      isValid: (typeof this.props.required !== 'undefined' && !this.props.required) && typeof this.state.value !== 'undefined',
      message: this.state.errorMessage
    };
    this.setState({
      isValid: validation.isValid,
      errorMessage: validation.message
    });
  };

  _keyDown = event => {
    const indexValid = typeof this.state.index === "number";
    let newIndex;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      newIndex = indexValid ? this.state.index + 1 : 0;
      let count = React.Children.count(this.props.children);
      if (newIndex < count) {
        this.setState({
          index: newIndex,
          value: this.props.children[newIndex].props.value,
          output: this.props.children[newIndex].props.children
        });
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      newIndex = this.state.index - 1;
      if (newIndex >= 0) {
        this.setState({
          index: newIndex,
          value: this.props.children[newIndex].props.value,
          output: this.props.children[newIndex].props.children
        });
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (!this.props.disabled) {
        this.setState({ active: !this.state.active, zIndex: !this.state.active });
      }
    }
  };

  render() {
    const {
      className,
      required,
      customLabel,
      width,
      disabled,
      name,
      inline,
      style
    } = this.props;
    const active = this.state.active;
    const error = !this.state.isValid && !disabled ? true : false;
    let zIndex = this.state.zIndex ? true : false;
    const classes = cx({
      container: true,
      zIndex: zIndex,
      inline: inline
    });

    const buttonClasses = cx({
      buttonClass: true,
      "dropdown-button": true,
      error: error,
      disabledClass: disabled
    });

    const contentClasses = cx({
      content: true,
      focus: this.state.focus
    });

    let count = React.Children.count(this.props.children);

    // Builds the option list from the children passed in
    // firstChild, lastChild and selected each have unique styling and those classes are added here
    const bound_children = React.Children.map(
      this.props.children,
      (child, i) => {
        let childClasses = cx({
          ra_Dropdown__selected: i === this.state.index,
          ra_Dropdown__firstChild: i === 0,
          ra_Dropdown__lastChild: i === count - 1
        });
        let kid = (
          <li
            key={i}
            className={"ra_Dropdown__item " + childClasses}
            styleName={"default-font"}
            onMouseDown={e => {
              // onMouseDown fires before onBlur. If changed to onClick it will fire after onBlur and not work.
              this._clickHandler(i, e);
            }}
          >
            {child}
          </li>
        );
        return kid;
      }
    );

    const listClasses = cx({
      list: true,
      convertedWidth: true,
      zIndex: true
    });

    let list = null;
    if (active === true) {
      list = <ul styleName={listClasses}>{bound_children}</ul>;
    }

    let label = null;
    if (customLabel) {
      label = (
        <div styleName={"labelSpacing"}>
          {customLabel}{" "}
          {required && <span styleName={"requiredIndicator"}>*</span>}
        </div>
      );
    }

    let errorMessage = null;
    if (error) {
      errorMessage = (
        <span styleName={"error_message"}>{this.state.errorMessage}</span>
      );
    }

    let button = (
      <ButtonCore
        onClick={e => {
          this._toggle(e);
        }}
        styleName={buttonClasses}
        type={"button"}
      >
        <span styleName={"default-font"}>{this.state.output}</span>
        <i styleName="arrow" />
      </ButtonCore>
    );

    return (
      <div
        style={style}
        name={name}
        className={cx(className)}
        styleName={classes}
        onFocus={e => {
          this._toggle(e);
        }}
        onBlur={e => {
          this._toggle(e);
        }}
        onKeyDown={e => {
          this._keyDown(e);
        }}
      >
        {label}
        <div styleName={contentClasses} style={{ width: width }}>
          <div styleName={"fullWidth"}>{button}</div>
          {list}
          <input type="hidden" value={this.state.value} />
        </div>
        {errorMessage}
      </div>
    );
  }
}

Dropdown.propTypes = {
  /**
   * Text for dropdown label
   * @examples 'Some Label'
   */
  customLabel: PropTypes.string,

  /* Boolean value taht tells the dropdown whether to
    be open or not.*/
  active: PropTypes.bool,

  /* Boolean value that tells the dropdown whether the value is valid and controls error message is returns false.*/
  isValid: PropTypes.bool,

  /* Boolean value that determines if the dropdown component will display inline*/
  inline: PropTypes.bool,

  /**
   * If included, dropdown is disabled
   * @examples <Dropdown disabled />, <Dropdown disabled={true} />
   */
  disabled: PropTypes.bool,

  /**
   * Allows user to pass a callback for click events.
   */
  onClick: PropTypes.func,

  /**
   * Allows user to pass a function to be executed when the dropdown state is changed.
   */
  onChange: PropTypes.func,

  /**
   * If included, dropdown will return and error onBlur or onChange if not checked.
   */
  required: PropTypes.bool,

  /**
   * Allows the user to pass a function for custom validation. Should return either true or false, or
   * an object with the properties valid and message. If false is returned the default error message
   * is used. If an object is used and the valid property is false, the string in the property message
   * will be used for the error message.
   */
  errorCallback: PropTypes.func,

  /* . */
  clickEvent: PropTypes.func,

  /* The children elements to be wrapped by the dropdown menu. */
  children: PropTypes.node.isRequired,

  /** An Object, array, or string of CSS classes to apply to Dropdown.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /* The name of the key value used when submitting the dropdown value. */
  name: PropTypes.string,

  /* The initial value that the dropdown will default to. */
  value: PropTypes.string,

  /* Default text to show in collapsed dropdown on initial render */
  defaultText: PropTypes.string,

  /* Allows user to ask for user feedback before changing the selected value of the Dropdown. */
  onBeforeChange: PropTypes.func,

  /* Allows user to set custom width of dropdown */
  /* Pass inline styles here. */
  style: PropTypes.node,

  width: PropTypes.string
};

Dropdown.defaultProps = {
  className: "",
  required: false,
  disabled: false,
  isValid: true
};

export default Dropdown;
