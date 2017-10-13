import React from "react";
import PropTypes from "prop-types";

class Taskbar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div styleName={"taskbar"}>
        <div styleName={"taskbarContainer"}>{children}</div>
      </div>
    );
  }
}

Taskbar.propTypes = {
  /**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  children: PropTypes.node.required
};

Taskbar.defaultProps = {
  children: <p>Some taskbar item.</p>
};

export default Taskbar;
