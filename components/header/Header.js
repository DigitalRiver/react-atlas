import React from 'react';
import ClassNames from 'classnames/bind';
import style from './style';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fixed: React.PropTypes.bool,
  flat: React.PropTypes.bool
};

const defaultProps = {
  className: '',
  fixed: false,
  flat: false
};

const Header = ({className, fixed, flat, children, ...props}) => {
  const cx = ClassNames.bind(style);
  const classes = cx({
    root: true,
    fixed,
    flat
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
