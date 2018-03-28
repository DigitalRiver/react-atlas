import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Overlay extends React.PureComponent {
  componentDidMount() {
    const { active, lockScroll, onEscKeyDown } = this.props;
    if (onEscKeyDown) {
      document.body.addEventListener("keydown", this.handleEscKey);
    }
    if (active && lockScroll) {
      document.body.style.overflow = "hidden";
    }
  }

  componentWillUnmount() {
    const { active, lockScroll, onEscKeyDown } = this.props;
    if (active && lockScroll) {
      document.body.style.overflow = "";
    }

    if (onEscKeyDown) {
      document.body.removeEventListener("keydown", this.handleEscKey);
    }
  }

  handleEscKey = e => {
    const { active, onEscKeyDown } = this.props;
    if (active && onEscKeyDown && e.which === 27) {
      onEscKeyDown(e);
    }
  };

  handleClick = event => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    const { active, className, style } = this.props;
    const classNames = cx(
      "ra_Overlay__overlay",
      { "ra_Overlay__active": active },
      className
    );
    return (
      <div style={style} onClick={this.handleClick} className={classNames} />
    );
  }
}

Overlay.propTypes = {
  /**
   * When true, Overlay will display
   */
  "active": PropTypes.bool,

  /** An object, array, or string of CSS classes to apply to Overlay.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * Determines to hide page scroll
   */
  "lockScroll": PropTypes.bool,

  /**
   * Event handler for esc key down
   */
  "onEscKeyDown": PropTypes.func,

  /**
   * Click event handler.
   */
  "onClick": PropTypes.func,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

Overlay.defaultProps = {
  "active": false,
  "className": "",
  "lockScroll": false
};

export default Overlay;
