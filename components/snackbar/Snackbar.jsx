import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import Overlay from '../overlay';
import style from './snackbar.css';

const propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    timeout: PropTypes.number
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

    let children = React.Children.map(this.props.children, (child) => {
        if (typeof child === 'string') {
          return <span className={style.text}>{child}</span>
        }
        return child;
    });

    let cx = ClassNames.bind(style);
    let className = cx({
      root: true,
      active: active
    }, this.props.className);

    return (
      <Overlay active={active} opacity={0}>
        <div data-react-toolbox='snackbar' className={className}>
          {children}
        </div>
      </Overlay>
    );
  }
}

Snackbar.propTypes = propTypes;

export default Snackbar;
