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

ListItem.styleguide = {
  "category": "Lists",
  "index": "7.2",
  "example": 
    `
<section>
  <h5>Simple List with ListIem</h5>
  <div style={{
    display: "inline-block",
    minWidth: 340
  }}>
    <ListItem caption="Inbox">Inbox</ListItem>
    <ListItem caption="Outbox">Outbox</ListItem>
    <ListItem caption="Trash">Trash</ListItem>
    <ListItem caption="Spam">Spam</ListItem>
  </div>
</section>
`
  
};

export default ListItem;
