import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Taskbar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { center, children, className, onClick, style } = this.props;
    const taskbarContainerClasses = cx({
      "taskbarContainer": true,
      "center": center
    });

    return (
      <div styleName={"taskbar"} style={style} className={cx(className)}>
        <div styleName={taskbarContainerClasses}>
          {React.Children.map(children, (child, index) => {
            child = cloneElement(child, {
              "index": index,
              "onClick": child.props.onClick || onClick // Child Task onClick overwrites Taskbar onClick
            });
            return child;
          })}
        </div>
      </div>
    );
  }
}

Taskbar.propTypes = {
  /** Determines if the Taskbar children should be centered */
  "center": PropTypes.bool,
  /**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  "children": PropTypes.node.isRequired,
  /** An Object, array, or string of CSS classes to apply to CheckboxGroup.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Function that will be executed on click.
   */
  "onClick": PropTypes.func,
  /** Pass inline styling here. */
  "style": PropTypes.object
};

Taskbar.defaultProps = {
  "children": <p>Some taskbar item.</p>
};

export default Taskbar;
