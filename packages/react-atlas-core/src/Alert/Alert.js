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
    const alertClasses = cx({
      "alert": true,
      "info": this.props.type === "info",
      "success": this.props.type === "success",
      "warning": this.props.type === "warning",
      "danger": this.props.type === "danger"
    });
    return (
      <div>
        {this.state.visible && 
          <div styleName={alertClasses}>
            {this.props.children}
            {this.props.dismissible && 
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
  "type": PropTypes.string
};

Alert.defaultProps = {
  "type": "info"
};

export default Alert;
