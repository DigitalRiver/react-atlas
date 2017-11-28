import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { ButtonCore } from "../Button";
import messages from "../utils/messages.js";
import _utils from "../utils/utils";

/**
 * Master Dropdown Component
 * Only used for dropdown component
 * Supports required, disabled, custom width, custom error messaging, onclick and onchange functions
 */
class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      "active": false,
      "index": 0,
      "errorMessage": messages.requiredMessage,
      "focus": false,
      "zIndex": false,
      "clicked": false
    };
  }

  /* Set initial state values for index */
  componentDidMount() {
    this.updateSelectedIndex(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.updateSelectedIndex(nextProps.value);
      this._validationHandler(nextProps.value);
    }
  }

  updateSelectedIndex = value => {
    let initialIndex = 0;
    if (value) {
      React.Children.forEach(this.props.children, (child, index) => {
        if (child.props.value === value) {
          initialIndex = index;
        }
      });
    } else if (this.props.defaultText) {
      initialIndex = null;
    }
    this.setState({ "index": initialIndex });
  };

  /**
   *  _clickHandler is used when the dropdown option is selected.
   *
   */
  _clickHandler = (i, event, child) => {
    if (this.props.disabled) {
      return;
    }
    if (event) {
      event.persist();
    }
    this.setState({ "clicked": !this.state.clicked });

    if (typeof this.props.onBeforeChange !== "undefined") {
      if (this.props.onBeforeChange(this.state.active) === false) {
        return;
      }
    }
    const inputValue = child.props.value;
    this.setState(
      {
        "index": i,
        "active": !this.state.active,
        "zIndex": false
      },
      function() {
        if (this.props.onChange) {
          this.props.onChange(inputValue, event, this.props.name);
        }
        if (this.props.onClick) {
          this.props.onClick(inputValue, event, this.props.name);
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

    this.setState({ "clicked": !this.state.clicked });

    if (this.state.active === true && event.type === "click") {
      this.setState({ "active": false, "zIndex": false });
    } else if (this.state.active === false && event.type === "click") {
      this.setState({ "active": true, "zIndex": true });
    } else if (event.type === "focus") {
      this.setState({ "focus": true });
    } else if (event.type === "blur") {
      this.updateSelectedIndex(this.props.value);
      this.setState({
        "focus": false,
        "active": false,
        "zIndex": false
      });
      this._validationHandler(this.props.value);
    }

    if (this.state.clicked === true) {
      return;
    }

    if (typeof this.props.onClick !== "undefined") {
      this.props.onClick(this.props.value, event, this.props.isValid);
    }
  };

  _validationHandler = value => {
    /* Checks that required has been set to true and determines if errorCallback message was passed in a custom error message.
      Also sets state of valid depending on user action
      */
    let isValid = true;
    let validation;
    if (this.props.errorCallback) {
      validation = this.props.errorCallback(event, value);

      if (typeof validation === "undefined") {
        throw "undefined returned from the error callback";
      }

      if (typeof validation === "object") {
        isValid = validation.isValid;
        this.setState({
          "errorMessage": validation.message
        });
        if (this.props.validationCallback) {
          this.props.validationCallback(isValid, this.state.errorMessage);
        }
        return;
      }
    }
    if (this.props.required === true) {
      if (_utils.isEmpty(value)) {
        isValid = false;
      }
    }
    if (this.props.validationCallback) {
      this.props.validationCallback(isValid, this.state.errorMessage);
    }
  };

  _keyDown = event => {
    const indexValid = typeof this.state.index === "number";
    let newIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        newIndex = indexValid ? this.state.index + 1 : 0;
        let count = React.Children.count(this.props.children);
        if (newIndex < count) {
          if (this.state.active) {
            this.setState({
              "index": newIndex
            });
          } else {
            if (this.props.onChange) {
              this.props.onChange(
                this.props.children[newIndex].props.value,
                event,
                this.props.name
              );
            }
          }
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        newIndex = this.state.index - 1;
        if (newIndex >= 0) {
          if (this.state.active) {
            this.setState({
              "index": newIndex
            });
          } else {
            if (this.props.onChange) {
              this.props.onChange(
                this.props.children[newIndex].props.value,
                event,
                this.props.name
              );
            }
          }
        }
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (!this.props.disabled) {
        this._clickHandler(
          this.state.index,
          null,
          this.props.children[this.state.index]
        );
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
      defaultText,
      value,
      inline,
      style,
      isValid,
      children
    } = this.props;
    if (typeof children === "undefined") {
      throw "You must pass at least one child component to Dropdown";
    }

    const active = this.state.active;
    const error = !isValid && !disabled;
    let zIndex = this.state.zIndex;
    let output = "";
    const classes = cx({
      "container": true,
      "zIndex": zIndex,
      "inline": inline
    });

    const buttonClasses = cx({
      "buttonClass": true,
      "dropdown-button": true,
      "error": error,
      "disabledClass": disabled
    });

    const contentClasses = cx({
      "content": true,
      "focus": this.state.focus
    });
    if (!_utils.isEmpty(value)) {
      let selectedChild = React.Children.toArray(children).find(child => {
        return child.props.value === value;
      });
      output = selectedChild.props.children;
    } else if (!_utils.isEmpty(defaultText)) {
      output = defaultText;
    } else {
      output = children[0].props.children;
    }

    let count = React.Children.count(children);

    // Builds the option list from the children passed in
    // firstChild, lastChild and selected each have unique styling and those classes are added here
    const bound_children = React.Children.map(children, (child, i) => {
      let emptyClass =
        child.props.children === "" ||
        child.props.children === null ||
        typeof child.props.children === "undefined";
      let childClasses = cx({
        "ra_Dropdown__selected": i === this.state.index,
        "ra_Dropdown__firstChild": i === 0,
        "ra_Dropdown__lastChild": i === count - 1,
        "ra_Dropdown__emptyChild": emptyClass
      });
      return (
        <li
          key={i}
          className={"ra_Dropdown__item " + childClasses}
          onMouseDown={e => {
            // onMouseDown fires before onBlur. If changed to onClick it will fire after onBlur and not work.
            this._clickHandler(i, e, child);
          }}
        >
          {child}
        </li>
      );
    });

    const listClasses = cx({
      "list": true,
      "convertedWidth": true,
      "zIndex": true
    });

    let list = null;
    if (active === true) {
      list = <ul styleName={listClasses}>{bound_children}</ul>;
    }

    let label = null;
    if (customLabel) {
      label = 
        <div styleName={"labelSpacing"}>
          {customLabel}{" "}
          {required && <span styleName={"requiredIndicator"}>*</span>}
        </div>
      ;
    }

    let errorMessage = null;
    if (error) {
      errorMessage = 
        <span styleName={"error_message"}>{this.state.errorMessage}</span>
      ;
    }

    let button = 
      <ButtonCore
        onClick={e => {
          this._toggle(e);
        }}
        styleName={buttonClasses}
        type={"button"}
      >
        <span>{output}</span>
        <i styleName="arrow" />
      </ButtonCore>
    ;

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
        <div styleName={contentClasses} style={{ "width": width }}>
          <div styleName={"fullWidth"}>{button}</div>
          {list}
          <input type="hidden" value={value} />
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
  "customLabel": PropTypes.string,

  /**
   * Boolean value taht tells the dropdown whether to
   * be open or not.
   */
  "active": PropTypes.bool,

  /**
   * Boolean value that tells the dropdown whether the value is valid and controls error message is returns false.
   */
  "isValid": PropTypes.bool,

  /**
   * Boolean value that determines if the dropdown component will display inline
   */
  "inline": PropTypes.bool,

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

  /**
   * function callback after selected item validation
   */
  "validationCallback": PropTypes.func,

  /* . */
  "clickEvent": PropTypes.func,

  /**
   * The children elements to be wrapped by the dropdown menu.
   */
  "children": PropTypes.node.isRequired,

  /** An Object, array, or string of CSS classes to apply to Dropdown.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * The name of the key value used when submitting the dropdown value.
   */
  "name": PropTypes.string,

  /**
   * The initial value that the dropdown will default to.
   */
  "value": PropTypes.string,

  /**
   * Default text to show in collapsed dropdown on initial render
   */
  "defaultText": PropTypes.string,

  /**
   * Allows user to ask for user feedback before changing the selected value of the Dropdown.
   */
  "onBeforeChange": PropTypes.func,

  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,

  /**
   * Allows user to set custom width of dropdown
   */
  "width": PropTypes.string
};

Dropdown.defaultProps = {
  "className": "",
  "required": false,
  "disabled": false,
  "isValid": true
};

export default Dropdown;
