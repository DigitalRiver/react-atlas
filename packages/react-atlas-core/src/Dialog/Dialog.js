import React from "react";
import PropTypes from "prop-types";
import { ButtonCore } from "../Button";
import { ModalCore } from "../Modal";
import cx from "classnames";

class Dialog extends React.PureComponent {
  _getButtonContent = () => {
    const { info, warning, onOk, onCancel } = this.props;
    let warningClasses = {
      "ra_Button__small": true,
      "ra_Button__button": true,
      "ra_Button__base": true,
      "ra_styles__button-marg-1": true,
      "ra_styles__button-pad-1": true,
      "ra_styles__default-text": true,
      "ra_styles__cursor-pointer": true,
      "ra_styles__primary-button-border-width": true,
      "ra_styles__default-font": true,
      "ra_styles__rounded": true,
      "ra_Button__warning": true
    };
    let primaryClasses = {
      "ra_Button__small": true,
      "ra_Button__button": true,
      "ra_Button__base": true,
      "ra_styles__button-marg-1": true,
      "ra_styles__button-pad-1": true,
      "ra_styles__default-text": true,
      "ra_styles__cursor-pointer": true,
      "ra_styles__primary-button-border-width": true,
      "ra_styles__default-font": true,
      "ra_styles__rounded": true,
      "ra_Button__primary": true,
      "ra_styles__bg-primary": true,
      "ra_styles__hover-bg-primary": true,
      "ra_styles__border-primary": true,
      "ra_styles__hover-border-primary": true,
      "ra_styles__white": true
    };
    const okButton = warning ? 
      <ButtonCore className={cx(warningClasses)} onClick={onOk}>
        OK
      </ButtonCore>
     : 
      <ButtonCore className={cx(primaryClasses)} onClick={onOk}>
        OK
      </ButtonCore>
    ;
    let okClasses = {
      "ra_Button__small": true,
      "ra_Button__button": true,
      "ra_Button__base": true,
      "ra_styles__button-marg-1": true,
      "ra_styles__button-pad-1": true,
      "ra_styles__default-text": true,
      "ra_styles__cursor-pointer": true,
      "ra_styles__primary-button-border-width": true,
      "ra_styles__default-font": true,
      "ra_styles__rounded": true
    };
    return (
      <div>
        {okButton}
        {!info && 
          <ButtonCore className={okClasses} onClick={onCancel}>
            Cancel
          </ButtonCore>
        }
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
      /*eslint-disable */
      styles,
      /*eslint-enable */
      ...others
    } = this.props;
    return (
      active && 
        <ModalCore
          className={cx(className, { "ra_Dialog__warning": warning })}
          style={style}
          active={active}
          {...others}
        >
          <div className={cx("ra_Dialog__dialog", "ra_styles__default-font")}>
            {children}
            <div className="ra_Dialog__buttons">{this._getButtonContent()}</div>
          </div>
        </ModalCore>
      
    );
  }
}

Dialog.propTypes = {
  /**
   * Dialog's title
   */
  "title": PropTypes.string,
  /** An Object, array, or string of CSS classes to apply to Dialog.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Anything that can be in a Dialog.
   */
  "children": PropTypes.node.isRequired,
  /**
   * Determines show Dialog or not
   */
  "active": PropTypes.bool,
  /**
   * Info type
   */
  "info": PropTypes.bool,
  /**
   * Confirm type with ok/cancel button
   */
  "confirm": PropTypes.bool,
  /**
   * Warning type with ok/cancel button
   */
  "warning": PropTypes.bool,
  /**
   * Determines show Dialog with overlay or not
   */
  "overlay": PropTypes.bool,
  /**
   * Determines to hide page scroll
   */
  "lockScroll": PropTypes.bool,
  /**
   * Callback for OK Button
   */
  "onOk": PropTypes.func,
  /**
   * Callback for Cancel Button
   */
  "onCancel": PropTypes.func,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,

  /**
   * Pass inline styling here.
   */
  "styles": PropTypes.object
};

Dialog.defaultProps = {
  "active": false,
  "className": "",
  "overlay": false,
  "info": false
};

export default Dialog;
