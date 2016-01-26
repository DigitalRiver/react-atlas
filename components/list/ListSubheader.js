import React from 'react';

const ListSubHeader = ({children, ...props}) => {
  return (
    <h5 {...props}>
      {children}
    </h5>
  )
};

export default ListSubHeader;
