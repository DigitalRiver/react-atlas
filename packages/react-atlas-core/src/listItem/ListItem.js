import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

/**
 * Wrapper around `<li>` element that applies styles.
 */
const ListItem = ({ children, ...props }) => {
  return (
    <li {...props} styleName={cx("item")}>
      {children}
    </li>
  );
};

ListItem.propTypes = {
  "className": PropTypes.string,
  "children": PropTypes.node
};

export default ListItem;
