import React from "react";
import PropTypes from 'prop-types';
import { OverlayCore } from "../index.js";
import cx from 'classNames';

const Dialog = (
  { body, active, type, children, className, onOverlayClick, ...props }
) => {
  const componentClasses = cx({
    "inactive": !active,
    type,
    active,
    className
  });

  return (
    <OverlayCore {...props} className={componentClasses} active={active} onClick={onOverlayClick}>
      <div>
        <section className={body}>
          {children}
        </section>
      </div>
    </OverlayCore>
  );
};

Dialog.propTypes = {
  /**
   * defines if Dialog modal is active/open/popped-up.
   */
  "active": PropTypes.bool,
  /**
   * The content inside the modal
   */
  "children": PropTypes.node,
  "className": PropTypes.string,
  /**
   * Defines what should happen when someone clicks off of the Modal box
   */
  "onOverlayClick": PropTypes.func,
  /**
   * What type/size of modal. Choose from 'small', 'normal', 'large'.
   */
  "type": PropTypes.oneOf(["large", "small", "normal"]),
  "body": PropTypes.string
};

Dialog.defaultProps = { "active": false, "type": "normal", "className": "" };

export default Dialog;
