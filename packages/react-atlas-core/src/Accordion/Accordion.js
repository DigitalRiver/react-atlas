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
            expanded: false,
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
            newChildArray.push(!this.state.expanded);
        }
        this.setState({
            activeChildArray: newChildArray,
            expanded: !this.state.expanded
        });
    }

    render() {
        let { className, children, title, accordionWidth } = this.props;

        // activeClass is added to activ
        let activeClass;

        // A list of children of the Accordion component
        const accordion_panels = React.Children.map(children, (child, i) => {

            if(this.state.activeChildArray[i] === true){
                activeClass = cx({
                    ra_accordion__active: true
                });
            } else {
                activeClass = "";
            }

            let accordion_panel = (
                <div>
                    <div
                        styleName={"accordion_header"}
                        className={activeClass}
                        onClick={() => {
                            this._click(i);
                        }}>
                            {child.props.title}
                    </div>
                    <div styleName={"accordion_panel"} className={activeClass}>{child}</div>
                </div>
            );
            return accordion_panel;
        });

        return (
            <div>
                { this.state.expandAll ? <div styleName={"expandAll"} onClick={() => {this._expandAll()}}>Expand All</div> : null }
                <div styleName={"accordion"} style={{ width: accordionWidth + "px" }}>
                    {accordion_panels}
                </div>
            </div>
        );
    }
}

Accordion.propTypes = {
    /**
     * Children should be either a string, an icon/glyphicon, or an image tag.
     * @examples "SomeName", <SomeIcon />, <img src="/path/to/image.jpg"/>
     */
    children: PropTypes.node,
    /**
     *
     */
    className: PropTypes.string,
    /**
     * A string. Accordion will use First letter of the string.
     * @examples "Nathan" will output "N"
     */
    title: PropTypes.string
};

Accordion.defaultProps = {
    accordionWidth: "300",
    disabled: false
};

export default Accordion;