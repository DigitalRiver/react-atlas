import React from 'react';
import classNames from 'classnames/bind';
import Button from '../button';
import Overlay from '../overlay';
import style from './style.css';

const propTypes = {
  actions: React.PropTypes.array,
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  title: React.PropTypes.string,
  type: React.PropTypes.string
};

const defaultProps = {
  actions: [],
  active: false,
  type: 'normal'
};

const Dialog = (props) => {
  const {body, navigation, active, base, button, title, type} = this.props;
  const cx = classNames.bind(style);
  const actions = props.actions.map((action, idx) => {
    const className = cx({
      button: true,
      [action.className]: action.className
    });
    return <Button key={idx} {...action} className={className} />;
  });

  let className = cx({
    base: true,
    type: props.type,
    active: props.active,
    [props.className]: true
  });

  return (
      <Overlay active={props.active} onClick={props.onOverlayClick}>
        <div data-react-toolbox='dialog' className={className}>
          <section role='body' className={body}>
            {props.title ? <h6 className={title}>{props.title}</h6> : null}
            {props.children}
          </section>
          <nav role='navigation' className={navigation}>
            {actions}
          </nav>
        </div>
      </Overlay>
  );
};




export default Dialog;
