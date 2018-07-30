import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Button } from "../Button";
import CSSModules from "react-css-modules";
import styles from "./NavItem.css";

export class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.NavItemRef = React.createRef();

    this.state = {
      "visible": false // indicate if this NavItem is visible in Nav or hidden in rightmost dropdown
    };
  }

  componentDidMount() {
    this.updateVisibility();
    window.addEventListener("resize", this.updateVisibility);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateVisibility);
  }

  _handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(this.props.navKey, event);
    }
  };

  updateVisibility = () => {
    this.setState({
      "visible":
        this.NavItemRef.current.offsetWidth +
          this.NavItemRef.current.offsetLeft <=
        window.innerWidth
    });
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
      horizontal,
      ...others
    } = this.props;

    const button = 
      <Button
        disabled={disabled}
        styleName={
          !horizontal || horizontal && subNav
            ? cx("link", disabled, subNav)
            : cx("link", "horizontal", disabled, subNav)
        }
        link
        href={typeof to === "undefined" ? href : null}
        onClick={typeof to === "undefined" ? this._handleClick : null}
      >
        {children}
        <i styleName={cx({ "caret": parent })} />
      </Button>
    ;

    const LinkElement = this.props.as;

    if (typeof as !== "undefined" && !disabled) {
      return (
        <li
          role="presentation"
          styleName={
            !horizontal || horizontal && subNav
              ? cx("navItem", { active, disabled, collapsed, subNav })
              : cx("navItem", "horizontal", {
                  active,
                  disabled,
                  collapsed,
                  subNav
                })
          }
          style={style}
          className={className}
          ref={this.NavItemRef}
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
          styleName={
            !horizontal || horizontal && subNav
              ? cx("navItem", { active, disabled, collapsed, subNav })
              : cx("navItem", "horizontal", {
                  active,
                  disabled,
                  collapsed,
                  subNav
                })
          }
          style={style}
          className={className}
          ref={this.NavItemRef}
        >
          {button}
        </li>
      );
    }
  }
}

NavItem.propTypes = {
  /** Child elements, plain text or HTML/React element. */
  "as": PropTypes.func,

  /** Child elements, plain text or HTML/React element. */
  "children": PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to NavItem.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /** When true, NavItem will be disabled. */
  "disabled": PropTypes.bool,

  /** The URL that the NavItem will link to. */
  "href": PropTypes.string,

  /** Specify NavItem unique key */
  "navKey": PropTypes.number.isRequired,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /** When true, NavItem will be set as active.
   * @ignore
   */
  "active": PropTypes.bool,
  /** Only first NavItem in sub-Nav container will be true.
   * @ignore
   */
  "parent": PropTypes.bool,
  /** Each NavItem in sub-Nav container will be true except first one.
   * @ignore
   */
  "subNav": PropTypes.bool,
  /** Only use in sub Nav container, defines parent NavItem caret and subNav show or not.
   * @ignore
   */
  "collapsed": PropTypes.bool,
  /** callback for Nav Component
   * @ignore
   */
  "onClick": PropTypes.func,
  /** Define whether the NavItem is vertical or horizontal, NavItem is vertical by default */
  "horizontal": PropTypes.bool
};

NavItem.defaultProps = {
  "className": "",
  "horizontal": false
};

export default CSSModules(NavItem, styles, { "allowMultiple": true });
