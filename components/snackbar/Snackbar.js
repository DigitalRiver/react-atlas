import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import Overlay from '../overlay';
import style from './snackbar.css';

class Snackbar extends Component {

  componentDidUpdate () {
    if (this.props.active && this.props.timeout) {
      setTimeout(() => {
        this.props.onTimeout();
      }, this.props.timeout);
    }
  }

  render () {
    const { active, className, ...props } = this.props;

    const cx = ClassNames.bind(style);
    const classNames = cx({
      root: true,
      active,
      className
    });

    return (
      <Overlay active={active} opacity={0}>
        <div className={classNames}>
            {React.Children.map(this.props.children, (child) => {
                if (typeof child === 'string') {
                    return <span className={style.text}>{child}</span>;
                } else {
                    return child;
                }
            })}
        </div>
      </Overlay>
    );
  }
}

Snackbar.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    timeout: PropTypes.number,
    onTimeout: PropTypes.func,
    children: PropTypes.node
};

export default Snackbar;
