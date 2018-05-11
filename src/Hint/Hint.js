import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./Hint.css";

export class Hint extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, children, text, style } = this.props;

    return text ? 
      <span style={style} className={cx(className)} styleName={"hintLabel"}>
        {text}
      </span>
     : 
      <span className={cx(className)} styleName={"hintLabel"}>
        {children}
      </span>
    ;
  }
}

Hint.propTypes = {
  /**
   * Text to be displayed can be passed as a child.
   * @examples '<Hint>This is a text hint</Hint>'
   */
  "children": PropTypes.node,
  /** An object, array, or string of CSS classes to apply to Hint.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Text that will be displayed (will override children if passed).
   * @examples '<Hint text="This is a text hint"/>'
   */
  "text": PropTypes.string,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

Hint.defaultProps = {
  "className": ""
};

export default CSSModules(Hint, styles, { "allowMultiple": true });
