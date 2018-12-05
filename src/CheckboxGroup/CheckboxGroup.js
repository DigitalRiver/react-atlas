import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Label } from "../Label";
import CSSModules from "react-css-modules";
import styles from "./CheckboxGroup.css";

export class CheckboxGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalChecked: this.initialChecked(),
      groupError: false
    };
  }

  // Loop through child components to determine how many <Checkbox /> components are checked by default
  initialChecked() {
    let newChecked = 0;
    React.Children.map(this.props.children, child => {
      if (child.props.checked) {
        newChecked++;
      }
    });
    return newChecked;
  }

  // When child <Checkbox /> component changes state, update "totalChecked" value and verify against min or max props value
  handleChange = data => {
    const newChecked = data.checked
      ? this.state.totalChecked + 1
      : this.state.totalChecked - 1;
    if (
      (this.props.max && newChecked > this.props.max) ||
      (this.props.min && newChecked < this.props.min)
    ) {
      this.setState({ groupError: true, totalChecked: newChecked });
    } else {
      this.setState({ groupError: false, totalChecked: newChecked });
    }

    if (typeof this.props.onChange !== "undefined") {
      this.props.onChange(data);
    }
  };

  // Used from a parent Form component to validate only
  _formValidate = () => {
    if (
      (this.props.max && this.state.totalChecked > this.props.max) ||
      (this.props.min && this.state.totalChecked < this.props.min)
    ) {
      this.setState({ groupError: true });
      return { status: "error", message: this.maxMinMessage() };
    } else {
      this.setState({ groupError: false });
      return { status: null, message: null };
    }
  };

  // If min or max props are set and the correct number of checkboxes aren't checked, display the appropriate error message
  maxMinMessage = () => {
    let fullMessage;
    if (this.props.max && this.state.totalChecked > this.props.max) {
      if (this.props.limitMessage) {
        fullMessage = this.props.limitMessage.replace("{0}", this.props.max);
        return fullMessage;
      } else {
        return `Please select no more than ${
          this.props.max
        } of the options below`;
      }
    } else if (this.props.min && this.state.totalChecked < this.props.min) {
      if (this.props.limitMessage) {
        fullMessage = this.props.limitMessage.replace("{0}", this.props.min);
        return fullMessage;
      } else {
        return (
          "Please select at least " + this.props.min + " of the options below"
        );
      }
    } else {
      return false;
    }
  };

  render() {
    const {
      className,
      children,
      name,
      inline,
      inlineChildren,
      title,
      style
    } = this.props;
    const checkboxGroupStyles = cx({
      checkboxGroup: !inline,
      inline: inline
    });
    let checkboxGroupTitle = title && (
      <div>
        <Label
          inline
          label={title}
          message={this.state.groupError ? this.maxMinMessage() : null}
        />
      </div>
    );
    return (
      <div
        style={style}
        className={cx(className)}
        styleName={checkboxGroupStyles}
      >
        {checkboxGroupTitle}
        {React.Children.map(children, child => {
          child = cloneElement(child, {
            inline: inlineChildren,
            name: name ? name : child.props.name,
            onChange: this.handleChange,
            groupError: this.state.groupError
          });
          return child;
        })}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  /**
   * Anything that can be in a CheckboxGroup. Typically only includes Checkbox components and a header.
   * @examples '<CheckboxGroup><Checkbox/><Checkbox/></CheckboxGroup>'
   */
  children: PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to CheckboxGroup.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, will display the CheckboxGroup inline.
   * @examples '<CheckboxGroup inline></CheckboxGroup>'
   */
  inline: PropTypes.bool,

  /**
   * When true, will display child Checkbox components inline.
   * @examples '<CheckboxGroup inlineChildren></CheckboxGroup>'
   */
  inlineChildren: PropTypes.bool,

  /**
   * Will define a custom message to display if either min or max properties are not met. {0} can be used in the message to be replaced by the appropriate min or max property.
   * @examples '<CheckboxGroup min="3" limitMessage="Please select at least {0} of the checkboxes below."></CheckboxGroup>'
   */
  limitMessage: PropTypes.string,

  /**
   * Will define the maximum number of checkboxes the user is allowed to select before proceeding.
   * @examples '<CheckboxGroup max="3"></CheckboxGroup>'
   */
  max: PropTypes.number,

  /**
   * Will define the minimum number of checkboxes the user must select in order to proceed.
   * @examples '<CheckboxGroup min="3"></CheckboxGroup>'
   */
  min: PropTypes.number,

  /**
   * Form name for the element. This will set all Checkbox children the same form name.
   * @examples '<CheckboxGroup name="test"></CheckboxGroup>'
   */
  name: PropTypes.string,

  /**
   * An optional callback that will be fired when any checkbox in the
   * CheckboxGroup changes value. The callback has four arguments.
   * function(value, event, isValid, checked).
   */
  onChange: PropTypes.func,

  /**
   * Pass inline styles here.
   */
  style: PropTypes.object,

  /**
   * Text that will be displayed above the checkboxes in the CheckboxGroup.
   * @examples '<CheckboxGroup title="Options"></CheckboxGroup>'
   */
  title: PropTypes.string
};

CheckboxGroup.defaultProps = {
  inline: false
};

CheckboxGroup.displayName = "CheckboxGroup"; // Used for identifying this component from a parent Form

export default CSSModules(CheckboxGroup, styles, { allowMultiple: true });
