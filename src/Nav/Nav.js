import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import styles from "./Nav.css";
import cx from "classnames";
import { NavItem } from "../NavItem";

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "activeIndex": props.activeIndex, // The index of selected menu item.
      "collapsed": props.collapsed // Whether or not sub-nav menu collapsed.
    };
  }

  // floyd: i don't think we need this function if we handle onClick properly
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      console.log("check check");
      this.setState({ "activeIndex": nextProps.activeIndex });
    }
  }

  _handleClick = (index, event) => {
    this.setState({ "activeIndex": index });
    if (this.props.onClick) {
      this.props.onClick(index, event);
    }
  };

  _handleCollapse = (index, event) => {
    this.setState({ "collapsed": !this.state.collapsed });
    if (this.props.onClick) {
      this.props.onClick(index, event);
    }
  };

  _buildNavByData = () => {
    const { className, data, ignoreActive, onClick, style } = this.props;
    return (
      <Nav
        styleName={cx("nav")}
        className={className}
        style={style}
        activeIndex={this.state.activeIndex}
        onClick={onClick}
        ignoreActive={ignoreActive}
      >
        {data.map(nav => {
          console.log("nav", nav);
          const { title, collapsed, ...others } = nav;
          if (!nav.subNav) {
            return (
              // NavItems with no subNav
              <NavItem key={"navItem_" + nav.navKey} {...others}>
                {title}
              </NavItem>
            );
          }

          return (
            // If NavItem has a subNav, wrap it in a new Nav
            <Nav
              key={"nav_" + nav.navKey}
              styleName={cx("nav")}
              collapsed={collapsed}
              onClick={onClick}
            >
              {/* The following NavItem component is the parent for a collapsible group. */}
              <NavItem key={"navItem_" + nav.navKey} {...others}>
                {title}
              </NavItem>
              {nav.subNav.map(subNav => {
                const { ...otherArgs } = subNav;
                return (
                  <NavItem key={"navItem_" + subNav.navKey} {...otherArgs}>
                    {subNav.title}
                  </NavItem>
                );
              })}
            </Nav>
          );
        })}
      </Nav>
    );
  };

  render() {
    const {
      children,
      className,
      data,
      ignoreActive,
      style,
      subNav
    } = this.props;
    let styleName;
    if (data) {
      return this._buildNavByData();
    }
    // Avoid to append styleName to ul if rendering from json data.
    styleName =
      className.indexOf("ra_Nav__nav") === -1 ? { "styleName": cx("nav") } : {};
    return (
      <ul {...styleName} className={className} style={style}>
        {React.Children.map(children, (child, index) => {
          let active = false;
          if (
            (child.props.active ||
              child.props.navKey === this.state.activeIndex) &&
            !ignoreActive
          ) {
            active = true;
          }
          // Render a child Nav component with children, mark it as subNav
          if (typeof child.props.children === "object") {
            return cloneElement(child, {
              "activeIndex": this.state.activeIndex,
              "subNav": true,
              "onClick": this._handleClick,
              "ignoreActive": ignoreActive
            });
          }
          let isParent = subNav && index === 0;
          // Render NavItem components, adding subNav and parent identifiers accordingly
          return cloneElement(child, {
            "subNav": subNav && !isParent,
            "parent": isParent,
            "collapsed": this.state.collapsed,
            active,
            "onClick": isParent ? this._handleCollapse : this._handleClick
          });
        })}
      </ul>
    );
  }
}

Nav.propTypes = {
  /** Define index of active NavItem component in the Nav. */
  "activeIndex": PropTypes.number,
  /** Child elements, typically NavItem component or Nav for grouping sub-NavItems. */
  "children": PropTypes.node,
  /** An object, array, or string of CSS classes to apply to Nav.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /** Define Nav container is collapsed or not when initialization, normally used in sub-Nav. */
  "collapsed": PropTypes.bool,
  /** Json object which describes the shape of nav menu for rendering Nav menu. */
  "data": PropTypes.array,
  /** Set to true if you intend to set an active style externally. */
  "ignoreActive": PropTypes.bool,
  /** Function that will be executed when onClick event occurs. */
  "onClick": PropTypes.func,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /** Set true If is a sub-Nav container, not a public prop.
   * @ignore
   */
  "subNav": PropTypes.bool
};

Nav.defaultProps = {
  "className": "",
  "collapsed": false,
  "data": null,
  "ignoreActive": false
};

export default CSSModules(Nav, styles, { "allowMultiple": true });
