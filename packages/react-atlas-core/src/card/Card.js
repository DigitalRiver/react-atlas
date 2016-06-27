import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import themeable from 'react-themeable';

/**
 * Simple Card component that wraps a div around content with card styling.
 */
const Card = ({children, ...props}) => {
  const theme = themeable(props.theme);
  console.log(theme);
  console.log(theme(1, 'card'));
  return <div {...theme(1, 'card')}>{children}</div>;
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

Card.styleguide = {
  category: 'Layout',
  index: '4.1'
};

export default Card;
