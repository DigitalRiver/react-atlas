import React from "react";
import style from "./list.css";

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
    let classNames = style.item;
    if (className) classNames += ` ${className}`;
    return (
      <li {...props} className={classNames}>
        {children}
      </li>
    );
};

ListItem.styleguide = {
  category: 'Lists',
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
