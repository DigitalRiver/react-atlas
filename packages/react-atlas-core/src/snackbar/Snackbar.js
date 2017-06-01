import React, { Component, PropTypes } from "react";
import cx from 'classNames';

class Snackbar extends Component {
  componentDidUpdate() {
    if (this.props.active && this.props.timeout) {
      setTimeout(
        () => {
          this.props.onTimeout();
        },
        this.props.timeout
      );
    }
  }

  render() {
    const { active, className, ...props } = this.props;
    const classes = cx(
      {
        "root": true,
        active
      },
      className
    );

    return (
      <div styleName={classes}>
        {React.Children.map(this.props.children, child => {
          if (typeof child === "string") {
            return <span styleName={cx("text")}>{child}</span>;
          } else {
            return child;
          }
        })}
      </div>
    );
  }
}

Snackbar.propTypes = {
  "active": PropTypes.bool,
  "className": PropTypes.string,
  "timeout": PropTypes.number,
  "onTimeout": PropTypes.func,
  "children": PropTypes.node
};

export default Snackbar;
