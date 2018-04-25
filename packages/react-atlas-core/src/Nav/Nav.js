import React, { cloneElement } from "react";
import PropTypes from "prop-types";

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "activeIndex": props.activeIndex,
      "collapsed": props.collapsed
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

  render() {
    const { className, style, children, subNav } = this.props;
    return (
      <ul styleName="nav" className={className} style={style}>
        {React.Children.map(children, (child, index) => {
          let active = false;
          if (
            child.props.active ||
            child.props.navKey === this.state.activeIndex
          ) {
            active = true;
          }
          if (child.type.name === "Nav") {
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
  /**
   * Define the selected NavItem component in the Nav.
   */
  "activeIndex": PropTypes.number,
  /**
   * Child elements, typically NavItem component or Nav for grouping sub-NavItems.
   */
  "children": PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to Nav.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Define Nav container is collapsed or not when initialization, normally used in sub Nav.
   */
  "collapsed": PropTypes.bool,

  /**
   * Function that will be executed when onClick event occurs.
   * @examples '<Nav onClick={onClickHandler}/>'
   */
  "onClick": PropTypes.func,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,

  /**
   * Set true If is a sub-Nav container.
   *
   * @ignore
   */
  "subNav": PropTypes.bool
};

export default Nav;
