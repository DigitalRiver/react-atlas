import React from 'react';
import ClassNames from 'classnames/bind';
import style from './header.css';

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

Header.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fixed: React.PropTypes.bool
};

Header.defaultProps = {
  className: '',
  fixed: false
};

export default Header;
