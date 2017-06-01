/** GridRow.js mostly taken and inspired from Elemental UI.
 * used for Grid functionality
 * Copyright (c) 2016 Thinkmill Pty Ltd
 */

import React, { PropTypes } from "react";
import blacklist from "blacklist";
import A from "../constants";
import cx from "classNames";

/**
 * Component that handles Row part of a Grid system. Syntax is somewhat similar to bootstrap's grid class syntax.
 */
const GridRow = ({ gutter, className, ...props }) => {
  const rowStyle = {
    "display": "flex",
    "flexWrap": "wrap",
    "msFlexWrap": "wrap",
    "WebkitFlexWrap": "wrap",
    "marginLeft": gutter / -2,
    "marginRight": gutter / -2
  };

  const styles = blacklist(props, "className", "gutter", "style");

  return (
    <div
      styleName={cx(styles, rowStyle)}
      className={cx(className)}
    />
  );
};

GridRow.propTypes = {
  "children": PropTypes.node,
  /**
   * input a css class name
   */
  "className": PropTypes.string,
  "gutter": PropTypes.number,
  "style": PropTypes.object
};

GridRow.defaultProps = { "gutter": A.width.gutter };

export default GridRow;
