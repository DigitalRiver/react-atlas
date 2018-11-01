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
      "collapsed": props.collapsed, // Whether or not sub-nav menu collapsed.
      "subNavItemHeight": 0, // the NavItem's height in subNav
      "subNavItemMaxWidth": 0
    };
    this.subNavItemRef = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
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

  _setDimension = (height, width) => {
    console.log("height", height);
    console.log("width", width);
    if (width > 0 && width > this.state.subNavItemMaxWidth) {
      this.setState({
        "subNavItemHeight": height,
        "subNavItemMaxWidth": width
      });
    } else {
      this.setState({
        "subNavItemHeight": height
      });
    }
  };

  // use this ternary helper to avoid nested ternary in JSX
  // not working for _buidNavByData
  widthStyleTernaryHelper = (cond1, cond2, child, index, data) => {
    let tempIndex = index;
    if (cond1 && cond2) {
      if (data) {
        tempIndex += 2;
      }
      return {
        "transform": `translateY(${(tempIndex - 1) *
          this.state.subNavItemHeight}px)`,
        "width": `${this.state.subNavItemMaxWidth}px`,
        ...child.style
      };
    } else if (cond1 && !cond2) {
      if (data) {
        tempIndex += 2;
      }
      return {
        "transform": `translateY(${(tempIndex - 1) *
          this.state.subNavItemHeight}px)`,
        ...child.style
      };
    } else {
      return child.style;
    }
  };

  _buildNavByData = data => {
    const {
      className,
      ignoreActive,
      onClick,
      style,
      subNav,
      horizontal
    } = this.props;
    return (
      <Nav
        styleName={
          horizontal && typeof subNav === "undefined"
            ? cx("nav", "horizontal")
            : cx("nav")
        }
        className={className}
        style={style}
        activeIndex={this.state.activeIndex}
        onClick={onClick}
        ignoreActive={ignoreActive}
        horizontal={horizontal}
      >
        {data.map(nav => {
          const { title, collapsed, ...others } = nav;
          if (nav.subNavArray) {
            return (
              // If NavItem has a subNav, wrap it in a new Nav
              <Nav
                key={"nav_" + nav.navKey}
                styleName={
                  horizontal && typeof subNav === "undefined"
                    ? cx("nav", "horizontal")
                    : cx("nav")
                }
                collapsed={collapsed}
                onClick={onClick}
                horizontal={horizontal}
              >
                {/* The following NavItem component is the parent for a collapsible group. */}
                <NavItem
                  key={"navItem_" + nav.navKey}
                  horizontal={horizontal}
                  {...others}
                >
                  {title}
                </NavItem>
                {nav.subNavArray.map((subNavbar, index) => {
                  const { ...otherArgs } = subNavbar;
                  return (
                    <NavItem
                      key={"navItem_" + subNavbar.navKey}
                      horizontal={horizontal}
                      ref={horizontal && subNav ? this.subNavItemRef : null}
                      style={this.widthStyleTernaryHelper(
                        true,
                        true,
                        subNavbar,
                        index,
                        true
                      )}
                      {...otherArgs}
                    >
                      {subNavbar.title}
                    </NavItem>
                  );
                })}
              </Nav>
            );
          } else {
            return (
              // NavItems with no subNav
              <NavItem
                key={"navItem_" + nav.navKey}
                horizontal={horizontal}
                {...others}
              >
                {title}
              </NavItem>
            );
          }
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
      subNav,
      horizontal
    } = this.props;
    let styleName;
    if (data) {
      return this._buildNavByData(data);
    }
    // Avoid to append styleName to ul if rendering from json data.
    styleName =
      className.indexOf("ra_Nav__nav") === -1
        ? horizontal && typeof subNav === "undefined"
          ? { "styleName": cx("nav", "horizontal") }
          : { "styleName": cx("nav") }
        : {};

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
              "ignoreActive": ignoreActive,
              horizontal
            });
          }
          let isParent = subNav && index === 0;
          // Render NavItem components, adding subNav and parent identifiers accordingly
          return cloneElement(child, {
            "subNav": subNav && !isParent,
            "parent": isParent,
            "collapsed": this.state.collapsed,
            active,
            "onClick": isParent ? this._handleCollapse : this._handleClick,
            horizontal,
            "ref": horizontal && !isParent && subNav ? this.subNavItemRef : null,
            "dimension": this._setDimension,
            "style": this.widthStyleTernaryHelper(
              horizontal && !isParent && subNav,
              horizontal &&
                !isParent &&
                subNav &&
                this.state.subNavItemMaxWidth > 0,
              child.props,
              index,
              false
            )
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
  /** Function that will be executed when onClick event occurs.
   * @ignore
   * */
  "onClick": PropTypes.func,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /** Set true If is a sub-Nav container, not a public prop.
   * @ignore
   */
  "subNav": PropTypes.bool,
  /** Define whether the Nav is vertical or horizontal, Nav is vertical by default */
  "horizontal": PropTypes.bool
};

Nav.defaultProps = {
  "className": "",
  "collapsed": false,
  "data": null,
  "ignoreActive": false,
  "horizontal": false
};

export default CSSModules(Nav, styles, { "allowMultiple": true });
