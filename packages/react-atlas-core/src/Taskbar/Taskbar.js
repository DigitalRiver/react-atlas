import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Taskbar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, center } = this.props;
    const taskbarContainerClasses = cx({
      taskbarContainer: true,
      center: center
    });

    return (
      <div styleName={"taskbar"}>
        <div styleName={taskbarContainerClasses}>{children}</div>
      </div>
    );
  }
}

Taskbar.propTypes = {
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
