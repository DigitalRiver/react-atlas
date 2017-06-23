import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classNames";

class CheckboxGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "totalChecked": 0,
      "groupError": false
    };
  }

  componentDidMount() {
    let newChecked = 0
    React.Children.map(this.props.children, child => {
      if(child.props.checked) {
        newChecked++;
      }
    });
    this.setState({ totalChecked: newChecked });
  }

  groupHandleClick = (checked) => {
    const newChecked = (checked) ? this.state.totalChecked - 1 : this.state.totalChecked + 1;
    if (checked) {
      this.setState({ totalChecked: newChecked });
    } else {
      this.setState({ totalChecked: newChecked });
    }
  }

  maxMinMessage = () => {
    if (this.props.max && this.state.totalChecked > this.props.max) {
      this.setState({ groupError: true });
      return "Please select no more than " + this.props.max + " of the options below";
    } else if (this.props.min && this.state.totalChecked < this.props.min){
      this.setState({ groupError: true });
      return "Please select at least " + this.props.min + " of the options below";
    } else {
      this.setState({ groupError: false });
    }
  }

  render() {
    const { className, children, name, inline, title, max, min } = this.props;

    return (
      <div className={className} styleName={cx("checkboxGroup")}>
        <div styleName={cx("header")}>
          <span styleName={cx("headerFont")}>{title}</span>
          {(max || min) &&
            <span styleName={cx("error_message")}>{this.maxMinMessage()}</span>
          }
        </div>
        {React.Children.map(children, child => {
          child = cloneElement(child, {
            "inline": inline,
            "name": name,
            "groupHandleClick": this.groupHandleClick,
            "groupError": this.state.groupError
          });
          return child;
        })}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  /**
   * Anything that can be in a checkbox group. Typically only includes Checkbox components and a header.
   * @examples '<CheckboxGroup><Checkbox/><Checkbox/></CheckboxGroup>'
   */
  "children": PropTypes.node,
  /**
   * Define a custom css class name.
   * @examples 'checkboxGroup', 'checkbox-group'
   */
  "className": PropTypes.string,
  /**
   * Form name for the element, this will set all Checkbox children the same form name.
   * @examples '<CheckboxGroup name="test"></CheckboxGroup>'
   */
  "name": PropTypes.string,
  /**
   * Defines if the checkbox group should display as an inline element.
   * @examples '<CheckboxGroup inline></CheckboxGroup>'
   */
  "inline": PropTypes.bool
};

export default CheckboxGroup;
