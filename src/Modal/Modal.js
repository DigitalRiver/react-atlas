import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Portal } from "./../Portal";
import { Overlay } from "./../Overlay";
import CSSModules from "react-css-modules";
import styles from "./Modal.css";

export class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "isHaveScrollbar": false
    };
  }

  /**
   * This function cancels the click handler when clicking on the active modal and prevents bubbling up
   * so that it avoids evoking the event handler of the outside <div>
   *   */
  cancelClickHandler = event => {
    event.stopPropagation();
  };

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

    return (
      active && 
        <Portal>
          {overlay && 
            <Overlay
              active={active}
              onClick={onOverlayClick}
              onEscKeyDown={onEscKeyDown}
              lockScroll={lockScroll}
            />
          }
          <div
            styleName={cx("dialogWrapper")}
            onClick={onOverlayClick}
            style={style}
          >
            <div styleName={cx("dialog")}>
              <div
                style={style}
                styleName={cx("modal", { "active": active })}
                className={cx(className)}
                onClick={this.cancelClickHandler}
              >
                {title && <h3 styleName={cx("title")}>{title}</h3>}
                <div>{this.props.children}</div>
              </div>
            </div>
          </div>
        </Portal>
      
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

export default CSSModules(Modal, styles, { "allowMultiple": true });
