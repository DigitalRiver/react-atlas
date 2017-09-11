import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { PortalCore } from "./../Portal";
import { OverlayCore } from "./../Overlay";

class Modal extends React.PureComponent {
  render() {
    const {
      active,
      className,
      onOverlayClick,
      onEscKeyDown,
      title,
      overlay,
      lockScroll
    } = this.props;
    const classes = cx("modal", { active });
    return (
      active &&
      <PortalCore>
        {overlay &&
          <OverlayCore
            active={active}
            onClick={onOverlayClick}
            onEscKeyDown={onEscKeyDown}
            lockScroll={lockScroll}
          />}
        <div styleName={classes} className={className}>
          {title &&
            <h3 styleName={cx("title")}>
              {title}
            </h3>}
          <div styleName="content">
            {this.props.children}
          </div>
        </div>
      </PortalCore>
    );
  }
}

Modal.propTypes = {
  /**
   * Modal's title
   */
  "title": PropTypes.string,
  /**
   * Define a custom css class name.
   */
  "className": PropTypes.string,
  /**
   * Anything that can be in a modal.
   */
  "children": PropTypes.node.isRequired,
  /**
   * Determines show Modal or not
   */
  "active": PropTypes.bool,
  /**
   * Event handler for esc key down, normally use to close modal if needed.
   */
  "onEscKeyDown": PropTypes.func,
  /**
   * Determines show Modal with overlay or not
   */
  "overlay": PropTypes.bool,
  /**
   * Event handler for clicking on overlay, normally use to close modal if needed.
   */
  "onOverlayClick": PropTypes.func,
  /**
   * Determines to hide page scroll
   */
  "lockScroll": PropTypes.bool
};

Modal.defaultProps = {
  "active": false,
  "className": "",
  "overlay": false
};

export default Modal;
