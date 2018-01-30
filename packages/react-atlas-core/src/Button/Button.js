import React from "react";
import PropTypes from "prop-types";
import {IconCore} from './../Icon';
import cx from "classnames";

/**
 * A Generic button component.
 */
class Button extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onClick,
      className,
      children,
      disabled,
      large,
      small,
      primary,
      secondary,
      warning,
      error,
      link,
      outline,
      icon,
      type,
      href,
      style
    } = this.props;

    let mainStyle = "button";
    if (primary) {
      mainStyle = "primary";
    } else if (secondary) {
      mainStyle = "secondary";
    } else if (warning) {
      mainStyle = "warning";
    } else if (error) {
      mainStyle = "error";
    } else if (link) {
      mainStyle = "link";
    } else {
      mainStyle = "default_btn";
    }

    if (outline) {
      mainStyle += "_outline";
    }

    /**
     * Use cx to construct a CSS class object.
     * cx will automatically remove falsy values
     * for us. This way only passed props will be
     * transformed into CSS classes.
     */
    const classes = cx(
      {
        "disabled": disabled,
        "large": large,
        "small": small,
        "button": true
      },
      mainStyle
    );

    let text = children;
    let iconClass = false;

    /* Just use the icon instead of text when an icon
     * is passed and no children(text) is set. */
    if (icon && children === "Default Button") {
      text = null;
    } else if (icon) {
      text = children;
      iconClass = "ra_Button__icon-left";
    }

    let btn = <button
          onClick={onClick}
          className={cx(className)}
          styleName={classes}
          style={style}
          type={type}
          href={href}
        >
          {icon ? <IconCore icon={icon} /> : null}
          {text}
        </button>
    ;

    let renderButton = btn;
    if (href) {
      renderButton = <a href={href}>{btn}</a>;
    }

    return renderButton;
  }
}

Button.propTypes = {
  /** HTML5 button type, eg submit, button, etc */
  "type": PropTypes.string,
  /** The URL to link to. */
  "href": PropTypes.string,
  /**
   * Define a mini button.
   *
   */
  "children": PropTypes.node,
  /**
   * Click event handler.
   */
  "onClick": PropTypes.func,
  /** An Object, array, or string of CSS classes to apply to button.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   *Determines if the button is disabled.
   * @examples <Button disabled/>
   */
  "disabled": PropTypes.bool,
  /**
   * use outline styled button
   * @examples <Button outline>
   */
  "outline": PropTypes.bool,
  /**
   * use primary style button
   * @examples <Button primary>
   */
  "primary": PropTypes.bool,
  /**
   * use secondary style button
   * @examples <Button secondary>
   */
  "secondary": PropTypes.bool,
  /**
   * use warning style button
   * @examples <Button warning>
   */
  "warning": PropTypes.bool,
  /**
   * use error style button
   * @examples <Button error>
   */
  "error": PropTypes.bool,
  /**
   * use link style button
   * @examples <Button link>
   */
  "link": PropTypes.bool,
  /**
   * use large style button
   * @examples <Button large>
   */
  "large": PropTypes.bool,
  /**
   * use small style button
   * @examples <Button small>
   */
  "small": PropTypes.bool,

  /**
   * The class name of the icon you want to set.
   */
  "icon": PropTypes.string,

  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object
};

Button.defaultProps = {
  "children": "Default Button",
  "outline": false,
  "primary": false,
  "secondary": false,
  "warning": false,
  "error": false,
  "link": false,
  "large": false,
  "small": false,
  "disabled": false,
  "type": "button"
};

export default Button;
