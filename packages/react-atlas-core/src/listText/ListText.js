import React from "react";
import cx from 'classNames';

/**
 * Used inside `<ListItem>` when the Item has more complex needs for text and elements inside
 */
const ListText = ({ children, ...props }) => {
  return (
    <span {...props}>
      {children}
    </span>
  );
};

ListText.propTypes = {
  "className": React.PropTypes.string,
  "children": React.PropTypes.node
};

export default ListText;
