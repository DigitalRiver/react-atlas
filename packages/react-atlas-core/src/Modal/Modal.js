import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { PortalCore } from "./../Portal";
import { OverlayCore } from "./../Overlay";

class Modal extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
        'isHaveScrollbar': false
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
    const classes = cx("ra_Modal__modal", { "ra_Modal__active": active }, "ra_styles__default-font");
    const overlayClasses = cx({
        "overlayClass" : true,
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
                {title &&
                  <h3 styleName={cx("title")}>
                    {title}
                  </h3>
                }
                <div styleName={cx("content")}>{this.props.children}</div>
              </div>
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
  /** An Object, array, or string of CSS classes to apply to Modal.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
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
  "lockScroll": PropTypes.bool,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

Modal.defaultProps = {
  "active": false,
  "className": "",
  "overlay": false,
  "lockScroll": true
};

export default Modal;
