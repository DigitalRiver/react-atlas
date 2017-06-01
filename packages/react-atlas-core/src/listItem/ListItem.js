import React from "react";
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
  "className": React.PropTypes.string,
  "children": React.PropTypes.node
};

export default ListItem;
