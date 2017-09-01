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
    const { active, className } = this.props;
    const classNames = cx(
      "ra_overlay__overlay",
      { "ra_overlay__active": active },
      className
    );
    return <div onClick={this.handleClick} className={classNames} />;
  }
}

Overlay.propTypes = {
  /**
   * Define a custom css class name.
   */
  "className": PropTypes.string,
  /**
   * Determines show overlay or not
   */
  "active": PropTypes.bool,
  /**
   * Click event handler.
   */
  "onClick": PropTypes.func,
  /**
   * Determines to hide page scroll
   */
  "lockScroll": PropTypes.bool,
  /**
   * Event handler for esc key down
   */
  "onEscKeyDown": PropTypes.func
};

Overlay.defaultProps = {
  "active": false,
  "className": "",
  "lockScroll": true
};

export default Overlay;
