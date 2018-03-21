import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Breadcrumb extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, style, children } = this.props;

    return (
      <ol
        styleName="breadcrumb"
        className={cx(className)}
        style={style}
        role="navigation"
        aria-label="breadcrumbs"
      >
        {children}
      </ol>
    );
  }
}

Breadcrumb.propTypes = {
  /** An object, array, or string of CSS classes to apply to Breadcrumb.*/
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
   * BreadcrumbItem instances.
   */
  "children": PropTypes.node
};

Breadcrumb.defaultProps = {
  "className": ""
};

export default Breadcrumb;
