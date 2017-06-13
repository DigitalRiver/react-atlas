import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';

/*
 * A CSS driven tooltip that gives more information when an element it wraps is hovered over.
 */
class Tooltip extends React.Component {
  render() {
    const { children, position, tooltip, inline, ...other } = this.props;

    let tooltipClasses;
    if (!children.props.disabled) {
      tooltipClasses = cx({
        "tooltip": true,
        "tooltip-top": 
          position !== "left" && position !== "bottom" && position !== "right"
        ,
        "tooltip-left": position === "left",
        "tooltip-bottom": position === "bottom",
        "tooltip-right": position === "right"
      });
    }
    tooltipClasses = tooltipClasses ? tooltipClasses : [];

    const element = inline ? "span" : "div";

    let props = {
      "data-tooltip": tooltip
    };

    return (
      <div {...props} styleName={'block ' + tooltipClasses}>
        {children}
      </div>
    )
  }
}

Tooltip.propTypes = {
  "inline": PropTypes.bool,
  "children": PropTypes.any,
  "className": PropTypes.string,
  "tooltip": PropTypes.string,
  "tooltipDelay": PropTypes.number,
  "tooltipHideOnClick": PropTypes.bool,
  "position": PropTypes.string
};

Tooltip.defaultProps = {
  "className": "",
  "children": <p>This is some text with tooltip</p>,
  "tooltip": "Sample Tooltip Text",
  "theme": {
    "block": true
  }
};

export default Tooltip;
