import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './tabs.css';

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tabIndex: PropTypes.number
};

const defaultProps = {
  active: false,
  className: ''
};

const TabContent = ({active, tabIndex, children, className}) => {
    const cx = ClassNames.bind(style);
    const classNames = cx({
      tabContent: true,
      tabActive: active
    }, className);

    return (
      <section className={classNames} tabIndex={tabIndex}>
        {children}
      </section>
    );
};

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;

export default TabContent;
