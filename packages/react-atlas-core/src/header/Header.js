import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

const Header = ({ className, fixed, children, ...props }) => {
  const classes = cx({ "container": true, fixed });

  return (
    <header {...props} styleName={classes} className={cx(className)}>
      {children}
    </header>
  );
};

Header.propTypes = {
  "children": PropTypes.node,
  "className": PropTypes.string,
  "fixed": PropTypes.bool,
  "theme": PropTypes.object
};

Header.defaultProps = { "className": "", "fixed": false };

export default Header;
