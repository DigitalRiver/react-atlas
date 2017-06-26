import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { ButtonCore } from "../index";

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
      "output": this.props.customDefaultText
        ? this.props.customDefaultText
        : "Select One",
      "inputValue": "",
      "valid": true,
      "errorMessage": "",
      "onChange": "",
      "focus": false,
      "zIndex": false
    };
  }

  /**
   * Listeners added which call functions for window click outside of dropdown and blur outside of browser
   */
  componentDidMount() {
    window.addEventListener("click", this._onWindowClick);
    window.addEventListener("blur", this._onWindowBlur);
  }

  /**
   * Listeners added which call functions for window click outside of dropdown and blur outside of browser
   */
  componentWillUnmount() {
    window.removeEventListener("click", this._onWindowClick);
    window.addEventListener("blur", this._onWindowBlur);
  }

  /**
   * close dropdown on window click if outside of dropdown
   */
  _onWindowClick = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.active === true) {
        this.setState({
          "active": false,
          "zIndex": false
        });
      }
    }
  };

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
    if (!this.props.disabled) {
      if (
        typeof this.props.onBeforeChange === "undefined" ||
        this.props.onBeforeChange(this.state.active)
      ) {
        const output = event.target.innerText;
        const inputValue = event.target.firstElementChild &&
          event.target.firstElementChild.getAttribute("value")
          ? event.target.firstElementChild.getAttribute("value")
          : "";
        this.setState({
          "index": i,
          "output": output,
          "active": !this.state.active,
          "inputValue": inputValue,
          "valid": true,
          "zIndex": false
        });

        this._customOnchangeEvent(event);
        this._customOnclickEvent(event);
      }
    }
  };

  _customOnchangeEvent = event => {
    /* Pass the event object, and a data object to the click handler.
    The data object contains a boolean for whether the dropdown was
    changed or not, plus all the props passed to the object.  */
    if (this.props.onChange) {
      this.props.onClick(event, {
        "active": this.state.valid,
        "props": this.props
      });
    }
  };

  _customOnclickEvent = event => {
    /* Pass the event object, and a data object to the click handler.
      The data object contains a boolean for whether the dropdown was
      clicked or not, plus all the props passed to the object.  */
    if (this.props.onClick) {
      this.props.onClick(event, {
        "active": this.state.valid,
        "props": this.props
      });
    }
  };


  _customOnchangeEvent = event => {
    /* Pass the event object, and a data object to the click handler.
    The data object contains a boolean for whether the dropdown was
    changed or not, plus all the props passed to the object.  */
    if (this.props.onChange) {
      this.props.onClick(event, {
        "active": this.state.valid,
        "props": this.props
      });
    }
  }

  _customOnclickEvent = event => {
    /* Pass the event object, and a data object to the click handler.
      The data object contains a boolean for whether the dropdown was
      clicked or not, plus all the props passed to the object.  */
    if (this.props.onClick) {

      this.props.onClick(event, {
        "active": this.state.valid,
        "props": this.props
      });
    }
  }

  _toggle = event => {
    /* Toggles the dropdown from active to inactive state, sets valid to true and zIndex to true.
      Active is used to show/hide options, valid is used to show/hide error messaging related to validation and zIndex sets a class on the component to ensure it has the proper index on the DOM
     */
    if (!this.props.disabled) {
      this.setState({
        "active": !this.state.active,
        "valid": true,
        "zIndex": !this.state.zIndex
      });

      this._customOnclickEvent(event);
    }
  };

  _validationHandler = callback => {
    /* Checks that required has been set to true and determines if errorCallback message was passed in a custom error message.
      Also sets state of valid depending on user action
      */
    const validationObject = callback
      ? callback(event, this.state.inputValue)
      : {
          "valid":
            this.props.required && this.state.inputValue !== "" ||
              !this.props.required,
          "message": "This field is required"
        };

    this.setState({
      "valid": validationObject.valid,
      "errorMessage": validationObject.message
    });
  };

  _blur = callback => {
    /* When the user exits dropdown the state is change for focus and validation method is called
     */
    if (!this.props.disabled) {
      this.setState({ "focus": false });
      this._validationHandler(callback);
    }
  };

  render() {
    const {
      children,
      className,
      required,
      customLabel,
      buttonWidth,
      errorCallback,
      disabled
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
      let childClasses = cx({
        "ra_dropdown__selected": i === this.state.index,
        "ra_dropdown__firstChild": i === 0,
        "ra_dropdown__lastChild": i === children.length - 1
      });
      let kid = 
        <li
          key={i}
          className={"ra_dropdown__item " + childClasses}
          onClick={e => {
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
        ref={node => {
          this.wrapperRef = node;
        }}
        className={className}
        styleName={classes}
        onFocus={() => {
          this.setState({ "focus": true });
        }}
        onBlur={() => {
          this._blur(errorCallback);
        }}
      >
        {customLabel
          ? <div styleName={"labelSpacing"}>
              {customLabel}
              {required ? <span styleName={"requiredIndicator"}>*</span> : null}
            </div>
          : null}
        <div onClick={this._toggle} styleName={cx("content")}>
          <div style={{ "width": buttonWidth + "px" }}>
            <ButtonCore
              styleName={cx("buttonClass")}
              className={dropdownButtonClasses}
            >
              <span>{this.state.output}</span><i styleName="arrow" />
            </ButtonCore>
          </div>
          {this.state.active
            ? <span styleName={"list"}>{bound_children}</span>
            : null}
          <input type="hidden" value={this.state.inputValue} />
        </div>
        {error &&
          <span styleName={cx("error_message")}>
            {this.state.errorMessage}
          </span>}
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

  /**
   * Allows the user to pass a function for custom validation. Should return either true or false.
   */
  "errorCallback": PropTypes.func,

  /* The children elements to be wrapped by the dropdown menu. */
  "children": PropTypes.node,

  /* Pass CSS styles to className to set them on the dropdown component. */
  "className": PropTypes.string,

  /* Default text to show in collapsed dropdown on initial render */
  "customDefaultText": PropTypes.string,

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
