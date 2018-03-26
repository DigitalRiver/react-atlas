import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { PortalCore } from "./../Portal";
import { OverlayCore } from "./../Overlay";

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "isHaveScrollbar": false
    };
  }

  render() {
    const {
      active,
      className,
      onOverlayClick,
      onEscKeyDown,
      title,
      overlay,
      lockScroll,
      style
    } = this.props;
    const classes = cx(
      "ra_Modal__modal",
      { "ra_Modal__active": active },
      "ra_styles__default-font"
    );
    const overlayClasses = cx({
      "overlayClass": true,
      "overlayLeftStyle": this.state.isHaveScrollbar
    });
    return (
      active && 
        <PortalCore>
          {overlay && 
            <OverlayCore
              active={active}
              onClick={onOverlayClick}
              onEscKeyDown={onEscKeyDown}
              lockScroll={lockScroll}
              styleName={overlayClasses}
            />
          }
          <div styleName={cx("dialogWrapper")} style={style}>
            <div styleName={cx("dialog")}>
              <div style={style} className={cx(className, classes)}>
                {title && <h3 styleName={cx("title")}>{title}</h3>}
                <div>{this.props.children}</div>
              </div>
            </div>
          </div>
        </PortalCore>
      
    );
  }
}

Modal.propTypes = {
  /**
   * When true, will display Modal.
   */
  "active": PropTypes.bool,

  /**
   * Text, any HTML element, or React Component.
   */
  "children": PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to Modal.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, will hide page scroll.
   */
  "lockScroll": PropTypes.bool,

  /**
   * Event handler for esc key down, can be used to close modal if needed.
   */
  "onEscKeyDown": PropTypes.func,

  /**
   * Event handler for clicking on overlay, can be used to close modal if needed.
   */
  "onOverlayClick": PropTypes.func,

  /**
   * When true, will display Modal with overlay.
   */
  "overlay": PropTypes.bool,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,

  /**
   * Text that will be displayed as title content in the Modal.
   */
  "title": PropTypes.string
};

Modal.defaultProps = {
  "active": false,
  "className": "",
  "overlay": false,
  "lockScroll": true
};

export default Modal;
