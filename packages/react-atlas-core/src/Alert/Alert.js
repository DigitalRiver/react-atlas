import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Alert extends React.PureComponent {
  constructor(props) {
    super(props);

    // component state
    this.state = {
      "visible": true
    };
  }

  _closeAlert = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss(event);
    }
    this.setState({
      "visible": false
    });
  };

  render() {
    let { hidden, children, dismissible, type, className, style } = this.props;
    const alertClasses = cx({
      "alert": true,
      "info": type === "info",
      "success": type === "success",
      "warning": type === "warning",
      "danger": type === "danger"
    });
    return (
      <div
        hidden={hidden}
        className={cx(className)}
        style={style}>
        {this.state.visible &&
          <div styleName={alertClasses}>
            {children}
            {dismissible &&
              <div
                onClick={() => {
                  this._closeAlert();
                }}
                type="button"
                styleName="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

Alert.propTypes = {
  /**
   * Any HTML element or React Component.
   */
  "children": PropTypes.node.isRequired,
  /**
   * When true, the Alert can be dismissed.
   */
  "dismissible": PropTypes.bool,
  /**
   * Function that will be executed on dismiss.
   */
  "onDismiss": PropTypes.func,
  /**
   * Will set the Alert's style.
   */
  "type": PropTypes.string,

  /**
   * A boolean to hide or show the alert component.
   */
  "hidden": PropTypes.bool
};

Alert.defaultProps = {
  "type": "info"
};

export default Alert;
