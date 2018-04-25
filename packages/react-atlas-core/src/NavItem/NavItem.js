import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { ButtonCore } from "./../Button";

class NavItem extends React.PureComponent {
  _handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(this.props.navKey, event);
    }
  };

  render() {
    const {
      className,
      style,
      active,
      disabled,
      href,
      parent,
      subNav,
      collapsed,
      children
    } = this.props;
    if (subNav && collapsed) {
      return "";
    }

    return (
      <li
        role="presentation"
        styleName={cx("navItem", { active, disabled, collapsed })}
        style={style}
        className={className}
      >
        <ButtonCore
          disabled={disabled}
          styleName={cx("link", { disabled, subNav })}
          href={href}
          onClick={this._handleClick}
        >
          {children}
          <i styleName={cx({ "caret": parent })} />
        </ButtonCore>
      </li>
    );
  }
}

NavItem.propTypes = {
  /**
   * Child elements, plain text or HTML/React element.
   */
  "children": PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to NavItem.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, NavItem will be disabled.
   */
  "disabled": PropTypes.bool,

  /**
   * The URL that the NavItem will link to.
   */
  "href": PropTypes.string,

  /**
   * Specify NavItem unique key
   */
  "navKey": PropTypes.number.isRequired,
  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,
  /**
   * When true, NavItem will be set as active.
   *
   * @ignore
   */
  "active": PropTypes.bool,
  /**
   * Only first NavItem in sub-Nav container will be true.
   *
   * @ignore
   */
  "parent": PropTypes.bool,
  /**
   * Each NavItem in sub-Nav container will be true except first one.
   *
   * @ignore
   */
  "subNav": PropTypes.bool,
  /**
   * Only use in sub Nav container, defines parent NavItem caret and subNav show or not.
   *
   * @ignore
   */
  "collapsed": PropTypes.bool,
  /**
   * callback for Nav Component
   *
   * @ignore
   */
  "onClick": PropTypes.func
};

NavItem.defaultProps = {
  "className": ""
};

export default NavItem;
