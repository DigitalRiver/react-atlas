import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/*
 * A CSS driven tooltip that gives more information when an element it wraps is hovered over.
 */
class Tooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      "tooltip": props.text,
      "position": props.position,
      "icon": props.icon,
      "delay": props.delay || null,
      "active": false
    };
  }

  _active = focus => {
    if (focus === true) {
      if (!this.props.delay) {
        this.setState({
          "active": true
        });
      } else {
        setTimeout(() => {
          this.setState({
            "active": true
          });
        }, this.props.delay);
      }
    } else {
      this.setState({
        "active": false
      });
    }
  };

  render() {
    const { children, className, icon, position, style } = this.props;

    let tooltipClasses;
    tooltipClasses = cx({
      "tooltip": true,
      "active": this.state.active,
      "tooltip-top":
        position !== "left" && position !== "bottom" && position !== "right",
      "tooltip-left": position === "left",
      "tooltip-bottom": position === "bottom",
      "tooltip-right": position === "right"
    });

    let TooltipContainer = this.state.active ? 
      <span className={"ra_Tooltip__tooltipContent"}>{this.state.tooltip}</span>
     : null;

    let Icon = icon && !children ? <i className={cx(icon)} /> : null;
    let componentClasses = cx("block", tooltipClasses);

    return (
      <div
        style={style}
        data-tooltip={this.state.tooltip}
        role="tooltip"
        styleName={componentClasses}
        className={cx(className)}
        onMouseEnter={e => {
          this._active(true, e);
        }}
        onMouseLeave={e => {
          this._active(false, e);
        }}
      >
        {TooltipContainer}
        {Icon}
        {children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  /**
   * For displaying all children which can include anything from Form to button to a custom icon like in the example.
   * @examples <GithubIcon />, <i className="fa fa-github"></i>
   */
  "children": PropTypes.any,
  /** An Object, array, or string of CSS classes to apply to Tooltip.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * For the text displayed within the tooltip
   * @examples <Tooltip text="default"/>
   */
  "text": PropTypes.string,
  /**
   *  For delay of tooltip message
   *  @example <Tooltip delay={10000}/>
   */
  "delay": PropTypes.number,
  /**
   * For disabling tooltip
   * @example <Tooltip disabled />
   */
  "disabled": PropTypes.bool,
  /**
   * For positioning the tooltip to top, left, right or bottom.  Default is top.
   * @example <Tooltip position="left"/>
   */
  "position": PropTypes.string,
  /**
   * For displaying an icon/glphyicon. Normally these will be another component or an element with a class on it.
   * @examples <GithubIcon />, <i class="fa fa-github"></i>
   */
  "icon": PropTypes.string,
  /** Pass inline styling here. */
  "style": PropTypes.object
};

Tooltip.defaultProps = {
  "className": "",
  "children": "",
  "icon": "fa fa-question-circle",
  "disabled": false,
  "text": "",
  "delay": null
};

export default Tooltip;
