import React from "react";
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
  "children": React.PropTypes.node,
  "className": React.PropTypes.string
};

export default List;
