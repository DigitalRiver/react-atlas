import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class ListGroup extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, className, divider, id, style, title } = this.props;

    const groupStyles = cx({
      divider
    });

    return (
      <div id={id} style={style} className={className} styleName={groupStyles}>
        <div styleName="groupTitle">{title}</div>
        {children}
      </div>
    );
  }
}

ListGroup.propTypes = {
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
  /** When true, will add a horizontal rule between the ListGroup and subsequent children. */
  "divider": PropTypes.bool,
  /**
   * Will set the html "id" property for ListGroup.
   */
  "id": PropTypes.string,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /** Will add a title to the ListGroup. */
  "title": PropTypes.string
};

ListGroup.defaultProps = {
  "divider": true
};

export default ListGroup;
