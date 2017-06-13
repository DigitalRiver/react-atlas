import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

/**
 * Wrapper around `<ul>` element to apply styling to lists. Usually paired with `<ListItem>` and `<ListText>` components.
 */
const List = ({ children, ...props }) => {
  return (
    <ul {...props} styleName={cx("list")}>
      {children}
    </ul>
  );
};

List.propTypes = {
  "children": PropTypes.node,
  "className": PropTypes.string
};

export default List;
