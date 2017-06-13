import React from "react";
import PropTypes from 'prop-types';
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
  "className": PropTypes.string,
  "children": PropTypes.node
};

export default ListText;
