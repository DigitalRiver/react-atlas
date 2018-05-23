import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import messages from "../utils/messages.js";
import cx from "classnames";
import Label from "../Label";
import TextField from "../TextField";
import Option from "../Option";
import matchSorter from "match-sorter";
import CSSModules from "react-css-modules";
import styles from "./Dropdown.css";

export class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    const data = this.setOptions({}, props);

    this.state = {
      "active": false, // Whether or not the options are visible
      "display": data.display, // The text to be displayed for the selected option
      "focus": false, // Whether or not the Dropdown has the browser's focus
      "message": props.message || null, // Used for error handling
      "options": data.options, // The available options for the Dropdown
      "selectedIndex": data.selectedIndex, // The index of the currently selected option within the rendered options list
      "status": props.status || null, // Used for error handling
      "tempIndex": null, // Used to keep track of which option is in a "hover" state, either by mouseOver or through keyboard navigation of an active Dropdown
      "value": props.value // The actual value to submit to the form for the selected option
    };
  }

  // Watching to see if the user updates the list of options or the selected value. If they do, re-render the Dropdown accordingly
  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.options !== "undefined" &&
        nextProps.options !== this.props.options ||
      typeof nextProps.children !== "undefined" &&
        typeof nextProps.options === "undefined" &&
        nextProps.children !== this.props.children ||
      nextProps.value !== this.props.value
    ) {
      const data = this.setOptions({}, nextProps, false, true);
      this.setState({
        "options": data.options,
        "display": data.display,
        "value": nextProps.value
      });
    }
    if (
      typeof nextProps.status !== "undefined" &&
        nextProps.status !== this.props.status ||
      typeof nextProps.message !== "undefined" &&
        nextProps.message !== this.props.message
    ) {
      this.setState({
        "status": nextProps.status,
        "message": nextProps.message
      });
    }
  }

  /**
   * The function used to render or update the options list
   * Checks for data vs. children, assigns a special prop to the selected option, and determines value and display text of selected item
   */
  setOptions(updatedValues, props, autocomplete, propChange, viaIndex) {
    let returnDisplay = "";
    let returnValue = "";
    let valueFound = false;
    let selectedIndex = null;
    // Check the known display text to get the option's value
    const checkDisplay = (display, value) => {
      if (
        typeof updatedValues.display !== "undefined" &&
          updatedValues.display === display
      ) {
        valueFound = true;
        return value;
      } else {
        return "";
      }
    };
    // Check the known value to get the option's display text and index
    const checkValue = (value, text, i) => {
      let setValue = props.value;
      if (!propChange) {
        if (typeof updatedValues.value !== "undefined") {
          setValue = updatedValues.value;
        }
        if (autocomplete && !valueFound) {
          returnValue = checkDisplay(text, value);
        }
      }
      if (
        !viaIndex &&
          (typeof autocomplete !== "undefined" && returnValue === value ||
            !autocomplete && setValue === value) ||
        viaIndex &&
          (typeof updatedValues.selectedIndex !== "undefined" &&
              i === updatedValues.selectedIndex)
      ) {
        returnDisplay = text;
        selectedIndex = i;
        returnValue = value;
        return true;
      } else {
        return false;
      }
    };
    let options;
    const getOptions = startObject => {
      let optionsArray = startObject;
      if (viaIndex) {
        const optionElements = this.state.options;
        optionsArray = [];
        optionElements.map((option, i) => {
          const optionIndex = option.props.index || i;
          const optionObject = {
            "text": option.props.text,
            "value": option.props.value,
            "index": optionIndex
          };
          optionsArray.push(optionObject);
        });
      } else if (autocomplete) {
        const useDisplay =
          typeof updatedValues.display !== "undefined"
            ? updatedValues.display
            : this.state.display;
        optionsArray = matchSorter(startObject, useDisplay, {
          "keys": ["text"]
        });
      }
      return optionsArray;
    };
    if (props.options) {
      // Sort and filter then options array if autocomplete is enabled, then render each remaining object as an Option component
      options = getOptions(props.options).map((option, i) => 
        <Option
          hover={
            typeof updatedValues.tempIndex !== "undefined" &&
            i === updatedValues.tempIndex
          }
          index={i}
          key={i}
          onClick={this.optionOnClick}
          onHover={this.optionOnMouseOver}
          selected={checkValue(option.value, option.text, i)}
          text={option.text}
          value={option.value}
        />
      );
    } else {
      // Add props.children to an array, sort and filter if autocomplete is enabled, and then render the children in the correct order
      let childArray = [];
      React.Children.map(props.children, (child, i) => {
        childArray.push({
          "text": child.props.text,
          "value": child.props.value,
          "index": i
        });
      });
      options = getOptions(childArray).map((child, i) => {
        return cloneElement(props.children[child.index], {
          "hover":
            typeof updatedValues.tempIndex !== "undefined" &&
            i === updatedValues.tempIndex,
          "index": i,
          "key": i,
          "onClick": this.optionOnClick,
          "onHover": this.optionOnMouseOver,
          "selected": checkValue(child.value, child.text, i)
        });
      });
    }
    return {
      "options": options,
      "display": returnDisplay,
      "value": returnValue,
      "selectedIndex": selectedIndex
    };
  }

  // Events to be fired after validation
  _eventHandlers = (e, change) => {
    const data = {
      "value": this.state.value,
      "status": this.state.status
    };

    if (!change && typeof this.props.onBlur === "function") {
      this.props.onBlur(e, data);
    }

    if (change && typeof this.props.onChange === "function") {
      this.props.onChange(e, data);
    }
  };

  // Validator function checks for required or custom validation
  _validate = (e, inputValue, change) => {
    let status = null;
    let message = null;
    /* Execute custom validator and change state and error messages accordingly */
    if (typeof this.props.valid === "function") {
      let validationObject = this.props.valid(inputValue);
      if (validationObject === false) {
        validationObject = { "status": "error", "message": null };
      }
      if (typeof validationObject === "undefined") {
        validationObject = { "status": null, "message": null };
      }
      status = validationObject.status;
      message = validationObject.message;
    } else if (
      (typeof inputValue === "undefined" || inputValue === "") &&
      (this.props.required ||
        typeof this.props.required === "string" && this.props.required === "")
    ) {
      /* If the field is required, and it has no value, change state and display error message */
      message = messages.requiredMessage;
      status = "error";
    }
    this.setState(
      {
        "status": status,
        "message": message
      },
      () => {
        this._eventHandlers(e, change);
      }
    );
  };

  // Callback function passed to each option to register click events
  optionOnClick = (e, value, index) => {
    if (value !== this.state.value) {
      if (typeof this.props.onBeforeChange === "function") {
        if (this.props.onBeforeChange(value) === false) {
          return;
        }
      }
      const updatedValues = {
        "tempIndex": null,
        "selectedIndex": index,
        "value": value
      };
      const data = this.setOptions(updatedValues, this.props);
      this.setState(
        {
          "options": data.options,
          "display": data.display,
          ...updatedValues
        },
        () => {
          this._validate(e, value, true);
        }
      );
    }
  };

  optionOnMouseOver = (e, index) => {
    const updatedValues = { "tempIndex": index };
    const data = this.setOptions(updatedValues, this.props, false, false, true);
    this.setState({
      "options": data.options,
      ...updatedValues
    });
  };

  // Update active state onFocus or onBlur
  _handleActive = (e, focus) => {
    e.persist();
    const active = focus ? this.state.active : false;
    this.setState({ "focus": focus, "active": active }, () => {
      if (!focus) {
        this._validate(e, this.state.value);
      } else if (this.props.onFocus) {
        this.props.onFocus(e, {
          "value": this.state.value,
          "status": this.state.status
        });
      }
    });
  };

  _handleBlur = e => {
    e.persist();
    this._handleActive(e, false);
  };

  _handleFocus = e => {
    e.persist();
    this._handleActive(e, true);
  };

  // Fires when the Dropdown TextField is clicked
  _handleClick = e => {
    e.persist;
    this.setState({ "active": !this.state.active }, () => {
      if (this.props.onClick) {
        this.props.onClick(e, {
          "value": this.state.value,
          "status": this.state.status
        });
      }
    });
  };

  // Used for autocomplete. Fires when the value changes whether by click or by typing characters
  _handleChange = (e, returnData) => {
    e.persist();
    if (this.props.autocomplete) {
      const tempValue = returnData.value;
      const updatedValues = {
        "selectedIndex": null,
        "display": tempValue
      };
      const data = this.setOptions(updatedValues, this.props, true);
      this.setState(
        {
          "options": data.options,
          "value": data.value,
          ...updatedValues
        },
        () => {
          this._validate(e, data.value, true);
        }
      );
    }
  };

  // For keyboard navigation
  _handleKeyDown = e => {
    if (this.state.focus === true) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        let newIndex;
        const updateIndex = i => {
          const updatedValues = { "selectedIndex": i };
          const data = this.setOptions(
            updatedValues,
            this.props,
            false,
            false,
            true
          );
          this.setState(
            {
              "display": data.display,
              "options": data.options,
              "value": data.value,
              ...updatedValues
            },
            () => {
              this._validate(e, data.value, true);
            }
          );
        };
        const updateTempIndex = i => {
          const updatedValues = { "tempIndex": i };
          const data = this.setOptions(
            updatedValues,
            this.props,
            false,
            false,
            true
          );
          this.setState({
            "options": data.options,
            ...updatedValues
          });
        };
        if (e.key === "ArrowDown") {
          if (!this.state.active) {
            if (
              this.state.selectedIndex === null ||
              this.state.selectedIndex < this.state.options.length - 1
            ) {
              newIndex =
                this.state.selectedIndex === null
                  ? 0
                  : this.state.selectedIndex + 1;
              updateIndex(newIndex);
            }
          } else {
            if (
              this.state.tempIndex !== null &&
              this.state.tempIndex < this.state.options.length - 1
            ) {
              newIndex = this.state.tempIndex + 1;
            } else if (
              this.state.tempIndex !== null &&
              this.state.tempIndex === this.state.options.length - 1
            ) {
              newIndex = 0;
            } else if (
              this.state.selectedIndex !== null &&
              this.state.selectedIndex < this.state.options.length - 1
            ) {
              newIndex = this.state.selectedIndex + 1;
            } else {
              newIndex = 0;
            }
            updateTempIndex(newIndex);
          }
        } else {
          if (!this.state.active) {
            if (
              this.state.selectedIndex !== null &&
              this.state.selectedIndex > 0
            ) {
              newIndex = this.state.selectedIndex - 1;
              updateIndex(newIndex);
            }
          } else {
            if (this.state.tempIndex !== null && this.state.tempIndex > 0) {
              newIndex = this.state.tempIndex - 1;
            } else if (
              this.state.tempIndex !== null &&
              this.state.tempIndex === 0
            ) {
              newIndex = this.state.options.length - 1;
            } else if (
              this.state.selectedIndex !== null &&
              this.state.selectedIndex > 0
            ) {
              newIndex = this.state.selectedIndex - 1;
            } else {
              newIndex = this.state.options.length - 1;
            }
            updateTempIndex(newIndex);
          }
        }
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (typeof this.props.disabled !== "undefined" && this.props.disabled) {
          return false;
        }
        this.setState(
          {
            "active": !this.state.active
          },
          () => {
            if (!this.state.active && this.state.tempIndex !== null) {
              const newValue = this.state.options[this.state.tempIndex].props
                .value;
              this.optionOnClick(null, newValue, this.state.tempIndex);
            }
          }
        );
      }
    }
  };

  _alwaysTrue = () => {
    return true;
  };

  render() {
    let {
      autocomplete,
      className,
      id,
      inline,
      label,
      leftLabel,
      listStyle,
      name,
      required,
      style,
      tooltip,
      tooltipPosition,
      /*eslint-disable */
      // Declaring the following variables so they don't get passed to TextField through the prop spread.
      children,
      onBlur,
      onChange,
      onClick,
      onFocus,
      options,
      valid,
      value,
      /*eslint-enable */
      ...others
    } = this.props;

    const wrapperClasses = cx({
      leftLabel,
      inline
    });

    const dropdownClasses = cx({
      "dropdown": true,
      "setWidth": typeof style !== "undefined" && style.width,
      inline
    });

    const optionsWrapper = cx({
      "hidden": !this.state.active,
      "options": true,
      "pointer": true
    });

    const inputStyles = cx({
      "pointer": !autocomplete && !this.props.disabled
    });

    const arrowStyles = cx({
      "arrow": true,
      "arrowUp": this.state.active
    });

    const dropdownLabel = (label || tooltip) && 
      <Label
        htmlFor={id}
        inline={inline}
        label={label}
        leftLabel={leftLabel}
        required={required}
        status={this.state.status}
        tooltip={tooltip}
        tooltipPosition={tooltipPosition}
      />
    ;

    const arrow = <i styleName={arrowStyles} />;

    return (
      <div styleName={wrapperClasses}>
        {dropdownLabel}
        <div styleName={dropdownClasses}>
          <TextField
            className={className}
            id={id}
            inline
            message={this.state.message}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onClick={this._handleClick}
            onChange={this._handleChange}
            onKeyDown={this._handleKeyDown}
            readOnly={!autocomplete}
            status={this.state.status}
            style={style}
            styleName={inputStyles}
            valid={this._alwaysTrue}
            value={this.state.display}
            {...others}
          />
          {arrow}
          <div styleName={optionsWrapper} style={listStyle || style}>
            {this.state.options}
          </div>
        </div>
        <input type="hidden" name={name} value={this.state.value || ""} />
      </div>
    );
  }
}

