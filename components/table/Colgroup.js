import React from 'react';

const propTypes = {
    children: React.PropTypes.any
};

const Colgroup = ({children, ...props}) => (
    <colgroup {...props}>
      {children}
    </colgroup>
);

Colgroup.propTypes = propTypes;

export default Colgroup;
