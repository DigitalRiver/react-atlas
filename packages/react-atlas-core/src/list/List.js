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

List.styleguide = {
  "category": "Lists",
  "index": "7.1",
  "example": 
    `
<section>
  <h5>Simple List</h5>
  <div style={{
    display: "inline-block",
    minWidth: 340
  }}>
    <List>
      <li>Inbox</li>
      <li>Outbox</li>
      <li>Trash</li>
      <li>Spam</li>
    </List>
  </div>
  
  <h5>Complex List using ListItem and ListText</h5>
  <div style={{
      display: "inline-block",
      minWidth: 340
  }}>
    <h5>Contacts</h5>
    <List>
      <ListItem>
        <Avatar image="jjj.jpg" />
        <ListText>
          Some Guy
          <Hint> Works at Some Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="gates.jpg" />
        <ListText>
          Other Person
          <Hint> Works at Other Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="chillgirl.jpeg" />
        <ListText>
          Chill Girl
          <Hint> Works at Chill Place</Hint>
        </ListText>
      </ListItem>

    </List>
  </div>
</section>
`
  
};

export default List;
