import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./Panel.css";

export class Panel extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const panelStyles = cx({
      "panel": true
    });
    const { className, children, style } = this.props;
    return (
      <div style={style} className={cx(className)} styleName={panelStyles}>
        {children}
      </div>
    );
  }
}

Panel.propTypes = {
  /**
   * Text, any HTML element, or React Component.
   */
  "children": PropTypes.node,

  /** An object, array, or string of CSS classes to apply to Panel.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

export default CSSModules(Panel, styles, { "allowMultiple": true });
