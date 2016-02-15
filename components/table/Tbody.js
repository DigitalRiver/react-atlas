import React, { PropTypes } from 'react';

const Tbody = ({children, ...props}) => (
    <tbody {...props}>
      {children}
    </tbody>
);

Tbody.propTypes = {
    children: PropTypes.any
};

export default Tbody;
