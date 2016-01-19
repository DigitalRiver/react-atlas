import React, { PropTypes } from 'react';

const propTypes = {
    children: PropTypes.any
};

const Tfoot = ({children, ...props}) => (
    <tfoot {...props}>
      {children}
    </tfoot>
);

Tfoot.propTypes = propTypes;

export default Tfoot;
