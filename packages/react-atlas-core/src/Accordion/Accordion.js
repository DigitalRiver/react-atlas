import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Avatar component creates a circular area where an image, letter or icon/glyphicon can be presented. Great for user profiles and lists.
 *
 * **NOTE**: children will always take precedence over props passed into component.
 */
class Accordion extends React.PureComponent {
    constructor(props) {
        super(props);

        // array used to set the activeChildArray value for each child for expanding purposes
        let childArray = [];

        // loop through children and set childArray depending on if expanded prop was set on child.  If not set this defaults to false
        let childCount = React.Children.map(this.props.children, (child, i) => {
            if(child.props.expanded){
                childArray.push(true);
            } else {
                childArray.push(false);
            }
        })

        // component state
        this.state = {
            title: props.title,
            activeChildArray: childArray,
            expandAll: this.props.expandAll || false,
            expand: false,
            multiOpen: this.props.multiOpen || false
        };
    }

    // click handler for header.  Sets activeChildArray value accordingly to expand and collapse the panels
    _click = (idx) => {
        let newChildArray = [];
        for(var i = 0; i < this.state.activeChildArray.length; i++) {
            if(i === idx) {
                newChildArray.push(!this.state.activeChildArray[i])
            } else if (!this.state.multiOpen){
                newChildArray.push(false)
            } else {
                newChildArray.push(this.state.activeChildArray[i])
            }
        }
        this.setState({
            activeChildArray: newChildArray,
        });
    };

    // expandAll function to expand all panels.  Sets value of all to true in activeChildArray
    _expandAll = () => {
        let newChildArray = [];
        for(var i = 0; i < this.state.activeChildArray.length; i++) {
            newChildArray.push(!this.state.expand);
        }
        this.setState({
            activeChildArray: newChildArray,
            expand: !this.state.expand
        });
    }

    render() {
        let { className, children, title, width, disabled, titlePosition, style } = this.props;

        // activeClass is added to activ
        let stateClasses, styleClasses, headerClasses, panelClasses;

        styleClasses = cx({
            "leftAlign": titlePosition !== "right" && titlePosition !== "center",
            "rightAlign": titlePosition === "right",
            "centerAlign": titlePosition === "center"
        });

        // A list of children of the Accordion component
        const accordion_panels = React.Children.map(children, (child, i) => {
            if(this.state.activeChildArray[i] === true && !this.props.disabled){
                stateClasses = cx(
                    'active'
                );
            } else if(this.props.disabled) {
                stateClasses = cx(
                    'disabled'
                );
            } else {
                stateClasses = cx(
                    'inactive'
                );
            }

            headerClasses = cx("accordion_header", stateClasses, styleClasses);
            panelClasses = cx("accordion_panel", stateClasses);

            let accordion_panel = (
                <div>
                    <div
                        styleName={headerClasses}
                        onClick={() => {
                            this._click(i);
                        }}>
                            {child.props.title}
                    </div>
                    <div styleName={panelClasses}>{child}</div>
                </div>
            );
            return accordion_panel;
        });

        return (
            <div style={style}>
                { this.state.expandAll && !this.props.disabled ? <div styleName={"expandAll"} onClick={() => {this._expandAll()}}>Expand All</div> : null }
                <div styleName={"accordion"} style={{ width: width + "px" }}>
                    {accordion_panels}
                </div>
            </div>
        );
    }
}

Accordion.propTypes = {
    /**
     * Children should be either a string, an icon/glyphicon, or an image tag.
     * @examples "SomeName", <Accordion>{child}{child}</Accordion>
     */
    children: PropTypes.node,
    /**
     *
     */
    className: PropTypes.string,
    /**
     * A string. Accordion will use title prop from each child as the title for header of each accordion
     * @examples <Accordion><div title={title 1}>value 1</div><div title={title 2}>value 2</div></Accordion>
     */
    title: PropTypes.string,
    /**
     * multiOpen
     * boolean property.  Accordion will allow multiple open panels with this set to true
     * @examples <Accordion multiOpen={true}>{children}</Accordion>
     */
    multiOpen: PropTypes.bool,
    /**
     * expandAll
     * boolean property.  Accordion will add an "expand all" link which when clicked open all panels or collapse all panels
     * @examples <Accordion expandAll={true}>{children}</Accordion>
     */
    expandAll: PropTypes.bool,
    /**
     * expanded
     * boolean property.  Accordion will expand this child on load
     * @examples <Accordion><div>value 1</div><div expanded>value 2</div></Accordion>
     */
    expanded: PropTypes.bool,
    /**
     * titlePosition
     * string property. Accordion will set the title text position based on this property
     * @examples <Accordion titlePosition={left}>{children}</Accordion>
     */
    titlePosition: PropTypes.string
};

Accordion.defaultProps = {
    width: "300",
    disabled: false
};

export default Accordion;