import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './button.css';

/**
 * A Generic button component.
 */
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

    return React.createElement(element, props,
      children
    );

};

Button.styleguide = {
  index: '1.1',
  category: 'Buttons',
  example: `
  <section>
    <p>Regular Buttons</p>
    <Button>Button</Button>
    <Button secondary>Secondary</Button>
    <Button success>Success</Button>
    <Button warning>Warning</Button>
    <Button danger>Danger</Button>
    <Button href="#" link>Link</Button>

    <p>Disabled Regular Buttons</p>
    <Button disabled primary>Button</Button>
    <Button disabled secondary>Secondary</Button>
    <Button disabled success>Success</Button>
    <Button disabled warning>Warning</Button>
    <Button disabled danger>Danger</Button>
    <Button href="#" disabled link>Link</Button>

    <p>Outline Buttons</p>
    <Button outline primary>Button</Button>
    <Button outline secondary>Secondary</Button>
    <Button success outline>Success</Button>
    <Button warning outline>Warning</Button>
    <Button danger outline>Danger</Button>
    <Button href="#" link outline>Link</Button>

    <p>Disabled Outline Buttons</p>
    <Button disabled outline primary>Button</Button>
    <Button disabled secondary outline>Secondary</Button>
    <Button disabled success outline>Success</Button>
    <Button disabled warning outline>Warning</Button>
    <Button disabled danger outline>Danger</Button>
    <Button href="#" disabled link outline>Link</Button>

    <p>Large Buttons</p>
    <Button large>Button</Button>
    <Button large secondary>Secondary</Button>

    <p>Small Buttons</p>
    <Button small primary>Button</Button>
    <Button small secondary>Secondary</Button>

    <p>Block Level Buttons</p>
    <Button block>Button</Button>
    <Button block secondary>Secondary</Button>
  </section>
  `
};

Button.propTypes = {
    /**
     * Anything that can be in a button. Usually text, but could also be icons/glyphs.
     * @examples 'Save', 'Cancel'
     */
  children: PropTypes.node,
    /**
     * define a custom css class name
     * @examples "btn", "btn-active"
     */
  className: PropTypes.string,
    /**
     * define a custom css class name
     * @examples "btn", "btn-active"
     */
  disabled: PropTypes.bool,
    /**
     * use outline styled button
     * @examples <Button outline>
     */
  outline: PropTypes.bool,
    /**
     * define button href if anchor
     * @examples '#', 'http://some-website.com/'
     */
  href: PropTypes.string,
    /**
     * set loading animation on button
     * @examples <Button loading>
     */
  loading: PropTypes.bool,
    /**
     * use primary style button (button is set to this by default)
     * @examples <Button primary>
     */
  primary: PropTypes.bool,
  type: PropTypes.string,
    /**
     * use secondary style button
     * @examples <Button secondary>
     */
  secondary: PropTypes.bool,
    /**
     * use success style button
     * @examples <Button success>
     */
  success: PropTypes.bool,
    /**
     * use warning style button
     * @examples <Button warning>
     */
  warning: PropTypes.bool,
    /**
     * use danger style button
     * @examples <Button danger>
     */
  danger: PropTypes.bool,
    /**
     * use link style button
     * @examples <Button link>
     */
  link: PropTypes.bool,
    /**
     * use large style button
     * @examples <Button large>
     */
  large: PropTypes.bool,
    /**
     * use small style button
     * @examples <Button small>
     */
  small: PropTypes.bool,
    /**
     * use block style button
     * @examples <Button block>
     */
  block: PropTypes.bool
};

Button.defaultProps = {
  children: "Default Button",
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

export default Button;
