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

    this.state = {
      "active": false,
      "children": this.props.children,
      "childrenState": [],
      "value": null,
      "output": null,
      "index": null,
      "tempIndex": null,
      "isValid": props.isValid,
      "errorMessage": messages.requiredMessage,
      "focus": false,
      "zIndex": false,
      "clicked": false
    };
  }

  /* Set initial state values for childrenState, value, output, and index */
  componentDidMount() {
    this.updateChildrenState();
  }

  /* Check if isValid has been passed and if it has a different
   * value than it's current value. If so update isValid and rerender.
   * This method is needed so user's or other components can control if
   * dropdown is valid or not just by passing true or false. Without
   * this lifecycle method dropdown does not rerender.
   * Also updates state properly if children prop is updated.
   */
  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.isValid !== "undefined" &&
      nextProps.isValid !== this.state.isValid
    ) {
      this.setState({ "isValid": nextProps.isValid });
    }
    if (nextProps.children !== this.state.children) {
      this.setState({ "children": nextProps.children }, function() {
        this.updateChildrenState();
      });
    }
  }

  updateChildrenState = () => {
    let initialValue = null;
    let initialDisplay = null;
    let initialIndex = null;

    let childrenState = React.Children.map(
      this.state.children,
      (child, index) => {
        let value = child.props.value || "";
        let display = child.props.children;
        if (value === this.props.value) {
          initialValue = value;
          initialDisplay = display;
          initialIndex = index;
        }
        let childState = { "value": value, "display": display };
        return childState;
      }
    );

    this.setState({
      "childrenState": childrenState,
      "value": this.getInitialValue(childrenState, initialValue),
      "output": this.getInitialDisplay(childrenState, initialDisplay),
      "index": this.getInitialIndex(initialIndex)
    });
  };

  getInitialValue = (childrenState, initialValue) => {
    if (this.state.value !== null) {
      return this.state.value;
    } else if (this.props.value && initialValue !== null) {
      return initialValue;
    } else if (this.props.defaultText) {
      return null;
    } else if (childrenState[0].value) {
      return childrenState[0].value;
    } else {
      return null;
    }
  };

  getInitialDisplay = (childrenState, initialDisplay) => {
    if (this.state.output !== null) {
      return this.state.output;
    } else if (this.props.value && initialDisplay !== null) {
      return initialDisplay;
    } else if (this.props.defaultText) {
      return this.props.defaultText;
    } else if (childrenState[0].display) {
      return childrenState[0].display;
    } else {
      return null;
    }
  };

  getInitialIndex = initialIndex => {
    if (this.state.index !== null) {
      return this.state.index;
    } else if (this.props.value && initialIndex !== null) {
      return initialIndex;
    } else if (this.props.defaultText) {
      return null;
    } else {
      return 0;
    }
  };

  /**
   *  _clickHandler is used when the dropdown option is selected.
   *
   */
  _clickHandler = (i, event, keypress) => {
    if (this.props.disabled) {
      return;
    }

    if (!keypress) {
      event.persist();
    }

    this.setState({ "clicked": !this.state.clicked });

    if (typeof this.props.onBeforeChange !== "undefined") {
      if (this.props.onBeforeChange(this.state.active) === false) {
        return;
      }
    }

    const output = this.state.childrenState[i].display;
    const inputValue = this.state.childrenState[i].value;

    let isValid = true;
    if (inputValue === "") {
      isValid = false;
    }

    this.setState(
      {
        "index": i,
        "output": output,
        "active": !this.state.active,
        "value": inputValue,
        "zIndex": false,
        "isValid": isValid
      },
      function() {
        this._validationHandler(this.props.errorCallback);
        if (this.props.onChange) {
          this.props.onChange(
            inputValue,
            event,
            this.state.isValid,
            this.props.name
          );
        }
        if (this.props.onClick) {
          this.props.onClick(
            inputValue,
            event,
            this.state.isValid,
            this.props.name
          );
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
      this.setState({
        "focus": false,
        "active": false,
        "zIndex": false,
        "index": this.state.tempIndex
      });
      this._validationHandler(this.props.errorCallback);
    }

    if (this.state.clicked === true) {
      return;
    }

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

    let isValid = true;
    if (this.props.required === true) {
      if (
        this.state.value === null ||
        typeof this.state.value === "undefined" ||
        this.state.value === ""
      ) {
        isValid = false;
      }
    }

    this.setState({
      "isValid": isValid,
      "errorMessage": this.state.errorMessage
    });
  };

  _keyDown = event => {
    const indexValid = typeof this.state.index === "number";
    let newIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const tempIndex =
        this.state.tempIndex === this.state.index ||
        this.state.tempIndex === null
          ? this.state.index
          : this.state.tempIndex;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        newIndex = indexValid ? this.state.index + 1 : 0;
        let count = React.Children.count(this.state.children);
        if (newIndex < count) {
          if (this.state.active) {
            this.setState({
              "tempIndex": tempIndex,
              "index": newIndex
            });
          } else {
            this.setState({
              "index": newIndex,
              "value": this.state.children[newIndex].props.value,
              "output": this.state.children[newIndex].props.children
            });
          }
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        newIndex = this.state.index - 1;
        if (newIndex >= 0) {
          if (this.state.active) {
            this.setState({
              "tempIndex": tempIndex,
              "index": newIndex
            });
          } else {
            this.setState({
              "index": newIndex,
              "value": this.state.children[newIndex].props.value,
              "output": this.state.children[newIndex].props.children
            });
          }
        }
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (!this.props.disabled) {
        /* If active is false run validation. Don't
         * run validation when active is true because
         * that means we are opening and we don't want
         * to run validation on open. */
        if (this.state.active === true) {
          this._validationHandler(this.props.errorCallback);
          if (this.state.index !== this.state.tempIndex) {
            this.setState({ "tempIndex": this.state.index }, function() {
              this._clickHandler(this.state.index, null, true);
            });
          } else {
            this.setState({
              "active": !this.state.active,
              "zIndex": !this.state.active
            });
          }
        } else {
          this.setState({
            "active": !this.state.active,
            "zIndex": !this.state.active
          });
        }
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

    let count = React.Children.count(this.state.children);

    // Builds the option list from the children passed in
    // firstChild, lastChild and selected each have unique styling and those classes are added here
    const bound_children = React.Children.map(
      this.state.children,
      (child, i) => {
        let emptyClass =
          child.props.children === "" ||
          child.props.children === null ||
          typeof child.props.children === "undefined"
            ? true
            : false;
        let childClasses = cx({
          "ra_Dropdown__selected": i === this.state.index,
          "ra_Dropdown__firstChild": i === 0,
          "ra_Dropdown__lastChild": i === count - 1,
          "ra_Dropdown__emptyChild": emptyClass
        });
        let kid = 
          <li
            key={i}
            className={"ra_Dropdown__item " + childClasses}
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
        <span>{this.state.output}</span>
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
