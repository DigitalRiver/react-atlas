import React from "react";
import { classNames } from '../utils';
import themeable from 'react-themeable';

const propTypes = {
  className: React.PropTypes.string
};

const defaultProps = {
  className: ''
};

/**
 * Wrapper around `<li>` element that applies styles.
 */
const ListItem= ({children, className, ...props}) => {
    const theme = themeable(props.theme);
    const classes = classNames({
        item: true,
        [`${className}`]: !!className
    });
    return (
      <li {...props} {...theme(1, ...classes)}>
        {children}
      </li>
    );
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