Dropdown.propTypes = {
  /** Define whether the Dropdown will have autocomplete functionality. */
  "autocomplete": PropTypes.bool,
  /** Child elements, typically Option components. */
  "children": PropTypes.node,
  /** An Object, array, or string of CSS classes to apply to Dropdown. */
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /** Determines if the Dropdown is disabled. */
  "disabled": PropTypes.string,
  /** Define an id for the Dropdown. */
  "id": PropTypes.string,
  /** Sets whether or not Dropdown will display as inline. */
  "inline": PropTypes.bool,
  /** Define a label to be displayed above the Dropdown.*/
  "label": PropTypes.string,
  /** Allows user to move the label to the left of the Dropdown instead of above it. */
  "leftLabel": PropTypes.bool,
  /** Pass inline styling for the options list here. */
  "listStyle": PropTypes.object,
  /** Sets the status message to display below the Dropdown. The color of the message will be determined by the value of the "status" property. */
  "message": PropTypes.string,
  /** Defines a name for the input. */
  "name": PropTypes.string,
  /** A callback that fires before the Dropdown changes values. Can be used with confirmation warnings. Should return true or false. */
  "onBeforeChange": PropTypes.func,
  /** A callback that fires onBlur. */
  "onBlur": PropTypes.func,
  /** A callback that fires onChange. */
  "onChange": PropTypes.func,
  /** A callback that fires onClick. */
  "onClick": PropTypes.func,
  /** A callback that fires onFocus. */
  "onFocus": PropTypes.func,
  /** A javascript array of objects containing both "value" and "text" attributes. */
  "options": PropTypes.object,
  /** Sets the Dropdown as required. Will be validated onChange. Accepts a boolean or a string. If a string is passed it will be displayed instead of the traditional * next to the field label. */
  "required": PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Sets the status of the Dropdown. Options are null, "success", "error", and "warning". */
  "status": PropTypes.string,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /** Sets an element to be displayed along with the Dropdown. Traditionally used with the Tooltip component, but will accept any component or HTML element. */
  "tooltip": PropTypes.node,
  /** Sets the position of the embedded Tooltip. Defaults to "right", any other value will move it next to the label. */
  "tooltipPosition": PropTypes.string,
  /** Sets a handler function to be executed and validate against. Will override the required property (you can still use the required prop to add a required indicator next to the label) and must return an object with a status (Options: null, "success", "error", "warning") and a message (Options: null or string), or a boolean for simple validation. */
  "valid": PropTypes.func,
  /** Define a default value for the Dropdown.*/
  "value": PropTypes.string
};

Dropdown.defaultProps = {
  "tooltipPosition": "right"
};

export default CSSModules(Dropdown, styles, { "allowMultiple": true });
