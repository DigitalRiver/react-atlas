import React, { PropTypes } from "react";
import cx from 'classNames';

const Table = ({ className, children, ...props }) => {
  const classes = cx(
    {
      "table": true
    }
  );

  return (
    <table {...props} styleName={classes} className={cx(className)}>
      {children}
    </table>
  );
};

Table.propTypes = {
  "children": PropTypes.any,
  "className": PropTypes.string
};

export default Table;
