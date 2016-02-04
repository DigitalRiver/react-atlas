import React from "react";
import ClassNames from "classnames";

import style from "./button.css";

class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    type: React.PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: "",
    primary: false,
  };

  handleMouseDown = (event) => {
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  handleMouseUp = () => {
    this.refs.button.blur();
  };

  render () {
    const {accent, children, className, href, icon, inverse, primary, ...others} = this.props;
    const element = href ? "a" : "button";
    const level = primary ? "primary" : accent ? "accent" : "neutral";
    const classes = ClassNames([style.toggle, style[level]], {[style.inverse]: inverse}, className);

    const props = {
      ...others,
      href,
      ref: "button",
      className: classes,
      disabled: this.props.disabled,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp
    };

    return React.createElement(element, props,
      children
    );
  }
}

export default Button;
