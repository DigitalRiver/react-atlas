import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import cx from "classnames";

class Portal extends Component {
  componentDidMount() {
    this._renderOverlay();
  }

  componentDidUpdate() {
    this._renderOverlay();
  }

  componentWillUnmount() {
    this._unrenderOverlay();
    this._unmountOverlayTarget();
  }

  _getOverlay() {
    if (!this.props.children) {
      return null;
    }
    return (
      <div className={cx("ra_Portal__portal", this.props.className)}>
        {this.props.children}
      </div>
    );
  }

  _renderOverlay() {
    const overlay = this._getOverlay();
    if (overlay !== null) {
      this._mountOverlayTarget();
      this._overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        overlay,
        this._overlayTarget
      );
    } else {
      this._unrenderOverlay();
      this._unmountOverlayTarget();
    }
  }

  _unrenderOverlay() {
    if (this._overlayTarget) {
      ReactDOM.unmountComponentAtNode(this._overlayTarget);
      this._overlayInstance = null;
    }
  }

  _mountOverlayTarget() {
    if (!this._overlayTarget) {
      this._overlayTarget = document.createElement("div");
      this._portalContainerNode = document.body;
      this._portalContainerNode.appendChild(this._overlayTarget);
    }
  }

  _unmountOverlayTarget() {
    if (this._overlayTarget) {
      this._portalContainerNode.removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
    this._portalContainerNode = null;
  }

  render() {
    return null;
  }
}

Portal.propTypes = {
  /**
   * Text, any HTML element, or React Component.
   */
  "children": PropTypes.node,

  /** An object, array, or string of CSS classes to apply to Portal.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

Portal.defaultProps = {
  "className": ""
};

export default Portal;
