import React, { PropTypes, createElement } from 'react';
import ClassNames from 'classnames/bind';
import style from './button.css';

const Button = ({className, outline, href, loading, primary, secondary, success, warning, danger, link, large, small, block, disabled, children, ...others}) => {

    const element = href ? 'a' : 'button';
    const cx = ClassNames.bind(style);
    let classNames = cx({
        large,
        small,
        block,
        disabled,
        className
    });

    if (outline) {
      classNames += ' ' + cx({
        primary_outline: !secondary && !success && !warning && !danger && !link,
        secondary,
        success_outline: success,
        warning_outline: warning,
        danger_outline: danger,
        link_outline: link
      });
    } else {
      classNames += ' ' + cx({
        primary: !secondary && !success && !warning && !danger && !link,
        secondary,
        success,
        warning,
        danger,
        link
      });
    }


    let role;
    if (element === 'a') {
      role = 'button';
    }
    const props = {
      ...others,
      href,
      className: classNames,
      disabled: disabled || loading,
      role
    };

    return createElement(element, props,
      children
    );

};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  primary: PropTypes.bool,
  type: PropTypes.string,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  link: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  block: PropTypes.bool
};

Button.defaultProps = {
  className: '',
  outline: false,
  loading: false,
  mini: false,
  primary: false,
  secondary: false,
  success: false,
  warning: false,
  danger: false,
  link: false,
  raised: false,
  large: false,
  small: false,
  disabled: false
};

Button.styleguide = {
    index: "1.1",
    category: "Elements",
    title: "Button",
    description: "Button Component description",
    code: `
    <p>Regular Buttons</p>
    <Button style={{"margin": "0 5px"}}>Button</Button>
    <Button secondary style={{"margin": "0 5px"}}>Secondary</Button>
    <Button success style={{"margin": "0 5px"}}>Success</Button>
    <Button warning style={{"margin": "0 5px"}}>Warning</Button>
    <Button danger style={{"margin": "0 5px"}}>Danger</Button>
    <Button href="#" link style={{"margin": "0 5px"}}>Link</Button>

    <p>Disabled Regular Buttons</p>
    <Button disabled primary style={{"margin": "0 5px"}}>Button</Button>
    <Button disabled secondary style={{"margin": "0 5px"}}>Secondary</Button>
    <Button disabled success style={{"margin": "0 5px"}}>Success</Button>
    <Button disabled warning style={{"margin": "0 5px"}}>Warning</Button>
    <Button disabled danger style={{"margin": "0 5px"}}>Danger</Button>
    <Button href="#" disabled link style={{"margin": "0 5px"}}>Link</Button>

    <p>Outline Buttons</p>
    <Button outline primary style={{"margin": "0 5px"}}>Button</Button>
    <Button outline secondary style={{"margin": "0 5px"}}>Secondary</Button>
    <Button success outline style={{"margin": "0 5px"}}>Success</Button>
    <Button warning outline style={{"margin": "0 5px"}}>Warning</Button>
    <Button danger outline style={{"margin": "0 5px"}}>Danger</Button>
    <Button href="#" link outline style={{"margin": "0 5px"}}>Link</Button>

    <p>Disabled Outline Buttons</p>
    <Button disabled outline primary style={{"margin": "0 5px"}}>Button</Button>
    <Button disabled secondary outline style={{"margin": "0 5px"}}>Secondary</Button>
    <Button disabled success outline style={{"margin": "0 5px"}}>Success</Button>
    <Button disabled warning outline style={{"margin": "0 5px"}}>Warning</Button>
    <Button disabled danger outline style={{"margin": "0 5px"}}>Danger</Button>
    <Button href="#" disabled link outline style={{"margin": "0 5px"}}>Link</Button>
    `
};

export default Button;
