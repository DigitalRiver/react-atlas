import React, { PropTypes } from "react";
import cx from 'classNames';

const Tr = ({ className, children, ...props }) =>
  <tr {...props} className={className}>
    {children}
  </tr>
;

Tr.propTypes = {
  "children": PropTypes.any
};

export default Tr;
