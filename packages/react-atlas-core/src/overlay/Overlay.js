import React, { Component } from "react";
import ReactDOM from "react-dom";
import cx from 'classNames';

/**
 * Overlay component adds a 'shadowbox' to screen. Mostly used internally in the lib on the `<Dialog>` component.
 */
class Overlay extends Component {
  render() {
    const {
      className,
      active,
      invisible,
      children,
      onClick,
      ...other
    } = this.props;

    const classes = cx({
      "inactive": !active,
      active,
      invisible,
      [`${className}`]: className
    });

    const overlayClasses = cx({
      "overlayActive": active,
      "overlayInactive": !active
    });

    return(
      <div styleName={classes}>
        <div styleName={overlayClasses} onClick={onClick}>
          {children}
        </div>
      </div>
    );
  }
}

Overlay.propTypes = {
  "active": React.PropTypes.bool,
  "children": React.PropTypes.node,
  "className": React.PropTypes.string,
  "invisible": React.PropTypes.bool,
  "onClick": React.PropTypes.func
};

Overlay.defaultProps = {
  "invisible": false
};

export default Overlay;
