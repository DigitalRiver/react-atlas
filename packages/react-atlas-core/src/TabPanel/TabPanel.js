import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * TabPanel component
 */
class TabPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            "selected": this.props.selected || false
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selected !== this.props.selected) {
            this.setState({ "selected": nextProps.selected })
        }
    }

    render() {
        const {
            className,
            children,
            bordered,
            vertical,
            style
        } = this.props;

        let tabPanelClasses = cx({
            "selected": this.state.selected,
            bordered,
            vertical
        },
        "tabPanel");

        return (
            <div
                className={cx(className)} 
                styleName={tabPanelClasses}
                style={style}
            >
                {children}
            </div>  
        )
    }
}

TabPanel.propTypes = {
    /**
     * An Object, array, or string of CSS classes to apply to Tabs.
     */
    "className": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),
    /**
     * Text or other elements (or components) to display as Tab content.
     */
    "children": PropTypes.node,
    /**
     * Indicates whether tab panel is selected or not.
     */
    "selected": PropTypes.bool,
    /**
     * Will be automatically set when bordered prop is passed to Tabs component.
     */
    "bordered": PropTypes.bool,
    /**
     * Will be automatically set when vertical prop is passed to Tabs component.
     */
    "vertical": PropTypes.bool,
    /** 
     * Pass inline styling here.
     */
    "style": PropTypes.object
};

export default TabPanel;