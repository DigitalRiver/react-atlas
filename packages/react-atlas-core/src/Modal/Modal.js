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
        this.updateOverlayStyle = this.updateOverlayStyle.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize",this.updateOverlayStyle);
    }

    componentDidUpdate() {
        this.updateOverlayStyle();

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateOverlayStyle);
    }

    updateOverlayStyle() {
        if (this.props.active && (this.wrapDiv.scrollHeight > this.wrapDiv.clientHeight)) {
            this.setState({
                'isHaveScrollbar': true
            });
        }
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
    const classes = cx("ra_Modal__modal", { "ra_Modal__active": active });
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
          <div ref={wrapDiv => {this.wrapDiv= wrapDiv}} className={cx("ra_Modal__dialogWrapper")}    style={style}>
            <div className={cx("ra_Modal__dialog")}>
              <div style={style} className={cx(className, classes)}>
                {title &&
                  <h3 className={cx("ra_Modal__title", "ra_styles__bg-primary", "ra_styles__white")}>
                    {title}
                  </h3>
                }
                <div className="ra_Modal__content">{this.props.children}</div>
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
