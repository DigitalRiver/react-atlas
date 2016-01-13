import React from 'react';
import style from './style';

const propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  tabIndex: React.PropTypes.number
};

const defaultProps = {
  active: false,
  className: ''
};

const TabContent = ({active, tabIndex, children, className}) => {
    let classNames = style.tab;
    if (active) className += ` ${style.active}`;
    if (className) classNames += ` ${className}`;

    return (
      <section className={classNames} tabIndex={tabIndex}>
        {children}
      </section>
    );
};

export default TabContent;
