import React, { PropTypes } from 'react';
import themeable from 'react-themeable';

/**
 * A Generic button component.
 */
const Button = ({className, outline, href, loading, primary, secondary, success, warning, danger, link, large, small, block, disabled, children, ...props}) => {
    const theme = themeable(props.theme);

    const element = href ? 'a' : 'button';

    let role;
    if (element === 'a') {
      role = 'button';
    }

    var disabledStyle = disabled || loading ? 'disabled' : '';

    var mainStyle = 'button';
    if (primary) {
        mainStyle = 'primary';
    } else if (secondary) {
        mainStyle = 'secondary';
    } else if (success) {
        mainStyle = 'success';
    } else if (warning) {
        mainStyle = 'warning';
    } else if (danger) {
        mainStyle = 'danger';
    } else if (link) {
        mainStyle = 'link';
    }

    if (outline && !secondary) {
        mainStyle += '_outline';
    }

    const otherProps = {
      ...props,
      href,
      className,
      disabled: disabled || loading,
      role,
      ...theme(1, mainStyle, disabledStyle)
    };

    return React.createElement(element, otherProps,
      children
    );

};

Button.styleguide = {
  index: '1.1',
  category: 'Buttons',
  example: `
  <section>
    <h2>Styled with parameters</h2>
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

    <h2>Styled with wrapper components</h2>
    <p>Regular Buttons</p>
    <PrimaryButton>Button</PrimaryButton>
    <SecondaryButton>Secondary</SecondaryButton>
    <SuccessButton>Success</SuccessButton>
    <WarningButton>Warning</WarningButton>
    <DangerButton>Danger</DangerButton>
    <LinkButton href="#">Link</LinkButton>
    <p>Disabled Regular Buttons</p>
    <PrimaryButton disabled>Button</PrimaryButton>
    <SecondaryButton disabled>Secondary</SecondaryButton>
    <SuccessButton disabled>Success</SuccessButton>
    <WarningButton disabled>Warning</WarningButton>
    <DangerButton disabled>Danger</DangerButton>
    <LinkButton href="#" disabled>Link</LinkButton>
    <p>Outline Buttons</p>
    <PrimaryButton outline>Button</PrimaryButton>
    <SecondaryButton>Secondary</SecondaryButton>
    <SuccessButton outline>Success</SuccessButton>
    <WarningButton outline>Warning</WarningButton>
    <DangerButton outline>Danger</DangerButton>
    <LinkButton href="#" outline>Link</LinkButton>
    <p>Disabled Outline Buttons</p>
    <PrimaryButton disabled outline>Button</PrimaryButton>
    <SecondaryButton disabled>Secondary</SecondaryButton>
    <SuccessButton disabled outline>Success</SuccessButton>
    <WarningButton disabled outline>Warning</WarningButton>
    <DangerButton disabled outline>Danger</DangerButton>
    <LinkButton href="#" disabled outline>Link</LinkButton>
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
  disabled: false,
  theme: {
    button: true
  }
};

export default Button;
