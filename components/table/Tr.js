import React, {  PropTypes } from 'react';

const Tr = ({children, ...props}) => (
    <tr {...props}>
      {children}
    </tr>
);

Tr.propTypes = {
    children: PropTypes.any
};

export default Tr;
