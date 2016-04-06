import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './card.css';

/**
 * Simple Card component that wraps a div around content with card styling.
 */
const Card = ({children}) => {
  const cx = classNames.bind(style);
  const className = cx({
    "card": true
  });

  return <div className={className}>{children}</div>;
};

Card.propTypes = {
	/**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  children: PropTypes.node.isRequired
};

Card.defaultProps = {
  children: <p>Some card text.</p>
};

export default Card;
