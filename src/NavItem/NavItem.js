import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Button } from "../Button";
import CSSModules from "react-css-modules";
import styles from "./NavItem.css";

export class NavItem extends React.Component {
  _handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(this.props.navKey, event);
    }
  };

  render() {
    const {
      as,
      className,
      style,
      active,
      disabled,
      href,
      parent,
      subNav,
      collapsed,
      children,
      ...others
    } = this.props;

    const button = (
      <Button
        disabled={disabled}
        styleName={cx("link", { disabled, subNav })}
        link
        href={typeof this.props.to === "undefined" ? href : null}
        onClick={
          typeof this.props.to === "undefined" ? this._handleClick : null
        }
      >
        {children}
        <i styleName={cx({ caret: parent })} />
      </Button>
    );
    const LinkElement = this.props.as;

    if (typeof as !== "undefined" && !disabled) {
      return (
        <li
          role="presentation"
          styleName={cx("navItem", { active, disabled, collapsed, subNav })}
          style={style}
          className={className}
        >
          <LinkElement {...others} onClick={this._handleClick}>
            {button}
          </LinkElement>
        </li>
      );
    } else {
      return (
        <li
          role="presentation"
          styleName={cx("navItem", { active, disabled, collapsed, subNav })}
          style={style}
          className={className}
        >
          {button}
        </li>
      );
    }
  }
}

NavItem.propTypes = {
  /** Child elements, plain text or HTML/React element. */
  as: PropTypes.func,

  /** Child elements, plain text or HTML/React element. */
  children: PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to NavItem.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /** When true, NavItem will be disabled. */
  disabled: PropTypes.bool,

  /** The URL that the NavItem will link to. */
  href: PropTypes.string,

  /** Specify NavItem unique key */
  navKey: PropTypes.number.isRequired,
  /** Pass inline styling here. */
  style: PropTypes.object,
  /** When true, NavItem will be set as active.
   * @ignore
   */
  active: PropTypes.bool,
  /** Only first NavItem in sub-Nav container will be true.
   * @ignore
   */
  parent: PropTypes.bool,
  /** Each NavItem in sub-Nav container will be true except first one.
   * @ignore
   */
  subNav: PropTypes.bool,
  /** Only use in sub Nav container, defines parent NavItem caret and subNav show or not.
   * @ignore
   */
  collapsed: PropTypes.bool,
  /** callback for Nav Component
   * @ignore
   */
  "onClick": PropTypes.func,
  /** to prop is from the react-router spec
   * @ignore
   */
  "to": PropTypes.string
};

NavItem.defaultProps = {
  className: ""
};

export default CSSModules(NavItem, styles, { allowMultiple: true });
