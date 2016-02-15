import React, { PropTypes } from 'react';

const Tfoot = ({children, ...props}) => (
    <tfoot {...props}>
      {children}
    </tfoot>
);

Tfoot.propTypes = {
    children: PropTypes.any
};

export default Tfoot;
