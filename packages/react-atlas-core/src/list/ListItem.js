import React from "react";
import themeable from 'react-themeable';

/**
 * Wrapper around `<li>` element that applies styles.
 */
const ListItem= ({children, className, ...props}) => {
    const theme = themeable(props.theme);

    return (
      <li {...props} {...theme(1, 'item')}>
        {children}
      </li>
    );
};

ListItem.propTypes = {
    className: React.PropTypes.string
};

ListItem.defaultProps = {
    className: '',
    theme: {
      'item': true
    }
};

ListItem.styleguide = {
  category: 'Lists',
  index: '7.2',
  example:`
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
