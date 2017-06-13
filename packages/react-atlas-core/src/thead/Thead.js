import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Thead = ({ className, children, ...props }) =>
  <thead {...props} className={className}>
    {children}
  </thead>
;

Thead.propTypes = {
  "children": PropTypes.any
};

export default Thead;
