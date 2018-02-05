import React from "react";
import PropTypes from "prop-types";
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

    let btn = 
      <button
        onClick={onClick}
        className={cx(className)}
        styleName={classes}
        style={style}
        type={type}
        href={href}
      >
        {icon ? <i className={cx(icon, iconClass)} /> : null}
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
  /**
   * Children should be either a string, an icon/glyphicon, or an image tag.
   *
   */
  "children": PropTypes.node,
  /** An Object, array, or string of CSS classes to apply to Button.*/
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
   * Use error style button.
   * @examples <Button error>
   */
  "error": PropTypes.bool,
  /** The URL to link to. */
  "href": PropTypes.string,
  /**
   * The className of the icon you want to set.
   */
  "icon": PropTypes.string,
  /**
   * Use large style button.
   * @examples <Button large>
   */
  "large": PropTypes.bool,
  /**
   * Use link style button.
   * @examples <Button link>
   */
  "link": PropTypes.bool,
  /**
   * Click event handler.
   */
  "onClick": PropTypes.func,
  /**
   * Use outline styled button.
   * @examples <Button outline>
   */
  "outline": PropTypes.bool,
  /**
   * Use primary style button.
   * @examples <Button primary>
   */
  "primary": PropTypes.bool,
  /**
   * Use secondary style button.
   * @examples <Button secondary>
   */
  "secondary": PropTypes.bool,
  /**
   * Use small style button.
   * @examples <Button small>
   */
  "small": PropTypes.bool,
  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,
  /** HTML5 button type, eg submit, button, etc. */
  "type": PropTypes.string,
  /**
   * Use warning style button.
   * @examples <Button warning>
   */
  "warning": PropTypes.bool
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
