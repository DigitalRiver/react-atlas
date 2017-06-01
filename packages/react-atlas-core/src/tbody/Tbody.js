import React, { PropTypes } from "react";
import cx from 'classNames';

const Tbody = ({ className, children, ...props }) =>
  <tbody {...props} className={cx(className)}>
    {children}
  </tbody>
;

Tbody.propTypes = {
  "children": PropTypes.any
};

export default Tbody;
