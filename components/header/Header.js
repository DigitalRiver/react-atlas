import React from 'react';
import ClassNames from 'classnames/bind';
import style from './header.css';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fixed: React.PropTypes.bool
};

const defaultProps = {
  className: '',
  fixed: false
};

const Header = ({className, fixed, children, ...props}) => {
  const cx = ClassNames.bind(style);
  const classes = cx({
    container: true,
    fixed
  }, className);

  return (
    <header {...props} className={classes}>
      {children}
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
