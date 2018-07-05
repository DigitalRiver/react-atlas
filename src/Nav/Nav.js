import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import styles from "./Nav.css";
import cx from "classnames";
import { NavItem } from "../NavItem";

export class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "activeIndex": props.activeIndex, // The index of selected menu item.
      "collapsed": props.collapsed // Whether or not sub-nav menu collapsed.
    };
  }

  componentWillReceiveProps(nextProps) {
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
  _buildNavByData = () => {
    const { className, style, data } = this.props;
    return (
      <Nav
        styleName={cx("nav")}
        className={className}
        style={style}
        activeIndex={this.state.activeIndex}
      >
        {data.map(nav => {
          const { navKey, title, collapsed } = nav;
          if (!nav.subNav) {
            return (
              <NavItem key={`nav_${navKey}`} navKey={navKey}>
                {title}
              </NavItem>
            );
          }
          return (
            <Nav
              key={`nav_${navKey}`}
              styleName={cx("nav")}
              activeIndex={this.state.activeIndex}
              collapsed={collapsed}
            >
              <NavItem navKey={navKey}>{title}</NavItem>
              {nav.subNav.map(subNav => 
                <NavItem key={`sub_${subNav.navKey}`} navKey={subNav.navKey}>
                  {subNav.title}
                </NavItem>
              )}
            </Nav>
          );
        })}
      </Nav>
    );
  };

  render() {
    const { className, style, children, subNav, data } = this.props;
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
            child.props.active ||
            child.props.navKey === this.state.activeIndex
          ) {
            active = true;
          }
          if (child.type.name === "Nav" || child.type.displayName === "Nav") {
            return cloneElement(child, {
              "activeIndex": this.state.activeIndex,
              "subNav": true,
              "onClick": this._handleClick
            });
          }
          let isParent = subNav && index === 0;

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
  "data": null,
  "collapsed": false
};

export default CSSModules(Nav, styles, { "allowMultiple": true });
