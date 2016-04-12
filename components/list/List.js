import React from 'react';
import style from './list.css';

/**
 * Wrapper around `<ul>` element to apply styling to lists. Usually paired with `<ListItem>` and `<ListText>` components.
 */
const List = ({className, children, ...props}) => {
    let classNames = style.list;
    if (className) classNames += ` ${className}`;
    return (
      <ul {...props} className={classNames}>
        {children}
      </ul>
    );
};

List.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
};

List.defaultProps = {
  className: ''
};

List.styleguide = {
  category: 'Lists',
  index: '7.1',
  example:`
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
        <Avatar image="https://upload.wikimedia.org/wikipedia/en/6/6f/J.K._Simmons_as_Jameson.gif" />
        <ListText>
          Some Guy
          <Hint> Works at Some Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg" />
        <ListText>
          Other Person
          <Hint> Works at Other Place</Hint>
        </ListText>
      </ListItem>

      <ListItem>
        <Avatar image="https://pbs.twimg.com/profile_images/466831222073991168/XTkBynW_.jpeg" />
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
