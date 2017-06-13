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

Header.styleguide = {
  "category": "Layout",
  "index": "4.5",
  "example": 
    `
<div style={{maxHeight: "200px", overflowY: "scroll"}}>
  <Header>
    <h1>This is a Header</h1>
  </Header>
  <div>
    <p>This is some text inside a container div</p>
    <p>that has a scroll on it</p>
    <p>Try adding 'fixed' prop</p>
    <p>to the Header component</p>
  </div>
</div>
`
  
};

export default Header;
