import React from "react";
import PropTypes from "prop-types";
import cx from 'classnames';

/**
 * Simple Card component that wraps a div around content with card styling.
 */
class Card extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { children, className } = this.props;
    return (
      <div styleName={cx("card")} className={cx(className)}>{children}</div>
    );
  }
}

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

export default Card;
