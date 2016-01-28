/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
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
    if( this.isActive() ){
      this.hide();
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
    var dropdown_classes = cx({
      dropdown: true,
      'dropdown--active': active
    });
    dropdown_classes += ' ' + className;
    // stick callback on trigger element
    const bound_children = React.Children.map( children, child => {
      if( child.type === DropdownTrigger ){
        child = cloneElement( child, {
          ref: 'trigger',
          onClick: this._onToggleClick
        });
      }
      return child;
    });
    return (
      <div
        {...props}
        className={dropdown_classes}
      >
        {bound_children}
      </div>
    );
  };

}


export default Dropdown;