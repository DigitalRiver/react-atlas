import React, { PropTypes, cloneElement } from "react";
import cx from "classNames";

const CheckboxGroup = ({ className, children, name, inline, ...props }) => {
  return (
    <div {...props} className={className} styleName={cx("checkboxGroup")}>
      <h3>{name}</h3>
      {React.Children.map(children, child => {
        if (child.type.displayName === "Checkbox") {
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

CheckboxGroup.propTypes = {
  /**
   * Anything that can be in a checkbox group. Typically only includes Checkbox components and a header.
   * @examples '<CheckboxGroup><Checkbox/><Checkbox/></CheckboxGroup>'
   */
  "children": PropTypes.node,
  /**
   * Define a custom css class name.
   * @examples 'checkboxGroup', 'checkbox-group'
   */
  "className": PropTypes.string,
  /**
   * Form name for the element, this will set all Checkbox children the same form name.
   * @examples '<CheckboxGroup name="test"></CheckboxGroup>'
   */
  "name": PropTypes.string,
  /**
   * Defines if the checkbox group should display as an inline element.
   * @examples '<CheckboxGroup inline></CheckboxGroup>'
   */
  "inline": PropTypes.bool
};

export default CheckboxGroup;
