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

Header.styleguide = {
  category: 'Layout',
  index: '4.5',
  example:`
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
