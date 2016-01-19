import React, { PropTypes } from 'react';

const propTypes = {
    children: PropTypes.any
};

const Tbody = ({children, ...props}) => (
    <tbody {...props}>
      {children}
    </tbody>
);

Tbody.propTypes = propTypes;

export default Tbody;
