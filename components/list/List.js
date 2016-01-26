import React from 'react';
import style from './list.css';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
};

const defaultProps = {
  className: ''
};

const List = ({className, children, ...props}) => {
    let classNames = style.list;
    if (className) classNames += ` ${className}`;
    return (
      <ul {...props} className={classNames}>
        {children}
      </ul>
    );
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
