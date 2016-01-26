import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import Overlay from '../overlay';
import style from './snackbar.css';

const propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    timeout: PropTypes.number,
    onTimeout: PropTypes.func,
    children: PropTypes.node
};

class Snackbar extends Component {

  componentDidUpdate () {
    if (this.props.active && this.props.timeout) {
      setTimeout(() => {
        this.props.onTimeout();
      }, this.props.timeout);
    }
  }

  render () {
    const { active } = this.props;

    const children = React.Children.map(this.props.children, (child) => {
        if (typeof child === 'string') {
          return <span className={style.text}>{child}</span>;
        }
        return child;
    });

    const cx = ClassNames.bind(style);
    const className = cx({
      root: true,
      active
    }, this.props.className);

    return (
      <Overlay active={active} opacity={0}>
        <div className={className}>
          {children}
        </div>
      </Overlay>
    );
  }
}

Snackbar.propTypes = propTypes;

export default Snackbar;
