import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./Button.css";

/**
 * A Generic button component.
 */
export class Button extends React.PureComponent {
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
      ignoreTab,
      id,
      name,
      style
    } = this.props;

    let mainStyle = "button";
    let hoverStyle = "";
    if (primary) {
      mainStyle = "primary";
      if (!disabled) {
        hoverStyle = "primary_hover";
      }
    } else if (secondary) {
      mainStyle = "secondary";
      if (!disabled) {
        hoverStyle = "secondary_hover";
      }
    } else if (warning) {
      mainStyle = "warning";
      if (!disabled) {
        hoverStyle = "warning_hover";
      }
    } else if (error) {
      mainStyle = "error";
      if (!disabled) {
        hoverStyle = "error_hover";
      }
    } else if (link) {
      mainStyle = "link";
      if (!disabled) {
        hoverStyle = "link_hover";
      }
    } else {
      mainStyle = "default_btn";
      if (!disabled) {
        hoverStyle = "default_btn_hover";
      }
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
        "button": true,
        "uppercase": !link
      },
      mainStyle,
      hoverStyle
    );

    let text = children;
    let iconClass = false;

    /* Just use the icon instead of text when an icon
     * is passed and no children(text) is set. */
    if (icon && children === "Default Button") {
      text = null;
    } else if (icon) {
      text = children;
      iconClass = "icon-left";
    }

    let btn = 
      <button
        onClick={disabled ? null : onClick}
        className={cx(className)}
        styleName={classes}
        style={style}
        type={disabled ? Button.defaultProps.type : type}
        href={href}
        tabIndex={ignoreTab ? -1 : 0}
        id={id}
        name={name}
      >
        {icon ? <i className={icon} styleName={iconClass} /> : null}
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
  /** An object, array, or string of CSS classes to apply to Button.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   *When true, Button component will be disabled.
   * @examples <Button disabled/>
   */
  "disabled": PropTypes.bool,
  /**
   * Will display error style button.
   * @examples <Button error>
   */
  "error": PropTypes.bool,
  /** The URL that the Button will link to. */
  "href": PropTypes.string,
  /**
   * The className of the icon you want to set.
   */
  "icon": PropTypes.string,
  /**
   * Will set the html "id" property on the Button.
   */
  "id": PropTypes.string,
  /**
   * Button will be ignored by keyboard navigation when set to true.
   */
  "ignoreTab": PropTypes.bool,
  /**
   * Will display large style Button.
   * @examples <Button large>
   */
  "large": PropTypes.bool,
  /**
   * Will display large style Button.
   * @examples <Button link>
   */
  "link": PropTypes.bool,
  /**
   * Will set the html "name" property on the Button.
   */
  "name": PropTypes.string,
  /**
   * Click event handler for the Button.
   */
  "onClick": PropTypes.func,
  /**
   * Will display outline styled Button.
   * @examples <Button outline>
   */
  "outline": PropTypes.bool,
  /**
   * Will display primary style Button.
   * @examples <Button primary>
   */
  "primary": PropTypes.bool,
  /**
   * Will display secondary style Button.
   * @examples <Button secondary>
   */
  "secondary": PropTypes.bool,
  /**
   * Will display small style Button.
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
   * Will display warning style Button.
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
  "type": "button",
  "ignoreTab": false
};
export default CSSModules(Button, styles, { "allowMultiple": true });
