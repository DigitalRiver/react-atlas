import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Tfoot = ({ className, children, ...props }) =>
  <tfoot {...props} className={className}>
    {children}
  </tfoot>
;

Tfoot.propTypes = {
  "children": PropTypes.any
};

export default Tfoot;
