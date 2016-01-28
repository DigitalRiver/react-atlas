/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/

import React, { cloneElement, Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import DropdownTrigger from './DropdownTrigger';
import DropdownContent from './DropdownContent';
import { findDOMNode } from 'react-dom';
import style from './dropdown.css';

const defaultProps = {
  className: ''
};

class Dropdown extends Component {
  constructor (props) {
      super(props);
      this.state = {
          active: false
      };
  }

  componentDidMount () {
    window.addEventListener( 'click', this._onWindowClick );
  };

  componentWillUnmount () {
    window.removeEventListener( 'click', this._onWindowClick );
  };

  _onWindowClick = ( event ) => {
    const dropdown_element = findDOMNode( this );
    if( event.target !== dropdown_element && !dropdown_element.contains( event.target ) && this._isActive() ){
      this._hide();
    }
  };

  _onToggleClick = ( event ) => {
    event.preventDefault();
    if( this._isActive() ){
      this._hide();
    } else {
      this._show();
    }
  };

  _isActive = () => {
    return ( typeof this.props.active === 'boolean' ) ?
      this.props.active :
      this.state.active;
  };

  _hide = () => {
    this.setState({
      active: false
    });
    if( this.props.onHide ){
      this.props.onHide();
    }
  };

  _show = () => {
    this.setState({
      active: true
    });
    if( this.props.onShow ){
      this.props.onShow();
    }
  };

  render () {
    const { children, className, ...props } = this.props;
    // create component classes
    const active = this._isActive();
    const cx = classNames.bind(style);
    var classes = cx(className, {
      container: true
    });

    // stick callback on trigger element
    const bound_children = React.Children.map( children, child => {
      if( child.type === DropdownTrigger ){
        child = cloneElement( child, {
          onClick: this._onToggleClick
        });
      } else if( child.type === DropdownContent ){
        child = cloneElement( child, {
          active
        });
      }
      return child;
    });
    return (
      <div
        {...props}
        className={classes}
      >
        {bound_children}
      </div>
    );
  };

}


export default Dropdown;