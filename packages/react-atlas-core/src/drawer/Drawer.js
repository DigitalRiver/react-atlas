import React, { PropTypes } from "react";
import { OverlayCore } from "../index.js";
import cx from "classNames";

const Drawer = ({ active, className, type, onOverlayClick, ...props }) => {
  const classes = cx(
    { "container": true, "left": type === "left", "right": type === "right", active }
  );

  return (
    <OverlayCore active={active} onClick={onOverlayClick}>
      <div styleName={cx(classes)} className={className}>
        <aside>
          {props.children}
        </aside>
      </div>
    </OverlayCore>
  );
};

Drawer.propTypes = {
  "active": React.PropTypes.bool,
  "children": React.PropTypes.node,
  "className": React.PropTypes.string,
  "onOverlayClick": React.PropTypes.func,
  "type": React.PropTypes.oneOf(["left", "right"])
};

Drawer.defaultProps = { "active": false, "className": "", "type": "left" };

export default Drawer;
