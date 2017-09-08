import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Dialog extends React.PureComponent {
  _getButtonContent = () => {
    const { confirm, warning, onOk, onCancel, styles } = this.props;
    if(confirm) {
      return (
        <div>
          <Button small primary onClick={onOk}>
            OK
          </Button>
          <Button small onClick={onCancel}>
            Cancel
          </Button>
        </div>
      );
    } else if (warning) {
      this.titleStyle = styles.warning;
      return (
        <div>
          <Button small warning onClick={onOk}>
            OK
          </Button>
          <Button small onClick={onCancel}>
            Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <Button small primary onClick={onOk}>
          OK
        </Button>
      );
    }
  };
  render() {
    const { active, className, children, ...others } = this.props;

    const classes = cx("dialog");
    return (
      active &&
      <Modal active={active} className={this.titleStyle} {...others}>
        <div styleName={classes} className={className}>
          {children}
          <div styleName={"buttons"}>
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
  /**
   * Define a custom css class name.
   */
  className: PropTypes.string,
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
  onCancel: PropTypes.func
};

Dialog.defaultProps = {
  active: false,
  className: "",
  overlay: false,
  info: true
};

export default Dialog;
