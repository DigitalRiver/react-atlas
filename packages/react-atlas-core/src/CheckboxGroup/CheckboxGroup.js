import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class CheckboxGroup extends React.PureComponent {
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
  handleChange = (value, event, isValid, checked) => {
    event.persist();
    const newChecked = checked
      ? this.state.totalChecked + 1
      : this.state.totalChecked - 1;
    if (checked) {
      this.setState({ totalChecked: newChecked });
    } else {
      this.setState({ totalChecked: newChecked });
    }
    if (
      (this.props.max && newChecked > this.props.max) ||
      (this.props.min && newChecked < this.props.min)
    ) {
      this.setState({ groupError: true });
    } else {
      this.setState({ groupError: false });
    }

    if (typeof this.props.onChange !== "undefined") {
      this.props.onChange(value, event, isValid, checked);
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
        return `Please select no more than ${this.props
          .max} of the options below`;
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
    return (
      <div
        style={style}
        className={cx(className)}
        styleName={checkboxGroupStyles}
      >
        {title && (
          <div styleName={cx("header")}>
            <span styleName={cx("headerFont")}>{title}</span>
            {this.state.groupError && (
              <span styleName={cx("error_message")}>
                {this.maxMinMessage()}
              </span>
            )}
          </div>
        )}
        {React.Children.map(children, child => {
          child = cloneElement(child, {
            inline: inlineChildren,
            name: name,
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
   * An optional callback that is fired when any checkbox in the
   * CheckboxGroup changes value. The callback has four arguments.
   * function(value, event, isValid, checked).
   */
  onChange: PropTypes.func,
  /**
   * Anything that can be in a checkbox group. Typically only includes Checkbox components and a header.
   * @examples '<CheckboxGroup><Checkbox/><Checkbox/></CheckboxGroup>'
   */
  children: PropTypes.node.isRequired,
  /** An Object, array, or string of CSS classes to apply to CheckboxGroup.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Form name for the element, this will set all Checkbox children the same form name.
   * @examples '<CheckboxGroup name="test"></CheckboxGroup>'
   */
  name: PropTypes.string,
  /**
   * Displayed header text for the CheckboxGroup.
   * @examples '<CheckboxGroup title="Options"></CheckboxGroup>'
   */
  title: PropTypes.string,
  /**
   * Defines if the checkbox group should display as an inline element.
   * @examples '<CheckboxGroup inline></CheckboxGroup>'
   */
  inline: PropTypes.bool,
  /**
   * Defines if the checkbox group should display child Checkbox components inline.
   * @examples '<CheckboxGroup inlineChildren></CheckboxGroup>'
   */
  inlineChildren: PropTypes.bool,
  /**
   * Defines a minimum number of checkboxes the user must select in order to proceed.
   * @examples '<CheckboxGroup min="3"></CheckboxGroup>'
   */
  min: PropTypes.number,
  /**
   * Defines a maximum number of checkboxes the user is allowed to select before proceeding.
   * @examples '<CheckboxGroup max="3"></CheckboxGroup>'
   */
  max: PropTypes.number,
  /**
   * Defines a custom message to show if either min or max properties are not met. {0} can be used in the message to be replaced by the appropriate min or max property.
   * @examples '<CheckboxGroup min="3" limitMessage="Please select at least {0} of the checkboxes below."></CheckboxGroup>'
   */
  limitMessage: PropTypes.string,

  /* Pass inline styles here. */
  style: PropTypes.node
};

CheckboxGroup.defaultProps = {
  inline: false
};

export default CheckboxGroup;
