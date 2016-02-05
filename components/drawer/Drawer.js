import React from 'react';
import ClassNames from 'classnames/bind';
import Overlay from '../overlay';
import style from './drawer.css';

const Drawer = ({active, className, type, onOverlayClick, ...props}) => {
  const cx = ClassNames.bind(style);
  const classes = cx({
    container: true,
    left: type == 'left',
    right: type == 'right',
    active
  }, className);

  return (
    <Overlay active={active} onClick={onOverlayClick}>
      <div className={classes}>
        <aside>
          {props.children}
        </aside>
      </div>
    </Overlay>
  );
};

Drawer.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  type: React.PropTypes.oneOf(['left', 'right'])
};

Drawer.defaultProps = {
  active: false,
  className: '',
  type: 'left'
};

export default Drawer;
