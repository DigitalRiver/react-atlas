import React, { PropTypes } from 'react';

const propTypes = {
  className: PropTypes.string
};

const Link = ({children, ...props}) => {
  return (
    <a {...props} data-react-toolbox="link">
      {children}
    </a>
  );
};

Link.propTypes = propTypes;

export default Link;
