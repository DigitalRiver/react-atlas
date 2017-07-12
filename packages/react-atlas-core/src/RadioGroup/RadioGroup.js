import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class RadioGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      "checkedRadio": null
    };
  }

  groupSetChecked = value => {
    this.setState({ "checkedRadio": value });
  };

  componentWillMount() {
    React.Children.map(this.props.children, (child, index) => {
      if (
        child.props.defaultChecked ||
        !this.state.checkedRadio && index === 0
      ) {
        this.setState({ "checkedRadio": child.props.value });
      }
    });
  }

  render() {
    const { className, children, name, inline, title } = this.props;

    return (
      <div className={cx(className)} styleName={cx("radioGroup")}>
        {title &&
          <div styleName={cx("header")}>
            <span styleName={cx("headerFont")}>{title}</span>
          </div>}
        {React.Children.map(children, (child, index) => {
          child = cloneElement(child, {
            "inline": inline,
            "name": name,
            "groupSetChecked": this.groupSetChecked,
            "checked": this.state.checkedRadio === child.props.value
          });

          return child;
        })}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  /**
   * Anything that can be in a radio group. Almost always radio components alone.
   * @examples '<RadioGroup><Radio/><Radio/></RadioGroup>'
   */
  "children": PropTypes.node,
  /**
   * Define a custom css class name.
   * @examples 'radioGroup', 'radio-group'
   */
  "className": PropTypes.string,
  /**
   * Form name for the element, this will set all Radio children the same form name (so they can't be selected at the same time).
   * @examples '<RadioGroup name="test"></RadioGroup>'
   */
  "name": PropTypes.string,
  /**
   * Defines if the radio group should display as an inline element.
   * @examples '<RadioGroup inline></RadioGroup>'
   */
  "inline": PropTypes.bool
};

export default RadioGroup;
