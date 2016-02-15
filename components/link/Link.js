import React, { PropTypes } from 'react';

const Link = ({children, ...props}) => {
  return (
    <a {...props}>
      {children}
    </a>
  );
};

Link.propTypes = {
  className: PropTypes.string
};

export default Link;
