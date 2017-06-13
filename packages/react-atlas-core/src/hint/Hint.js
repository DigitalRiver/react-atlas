import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

/**
 * Simple wrapper around a span to add 'hint'-like styles
 */
const Hint = ({ children, className, ...props }) => {
  return <span {...props} className={cx(className)} styleName={cx("base")}>{children}</span>;
};

Hint.propTypes = {
  "children": PropTypes.node
};

export default Hint;
