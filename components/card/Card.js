import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './card.css';

const Card = ({children}) => {
  const cx = classNames.bind(style);
  const className = cx({
    "card": true
  });

  return <div className={className}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.any
};

Card.defaultProps = {
  children: <p>Some card text.</p>
}
export default Card;
