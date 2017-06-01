import React from "react";
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
  "children": React.PropTypes.node,
  "className": React.PropTypes.string,
  "fixed": React.PropTypes.bool,
  "theme": React.PropTypes.object
};

Header.defaultProps = { "className": "", "fixed": false };

export default Header;
