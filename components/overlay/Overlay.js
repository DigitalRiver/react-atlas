import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames/bind';
import style from './overlay.css';

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

    const overlayClasses = cx({
      overlayActive: active,
      overlayInactive: !active
    });

    ReactDOM.render(
      <div className={classNames}>
        <div className={overlayClasses} onClick={onClick} />
        {children}
      </div>
    , this.overlay);
  }

  render () {
    return null;
  }
}

Overlay.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  invisible: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

Overlay.defaultProps = {
   invisible: false
};

export default Overlay;
