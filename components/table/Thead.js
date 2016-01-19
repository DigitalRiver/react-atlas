import React, { PropTypes } from 'react';

const propTypes = {
    children: PropTypes.any
};

const Thead = ({children, ...props}) => (
    <thead {...props}>
      {children}
    </thead>
);

Thead.propTypes = propTypes;

export default Thead;
