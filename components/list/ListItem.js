import React from "react";
import style from "./list.css";

const propTypes = {
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool
};

const defaultProps = {
  disabled: false,
  className: ''
};

const ListItem= ({children, className, ...props}) => {
    let classNames = style.item;
    if (className) classNames += ` ${className}`;
    return (
      <li {...props} className={classNames}>
        {children}
      </li>
    );
};

export default ListItem;
