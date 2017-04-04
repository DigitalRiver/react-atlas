import React, { Component, PropTypes } from "react";
import cx from 'classNames';

/*
 * A CSS driven tooltip that gives more information when an element it wraps is hovered over.
 */
class Tooltip extends Component {
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

Tooltip.styleguide = {
  "category": "Layout",
  "index": "4.11",
  "example": 
    `
 <section>
  <h5>Tooltip</h5>
  <p>Gives information on :hover</p>
  <Tooltip tooltip="Floating Tooltip" >
    <Button></Button>
  </Tooltip>
  <Tooltip tooltip="Tooltip on disabled item doesn't show">
    <Button disabled></Button>
  </Tooltip>
  <br />
  <br />
  <Tooltip tooltip="Input tooltip" position="top" label="hello" type="text">
    <Input label="hello" type="text" />
  </Tooltip>
  <p>Lorem ipsum dolor sit amet, <Tooltip tooltip="Tooltip inside a sentence" inline><strong>consectetur</strong></Tooltip> adipiscing elit.</p>
</section>
`
  
};

export default Tooltip;
