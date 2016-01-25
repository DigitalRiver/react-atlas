import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames/bind';
import style from './overlay.css';

const propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  invisible: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

const defaultProps = {
   invisible: false
};

class Overlay extends Component {

  componentDidMount () {
    this.overlay = document.createElement('div');
    this.overlay.setAttribute('data-react-atlas', 'overlay');
    document.body.appendChild(this.overlay);
    this.handleRender();
  }

  componentDidUpdate () {
    this.handleRender();
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.overlay);
    document.body.removeChild(this.overlay);
  }

  handleRender () {
    const { className, active, invisible, children, onClick } = this.props;

    const cx = ClassNames.bind(style);
    const classNames = cx({
      inactive: !active,
      active,
      invisible,
      className
    });

    ReactDOM.render(
      <div className={classNames}>
        <div className={style.overlay} onClick={onClick} />
        {children}
      </div>
    , this.overlay);
  }

  render () {
    return null;
  }
}

export default Overlay;
