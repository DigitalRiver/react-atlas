import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Th = ({ className, children, ...props }) => {
  const classes = cx(
    {
      "th": true
    }
  );

  return (
    <th {...props} styleName={classes} className={cx(className)}>
      {children}
    </th>
  );
};

Th.propTypes = {
  "children": PropTypes.any,
  "className": PropTypes.string
};

export default Th;
