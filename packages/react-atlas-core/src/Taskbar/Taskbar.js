import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Taskbar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, style, children, center } = this.props;
    const taskbarContainerClasses = cx({
      taskbarContainer: true,
      center: center
    });

    return (
      <div styleName={"taskbar"} style={style} className={cx(className)}>
        <div styleName={taskbarContainerClasses}>{children}</div>
      </div>
    );
  }
}

Taskbar.propTypes = {
  /** An Object, array, or string of CSS classes to apply to CheckboxGroup.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /* Pass inline styling here. */
  style: PropTypes.object,
  /**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  children: PropTypes.node.required,
  /* Determines if the Taskbar children should be centered */
  center: PropTypes.bool
};

Taskbar.defaultProps = {
  children: <p>Some taskbar item.</p>
};

export default Taskbar;
