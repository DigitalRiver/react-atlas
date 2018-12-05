import React from "react";
import PropTypes from "prop-types";
import { Button } from "../Button";
import { Modal } from "../Modal";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./Dialog.css";
import blacklist from "blacklist";

export class Dialog extends React.PureComponent {
  _getButtonContent = () => {
    const { info, warning, onOk, onCancel } = this.props;

    const okButton = warning ? (
      <Button warning small onClick={onOk}>
        OK
      </Button>
    ) : (
      <Button primary small onClick={onOk}>
        OK
      </Button>
    );

    return (
      <div>
        {okButton}
        {!info && (
          <Button primary small onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    );
  };

  render() {
    const {
      active,
      warning,
      className,
      children,
      style,
      onOverlayClick,
      ...others
    } = this.props;

    // Declaring the following variables so they don't get passed to Modal through the prop spread.
    const othersFiltered = blacklist(others, "styles");

    return (
      active && (
        <Modal
          className={cx(className, { ra_Dialog__warning: warning })}
          style={style}
          active={active}
          onOverlayClick={onOverlayClick}
          {...othersFiltered}
        >
          <div className={cx("ra_Dialog__dialog", "ra_styles__default-font")}>
            {children}
            <div className="ra_Dialog__buttons">{this._getButtonContent()}</div>
          </div>
        </Modal>
      )
    );
  }
}

Dialog.propTypes = {
  /**
   * When true, Dialog will display.
   */
  active: PropTypes.bool,

  /**
   * Child elements that will be displayed as Dialog content.
   */
  children: PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to Dialog.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, Dialog will be a confirm type and display both an Ok button and a Cancel button.
   */
  confirm: PropTypes.bool,

  /**
   * When true, Dialog will be an info type and display an Ok button.
   */
  info: PropTypes.bool,

  /**
   * When true, scrolling will be disabled.
   */
  lockScroll: PropTypes.bool,

  /**
   * Function that will be executed when user clicks the Cancel button.
   */
  onCancel: PropTypes.func,

  /**
   * Function that will be executed when user clicks the Ok button.
   */
  onOk: PropTypes.func,

  /**
   * Event handler for clicking on overlay, can be used to close modal if needed.
   */
  onOverlayClick: PropTypes.func,

  /**
   * When true, Dialog will display as a modal overlay.
   */
  overlay: PropTypes.bool,

  /**
   * Pass inline styling here.
   */
  style: PropTypes.object,

  /**
   * Pass inline styling here.
   */
  styles: PropTypes.object,

  /**
   * Text that will be displayed as title content in the Dialog.
   */
  title: PropTypes.string,

  /**
   * When true, Dialog will be a warning type and display both an Ok button and a Cancel button.
   */
  warning: PropTypes.bool
};

Dialog.defaultProps = {
  active: false,
  className: "",
  overlay: false,
  info: false
};

export default CSSModules(Dialog, styles, { allowMultiple: true });
