import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Panel extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, children, style } = this.props;
    return (
      <div style={style} className={cx(className)}>
        {children}
      </div>
    );
  }
}

Panel.propTypes = {
  /** An Object, array, or string of CSS classes to apply to Panel.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Text to be displayed can be passed as a child.
   * @examples '<Panel>This is a text hint</Panel>'
   */
  "children": PropTypes.node,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

export default Panel;
