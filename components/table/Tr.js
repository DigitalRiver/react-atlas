import React, {  PropTypes } from 'react';

const propTypes = {
    children: PropTypes.any
};

const Tr = ({children, ...props}) => (
    <tr {...props}>
      {children}
    </tr>
);

Tr.propTypes = propTypes;

export default Tr;
