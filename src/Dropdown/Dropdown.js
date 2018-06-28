import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Label } from "../Label";
import { TextField } from "../TextField";
import { Option } from "../Option";
import { utils } from "../utils";
import matchSorter from "match-sorter";
import CSSModules from "react-css-modules";
import styles from "./Dropdown.css";
import blacklist from "blacklist";

export class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.menuRef = React.createRef();
    this.hoverRef = React.createRef();

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

  // the function was used for keyboard scrolling in dropdown menus
  componentDidUpdate() {
    const menuNode = this.menuRef.current;

    if (this.hoverRef.current !== null) {
      // keyboard scrolls take options in view
      const optionNode = this.hoverRef.current.optionDivRef.current;

      const menuTop = menuNode.scrollTop;
      const menuBottom = menuTop + menuNode.offsetHeight;
      const optionTop = optionNode.offsetTop;
      const optionBottom = optionTop + optionNode.offsetHeight;

      if (menuTop > optionTop || menuBottom < optionBottom) {
        menuNode.scrollTop = optionNode.offsetTop;
      }

      if (menuBottom < optionBottom) {
        menuNode.scrollTop =
          optionNode.offsetTop +
          optionNode.clientHeight -
          menuNode.offsetHeight;
      } else if (menuTop > optionTop) {
        menuNode.scrollTop = optionNode.offsetTop;
      }
    }

    // put dropdown menu fully in view when expanded
    const menuRect = menuNode.getBoundingClientRect();
    if (window.innerHeight < menuRect.bottom) {
      window.scrollBy(0, menuRect.bottom - window.innerHeight);
    }
  }

  /**
   * The function used to render or update the options list
   * Checks for data vs. children, assigns a special prop to the selected option, and determines value and display text of selected item
   */
  setOptions(updatedValues, props, filter, propChange, viaIndex) {
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
        if (filter && !valueFound) {
          returnValue = this.props.valueOnly
            ? checkDisplay(value, value)
            : checkDisplay(text, value);
        }
      }
      if (
        !viaIndex &&
          (typeof filter !== "undefined" && returnValue === value ||
            !filter && setValue === value) ||
        viaIndex &&
          (typeof updatedValues.selectedIndex !== "undefined" &&
            i === updatedValues.selectedIndex ||
            typeof updatedValues.selectedIndex === "undefined" &&
              i === this.state.selectedIndex)
      ) {
        returnDisplay = this.props.valueOnly ? value : text;
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
        const optionElements = optionsArray;
        optionsArray = [];
        optionElements.map((option, i) => {
          const optionObject = {
            "text": option.text,
            "value": option.value,
            "index": i
          };
          optionsArray.push(optionObject);
        });
      } else if (filter) {
        const useDisplay =
          typeof updatedValues.display !== "undefined"
            ? updatedValues.display
            : this.state.display;
        const key = this.props.valueOnly ? "value" : "text";
        optionsArray = matchSorter(optionsArray, useDisplay, {
          "keys": [key]
        });
      }
      return optionsArray;
    };
    if (props.options && !viaIndex) {
      const getDisplay = (text, value) => {
        if (this.props.valueOnly) {
          return value;
        } else {
          return text;
        }
      };
      // Sort and filter then options array if filter is enabled, then render each remaining object as an Option component
      options = getOptions(props.options).map((option, i) => 
        <Option
          hover={
            typeof updatedValues.tempIndex !== "undefined" &&
            i === updatedValues.tempIndex
          }
          ref={
            typeof updatedValues.tempIndex !== "undefined" &&
            i === updatedValues.tempIndex
              ? this.hoverRef
              : null
          }
          index={i}
          key={i}
          optionClick={this.optionOnClick}
          optionHover={this.optionOnMouseOver}
          selected={checkValue(option.value, option.text, i)}
          text={getDisplay(option.text, option.value)}
          value={option.value}
        />
      );
    } else {
      // Add props.children to an array, sort and filter if filter is enabled, and then render the children in the correct order
      let childArray = [];
      const useChildren = viaIndex ? this.state.options : props.children;
      React.Children.map(useChildren, (child, i) => {
        childArray.push({
          "text": child.props.text,
          "value": child.props.value,
          "index": i
        });
      });
      const childList = viaIndex ? this.state.options : props.children;
      options = getOptions(childArray).map((child, i) => {
        return cloneElement(childList[child.index], {
          "hover":
            typeof updatedValues.tempIndex !== "undefined" &&
            i === updatedValues.tempIndex,
          "ref":
            typeof updatedValues.tempIndex !== "undefined" &&
            i === updatedValues.tempIndex
              ? this.hoverRef
              : null,
          "index": i,
          "key": i,
          "optionClick": this.optionOnClick,
          "optionHover": this.optionOnMouseOver,
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
      "status": this.state.status,
      "message": this.state.message
    };

    if (!change && typeof this.props.onBlur === "function") {
      this.props.onBlur(e, data);
    }

    if (change && typeof this.props.onChange === "function") {
      this.props.onChange(e, data);
    }
  };

  // Validator function checks for required or custom validation
  _validate = inputValue => {
    return utils.validate(
      inputValue,
      this.props.valid,
      this.props.status,
      this.props.message,
      this.props.required
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
      const validationObject = this._validate(value);
      this.setState(
        {
          "options": data.options,
          "display": data.display,
          ...updatedValues,
          ...validationObject
        },
        () => {
          this._eventHandlers(e, true);
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
    const validationObject = !focus ? this._validate(this.state.value) : {};
    let updatedValues = {};
    if (this.state.value === "" && !focus) {
      updatedValues.display = "";
      const data = this.setOptions(updatedValues, this.props);
      updatedValues.options = data.options;
    }
    this.setState(
      {
        "focus": focus,
        "active": active,
        ...validationObject,
        ...updatedValues
      },
      () => {
        if (!focus) {
          this._eventHandlers(e);
        } else if (this.props.onFocus) {
          this.props.onFocus(e, {
            "value": this.state.value,
            "status": this.state.status,
            "message": this.state.message
          });
        }
      }
    );
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
    const newActive = this.props.readOnly
      ? this.state.active
      : !this.state.active;
    this.setState({ "active": newActive }, () => {
      if (this.props.onClick) {
        this.props.onClick(e, {
          "value": this.state.value,
          "status": this.state.status,
          "message": this.state.message
        });
      }
    });
  };

  // Used for filter. Fires when the value changes whether by click or by typing characters
  _handleChange = (e, returnData) => {
    e.persist();
    if (this.props.filter) {
      const tempValue = returnData.value;
      let updatedValues = {
        "selectedIndex": null,
        "display": tempValue,
        "tempIndex": 0
      };
      if (this.props.valueOnly) {
        updatedValues.value = tempValue;
      }
      const data = this.setOptions(updatedValues, this.props, true);
      let setObject = {
        "options": data.options
      };
      if (data.options.length > 1) {
        setObject.active = true;
      }
      if (!this.props.valueOnly) {
        setObject.value = data.value;
      }
      const validationObject = this._validate(data.value);
      this.setState(
        {
          ...setObject,
          ...updatedValues,
          ...validationObject
        },
        () => {
          this._eventHandlers(e, true);
        }
      );
    }
  };

  // For keyboard navigation
  _handleKeyDown = e => {
    // helper method and variable
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
    let newIndex;

    if (this.state.focus === true) {
      // if not active, action: expand the dropdown
      if (
        !this.state.active &&
        (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter")
      ) {
        e.preventDefault();
        if (
          typeof this.props.disabled !== "undefined" && this.props.disabled ||
          typeof this.props.readOnly !== "undefined" && this.props.readOnly
        ) {
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
      } else if (
        this.state.active &&
        (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter")
      ) {
        e.preventDefault();
        if (e.key === "ArrowDown") {
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
        } else if (e.key === "ArrowUp") {
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
        } else if (e.key === "Enter") {
          if (
            typeof this.props.disabled !== "undefined" &&
              this.props.disabled ||
            typeof this.props.readOnly !== "undefined" && this.props.readOnly
          ) {
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
    }
  };

  _alwaysTrue = () => {
    return true;
  };

  render() {
    let {
      autocomplete,
      className,
      disabled,
      filter,
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
      valueOnly,
      ...others
    } = this.props;

    // Declaring the following variables so they don't get passed to TextField through the prop spread.
    const othersFiltered = blacklist(
      others,
      "children",
      "onBeforeChange",
      "options"
    );

    const wrapperClasses = cx({
      leftLabel,
      inline
    });

    const dropdownClasses = cx({
      "dropdown": true,
      "fillInput": leftLabel,
      "setWidth": typeof style !== "undefined" && style.width,
      inline
    });

    const optionsWrapper = cx({
      "hidden": !this.state.active,
      "options": true,
      "pointer": true
    });

    const inputStyles = cx({
      "pointer": !filter && !this.props.disabled
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

    const textFieldValue = valueOnly ? this.state.value : this.state.display;
    const textFieldName = valueOnly ? name : null;

    return (
      <div styleName={wrapperClasses}>
        {dropdownLabel}
        <div styleName={dropdownClasses}>
          <TextField
            {...othersFiltered}
            autoComplete={autocomplete}
            className={className}
            disabled={disabled}
            id={id}
            inline={false}
            message={this.state.message}
            name={textFieldName}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onClick={this._handleClick}
            onChange={this._handleChange}
            onKeyDown={this._handleKeyDown}
            readOnly={!filter}
            status={this.state.status}
            style={style}
            styleName={inputStyles}
            valid={this._alwaysTrue}
            value={textFieldValue}
          />
          {arrow}
          <div
            ref={this.menuRef}
            styleName={optionsWrapper}
            style={listStyle || style}
          >
            {this.state.options}
          </div>
        </div>
        {!valueOnly && 
          <input
            type="hidden"
            disabled={disabled}
            name={name}
            value={this.state.value || ""}
          />
        }
      </div>
    );
  }
}

Dropdown.propTypes = {
  /** Define the value for the HTML5 autocomplete attribute. */
  "autocomplete": PropTypes.string,
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
  /** Define whether the Dropdown will have filter functionality. */
  "filter": PropTypes.bool,
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
  "options": PropTypes.array,
  /** Determines if the Dropdown is display only. */
  "readOnly": PropTypes.bool,
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
  "value": PropTypes.string,
  /** Define whether the Dropdown should display "value" or "text". If "value" is displayed, the visible input will be submitted directly and browser autofill should work. */
  "valueOnly": PropTypes.bool
};

Dropdown.defaultProps = {
  "autocomplete": "off",
  "tooltipPosition": "right"
};

export default CSSModules(Dropdown, styles, { "allowMultiple": true });
