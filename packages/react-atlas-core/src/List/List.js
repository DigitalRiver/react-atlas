import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class List extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { border, children, className, id, style } = this.props;

    const listStyles = cx({
      "list": true,
      border
    });

    return (
      <div id={id} style={style} className={className} styleName={listStyles}>
        {children}
      </div>
    );
  }
}

List.propTypes = {
  /** When true, List will display an outer border. */
  "border": PropTypes.bool,
  /**
   * Text, any HTML element, or React Component.
   */
  "children": PropTypes.node,
  /** An object, array, or string of CSS classes to apply to Input. */
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Will set the html "id" property for List.
   */
  "id": PropTypes.string,
  /** Pass inline styling here. */
  "style": PropTypes.object
};

List.defaultProps = {
  "border": false
};

export default List;
