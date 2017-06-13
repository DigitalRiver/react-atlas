import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Td = ({ className, children, ...props }) => {
  const classes = cx(
    {
      "td": true
    }
  );

  return (
    <td {...props} styleName={classes} className={cx(className)}>
      {children}
    </td>
  );
};

Td.propTypes = {
  "children": PropTypes.any,
  "className": PropTypes.string
};

export default Td;
