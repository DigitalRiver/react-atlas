import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class BreadcrumbItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, style, active, children } = this.props;
    const styleName = cx("breadcrumbItem", { active });
    return (
      <li styleName={styleName} className={cx(className)} style={style}>
        {children}
      </li>
    );
  }
}

BreadcrumbItem.propTypes = {
  /** An object, array, or string of CSS classes to apply to BreadcrumbItem.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,
  /**
   * Text, any HTML element, or React Component.
   */
  "children": PropTypes.node,
  /**
   * Render active item style
   */
  "active": PropTypes.bool
};

BreadcrumbItem.defaultProps = {
  "className": "",
  "active": false
};

export default BreadcrumbItem;
