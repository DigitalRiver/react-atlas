import React, { PropTypes } from "react";
import cx from 'classNames';

/**
 * Simple Card component that wraps a div around content with card styling.
 */
const Card = ({ children, className, ...props }) => {
  return <div {...props} styleName={cx('card')} className={cx(className)}>{children}</div>;
};

Card.propTypes = {
  /**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  "children": PropTypes.node.isRequired,

  /**
   * Custom classnames prop
   */
   "className": PropTypes.string
};

Card.defaultProps = { "children": <p>Some card text.</p> };

Card.styleguide = { "category": "Layout", "index": "4.1" };

export default Card;
