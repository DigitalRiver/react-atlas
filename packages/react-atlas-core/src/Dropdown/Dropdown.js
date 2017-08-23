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
    this.state = {
      "active": false,
      "output": this._getOutput(),
      "value": this._getValue() || '',
      "valid": true,
      "errorMessage": "This field is required",
      "onChange": "",
      "focus": false,
      "zIndex": false
    };
    let isFocus = false; // eslint-disable-line no-unused-vars
  }

  _getOutput = () => {
    let count = React.Children.count(this.props.children);
    for(let i = 0; i < count; i++) {
      if(this.props.children[i].props.selected){
        return this.props.children[i].props.children
      }
    }
    if(this.props.defaultText){
      return this.props.defaultText;
    } else {
      return messages.selectOne;
    }
  }

  _getValue = () => {
    let count = React.Children.count(this.props.children);

    for(let i = 0; i < count; i++) {
      if(this.props.children[i].props.selected){
        return this.props.children[i].props.value;
      }
    }

    return null;
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
    event.persist();
    if (!this.props.disabled) {
      if (
        typeof this.props.onBeforeChange === "undefined" ||
        this.props.onBeforeChange(this.state.active)
      ) {
        const output = this.props.children[i].props.children;
        const inputValue = this.props.children[i].props.value;
        this.setState({
          "index": i,
          "output": output,
          "active": !this.state.active,
          "value": inputValue,
          "valid": true,
          "zIndex": false
        }, function(){
          this._validationHandler(this.props.errorCallback);
          if (this.props.onChange) {
            this._customOnChangeEvent(event);
          }
          if (this.props.onClick) {
            this._customOnClickEvent(event);
          }
        });

      }
    }
  };

  _customOnChangeEvent = event => {
    /* Pass the event object, and a data object to the click handler.
    The data object contains a boolean for whether the dropdown was
    changed or not, plus all the props passed to the object.  */
    event.persist();
    this.props.onChange(this.state.value, event);
  };

  _customOnClickEvent = event => {
    /* Pass the event object, and a data object to the click handler.
      The data object contains a boolean for whether the dropdown was
      clicked or not, plus all the props passed to the object.  */
    event.persist();
    this.props.onClick(this.state.value, event);
  };

  _toggle = (focus, event) => {
    /* Toggles the dropdown from active to inactive state, sets valid to true and zIndex to true.
      Active is used to show/hide options, valid is used to show/hide error messaging related to validation and zIndex sets a class on the component to ensure it has the proper index on the DOM
     */
    let canProceed = true;
    if(focus === "click" && this.isFocus) {
      canProceed = false;
      this.isFocus = false;
    } else if (focus === true) {
      this.isFocus = true;
    }
    if (!this.props.disabled && canProceed) {
      const action = focus && !this.state.active ? true : false;
      if(action){
        this.setState({
          "focus": true,
          "active": true,
          "valid": true,
          "zIndex": true
        });
      } else {
        /* When the user exits dropdown the state is change for focus and validation method is called
         */
        this.setState({ "focus": false, "active": false, "zIndex": false });
        this._validationHandler(this.props.errorCallback);
      }

      if (this.props.onClick) {
        this._customOnClickEvent(event);
      }
    }
  };

  _validationHandler = callback => {
    /* Checks that required has been set to true and determines if errorCallback message was passed in a custom error message.
      Also sets state of valid depending on user action
      */
    let validationObject = {
      "valid":
        this.props.required && this.state.value !== "" ||
          !this.props.required,
      "message": this.state.errorMessage
    };
    if(callback){
      validationObject = callback(event, this.state.value);
    }
    this.setState({
      "valid": validationObject.valid,
      "errorMessage": validationObject.message
    });
  };

  _keyDown = event => {
    const indexValid = typeof this.state.index === "number";
    let newIndex;
    event.preventDefault();
    if (event.key === "ArrowDown") {
      newIndex = indexValid ? this.state.index + 1 : 0;
      let count = React.Children.count(this.props.children);
      if(newIndex < count) {
        this.setState({
          "index": newIndex
        });
      }
    } else if (event.key === "ArrowUp") {
      newIndex = this.state.index - 1;
      if(newIndex >= 0) {
        this.setState({
          "index": newIndex
        });
      }
    } else if (event.key === "Enter") {
      this._clickHandler(this.state.index, event);
    }
  }

  render() {
    const {
      children,
      className,
      required,
      customLabel,
      buttonWidth,
      disabled,
      name
    } = this.props;
    const active = this.state.active;
    const error = !this.state.valid && !disabled ? true : false;
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

    // Builds the option list from the children passed in
    // firstChild, lastChild and selected each have unique styling and those classes are added here
    const bound_children = children.map((child, i) => {
      let count = React.Children.count(this.props.children);
      let childClasses = cx({
        "ra_dropdown__selected": i === this.state.index,
        "ra_dropdown__firstChild": i === 0,
        "ra_dropdown__lastChild": i === count - 1
      });
      let kid =
        <li
          key={i}
          className={"ra_dropdown__item " + childClasses}
          onMouseDown={e => { // onMouseDown fires before onBlur. If changed to onClick it will fire after onBlur and not work.
            this._clickHandler(i, e);
          }}
        >
          {child}
        </li>
      ;
      return kid;
    });

    const dropdownButtonClasses = cx(buttonClasses);

    return (
      <div
        name={name}
        className={className}
        styleName={classes}
        onFocus={(e) => {
          this._toggle(true, e);
        }}
        onBlur={(e) => {
          this._toggle(false, e);
        }}
        onKeyDown={e => {
          this._keyDown(e);
        }}
      >
        {customLabel &&
          <div styleName={"labelSpacing"}>
            {customLabel}
            {required &&
              <span styleName={"requiredIndicator"}>*</span>
            }
          </div>
        }
        <div onClick={(e) => { this._toggle("click", e); }} styleName={"content"}>
          <div style={{ "width": buttonWidth + "px" }}>
            <ButtonCore
              styleName={"buttonClass"}
              className={dropdownButtonClasses}
            >
              <span>{this.state.output}</span><i styleName="arrow" />
            </ButtonCore>
          </div>
          {this.state.active &&
            <ul styleName={"list"}>{bound_children}</ul>
          }
          <input type="hidden" value={this.state.value} />
        </div>
        {error &&
          <span styleName={"error_message"}>
            {this.state.errorMessage}
          </span>
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
  "valid": PropTypes.bool,

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
   * Allows the user to pass a function for custom validation. Should return either true or false.
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
