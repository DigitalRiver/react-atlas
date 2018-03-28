import React from "react";
import PropTypes from "prop-types";

class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      id,
      leftItem,
      onClick,
      rightItem,
      style
    } = this.props;

    return (
      <div
        id={id}
        style={style}
        className={className}
        styleName="listItem"
        onClick={onClick}
      >
        {leftItem && <div styleName="inlineBlock">{leftItem}</div>}
        <div styleName="inlineBlock">{children}</div>
        {rightItem && <div styleName="rightItem">{rightItem}</div>}
      </div>
    );
  }
}

ListItem.propTypes = {
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
   * Will set the html "id" property for ListItem.
   */
  "id": PropTypes.string,
  /** Text, any HTML element, or React Component. */
  "leftItem": PropTypes.node,
  /** Click event handler for the ListItem. */
  "onClick": PropTypes.function,
  /** Text, any HTML element, or React Component. */
  "rightItem": PropTypes.node,
  /** Pass inline styling here. */
  "style": PropTypes.object
};

ListItem.defaultProps = {};

export default ListItem;
