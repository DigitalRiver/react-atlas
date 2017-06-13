import React from "react";
import PropTypes from 'prop-types';
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
  "active": PropTypes.bool,
  "children": PropTypes.node,
  "className": PropTypes.string,
  "onOverlayClick": PropTypes.func,
  "type": PropTypes.oneOf(["left", "right"])
};

Drawer.defaultProps = { "active": false, "className": "", "type": "left" };

export default Drawer;
