import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Hint extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, children, text, style } = this.props;

    return text ? (
      <span style={style} className={cx(className)} styleName={cx("hintLabel")}>
        {text}
      </span>
    ) : (
      <span className={cx(className)} styleName={cx("hintLabel")}>
        {children}
      </span>
    );
  }
}

Hint.propTypes = {
  /**
   * Defines a custom css class name.
   * @examples '<Hint className="custom">This is a text hint</Hint>'
   */
  className: PropTypes.string,
  /**
   * Text to be displayed can be passed as a child.
   * @examples '<Hint>This is a text hint</Hint>'
   */
  children: PropTypes.node,
  /**
   * Text to be displayed (will override children if passed).
   * @examples '<Hint text="This is a text hint"/>'
   */
  text: PropTypes.string,

  /* Pass inline styles here. */
  style: PropTypes.node
};

Hint.defaultProps = {
  className: ""
};

export default Hint;
