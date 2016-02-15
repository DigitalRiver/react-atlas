import React, { PropTypes } from 'react';

const Thead = ({children, ...props}) => (
    <thead {...props}>
      {children}
    </thead>
);

Thead.propTypes = {
    children: PropTypes.any
};

export default Thead;
