import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Alert.css";
import CSSModules from "react-css-modules";

export class Alert extends React.PureComponent {
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
      "success": type === "success",
      "warning": type === "warning",
      "danger": type === "danger",
      hidden
    });
    return (
      <React.Fragment>
        {this.state.visible && 
          <div className={cx(className)} style={style} styleName={alertClasses}>
            {children}
            {dismissible && 
              <div
                onClick={this._closeAlert}
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
      </React.Fragment>
    );
  }
}

Alert.propTypes = {
  /**
   * Any HTML element or React Component.
   */
  "children": PropTypes.node.isRequired,

  /**
   * An object, array, or string of CSS classes to apply to Button.
   */
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, the Alert can be dismissed.
   */
  "dismissible": PropTypes.bool,

  /**
   * A boolean to hide or show the alert component.
   */
  "hidden": PropTypes.bool,

  /**
   * Function that will be executed on dismiss.
   */
  "onDismiss": PropTypes.func,

  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,

  /**
   * Will set the Alert's style.  One of: 'info', 'success', 'warning', 'danger'
   */
  "type": PropTypes.string
};

Alert.defaultProps = {
  "type": "info"
};

export default CSSModules(Alert, styles, { "allowMultiple": true });
