import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Dialog extends React.PureComponent {
  _getButtonContent = () => {
    const { info, warning, onOk, onCancel, style } = this.props;
    const okButton = warning
      ? <Button small warning onClick={onOk}>
          OK
        </Button>
      : <Button small primary onClick={onOk}>
          OK
        </Button>;
    return (
      <div>
        {okButton}
        {!info &&
          <Button small onClick={onCancel}>
            Cancel
          </Button>}
      </div>
    );
  };

  render() {
    const {
      active,
      warning,
      className,
      children,
      styles,
      style,
      ...others,
    } = this.props;
    return (
      active &&
      <Modal className={cx(className)} style={style} active={active} className={warning && styles.warning} {...others}>
        <div styleName="dialog">
          {children}
          <div styleName="buttons">
            {this._getButtonContent()}
          </div>
        </div>
      </Modal>
    );
  }
}

Dialog.propTypes = {
  /**
   * Dialog's title
   */
  title: PropTypes.string,
  /** An Object, array, or string of CSS classes to apply to Dialog.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Anything that can be in a Dialog.
   */
  children: PropTypes.node.isRequired,
  /**
   * Determines show Dialog or not
   */
  active: PropTypes.bool,
  /**
   * Info type
   */
  info: PropTypes.bool,
  /**
   * Confirm type with ok/cancel button
   */
  confirm: PropTypes.bool,
  /**
   * Warning type with ok/cancel button
   */
  warning: PropTypes.bool,
  /**
   * Determines show Dialog with overlay or not
   */
  overlay: PropTypes.bool,
  /**
   * Determines to hide page scroll
   */
  lockScroll: PropTypes.bool,
  /**
   * Callback for OK Button
   */
  onOk: PropTypes.func,
  /**
   * Callback for Cancel Button
   */
  onCancel: PropTypes.func,

  /* Pass inline styling here. */
  style: PropTypes.object
};

Dialog.defaultProps = {
  active: false,
  className: "",
  overlay: false,
  info: false
};

export default Dialog;
