import React, { cloneElement } from "react";
import PropTypes from 'prop-types';
import cx from "classnames";

const RadioGroup = ({ className, children, name, inline, ...props }) => {
  return (
    <div {...props} className={className} styleName={cx("radioGroup")}>
      {React.Children.map(children, child => {
        if (child.type.displayName === "Radio") {
          child = cloneElement(child, {
            name,
            inline
          });
        }

        return child;
      })}
    </div>
  );
};

RadioGroup.propTypes = {
  /**
   * Anything that can be in a radio group. Almost always radio components alone.
   * @examples '<RadioGroup><Radio/><Radio/></RadioGroup>'
   */
  "children": PropTypes.node,
  /**
   * Define a custom css class name.
   * @examples 'radioGroup', 'radio-group'
   */
  "className": PropTypes.string,
  /**
   * Form name for the element, this will set all Radio children the same form name (so they can't be selected at the same time).
   * @examples '<RadioGroup name="test"></RadioGroup>'
   */
  "name": PropTypes.string,
  /**
   * Defines if the radio group should display as an inline element.
   * @examples '<RadioGroup inline></RadioGroup>'
   */
  "inline": PropTypes.bool
};

export default RadioGroup;
