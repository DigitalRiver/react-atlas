import React from 'react';
import style from './list.css';

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

export default List;
