import React from 'react';

const Colgroup = ({children, ...props}) => (
    <colgroup {...props}>
      {children}
    </colgroup>
);

Colgroup.propTypes = {
    children: React.PropTypes.any
};

export default Colgroup;
