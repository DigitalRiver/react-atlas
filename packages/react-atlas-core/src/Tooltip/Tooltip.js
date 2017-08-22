import React from "react";
import PropTypes from 'prop-types';
import cx from 'classnames';

/*
 * A CSS driven tooltip that gives more information when an element it wraps is hovered over.
 */
class Tooltip extends React.PureComponent {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            "tooltip": props.tooltip,
            "position": props.position,
            "icon": props.icon,
            "delay": props.tooltipDelay || null,
            "active": false
        };
    }


    _active = (focus, event) => {
        if(focus === true) {
            if (!this.props.tooltipDelay) {
                this.setState({
                    "active": true
                });
            } else {
                setTimeout(() => {
                    this.setState({
                        "active": true
                    })
                }, this.props.tooltipDelay);
            }
        } else {
            this.setState({
                "active": false
            });
        }
    }

    render() {
        const {
            children,
            className,
            icon,
            position,
            tooltip,
            tooltipDelay
        } = this.props;

        let tooltipClasses;
        tooltipClasses = cx({
            "tooltip": this.state.active,
            "tooltip-bottom":
              position !== "left" && position !== "top" && position !== "right"
            ,
            "tooltip-left": position === "left",
            "tooltip-top": position === "top",
            "tooltip-right": position === "right"
        });

        let Tooltip = this.state.active ? <span>{this.state.tooltip}</span> : null ;

        let Icon = icon && !children ? <i className={cx(icon)} /> : null;

        return (
            <div data-tooltip={this.state.tooltip}
              styleName={'block ' + tooltipClasses}
              onMouseEnter ={(e) => {
                this._active(true, e);
              }}
              onMouseLeave={(e) => {
                this._active(false, e);
              }}
            >

            {Tooltip}
            {Icon}
            {children}
          </div>
        )
    }
}

Tooltip.propTypes = {
    /**
     * For displaying all children which can include anything from Form to button to a custom icon like in the example.
     * @examples <GithubIcon />, <i className="fa fa-github"></i>
     */
    "children": PropTypes.any,
    /**
     * For using unique classes in components
     * @examples <i className="fa fa-github"></i>
     */
    "className": PropTypes.string,
    /**
     * For the text displayed within the tooltip
     * @examples <Tooltip tooltip="default"/>
     */
    "tooltip": PropTypes.string,
    /**
     *  For delay of tooltip message
     *  @example <Tooltip tooltipDelay={10000}/>
     */
    "tooltipDelay": PropTypes.number,
    /**
     * For disabling tooltip
     * @example <Tooltip disabled />
     */
    "disabled": PropTypes.bool,
    /**
     * For positioning the tooltip to top, left, right or bottom.  Default is to the bottom
     * @example <Tooltip position="top"/>
     */
    "position": PropTypes.string,
    /**
     * For displaying an icon/glphyicon. Normally these will be another component or an element with a class on it.
     * @examples <GithubIcon />, <i class="fa fa-github"></i>
     */
    "icon": PropTypes.string

};

Tooltip.defaultProps = {
    "className": "",
    "children": "",
    "icon": "fa fa-info-circle",
    "disabled": false,
    "tooltip": "",
    "tooltipDelay": null
};

export default Tooltip;
