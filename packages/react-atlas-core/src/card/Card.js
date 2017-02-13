import React, { PropTypes } from 'react';
import { classNames } from '../utils';
import themeable from 'react-themeable';

/**
 * Simple Card component that wraps a div around content with card styling.
 */
const Card = ({children, ...props}) => {
  const theme = themeable(props.theme);

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
  children: <p>Some card text.</p>,
  theme: {
    card: true
  }
};

Card.styleguide = {
  category: 'Layout',
  index: '4.1'
};

export default Card;
