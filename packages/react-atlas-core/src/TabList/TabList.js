import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * TabList component
 */
class TabList extends React.PureComponent {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            "selectedTab": this.props.selectedTab || 0
        };
    }

    _setSelectedTab = (index, event) => {
        this.setState({ "selectedTab": index });
        this.props.setSelectedIndex(index, event);
    }

    render() {
        const {
            className,
            children,
            vertical,
            style
        } = this.props;

        const tabs = React.Children.map(children, (child, index) => {
            child = cloneElement(child, {
                "tabIndex": index,
                "selected": this.state.selectedTab === index,
                "setSelectedTab": this._setSelectedTab,
                "vertical": vertical
            });

            return child;
        });

        let tabListClasses = cx({
            vertical
        },
        "tabList");
        
        return (
            <ul 
                className={cx(className)}
                styleName={tabListClasses}
                style={style}
            >
                {tabs}
            </ul>
        )
    }
}

TabList.propTypes = {
    /**
     * An Object, array, or string of CSS classes to apply to Tabs.
     */
    "className": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),
    /**
     * All the tabs.
     */
    "children": PropTypes.node.isRequired,
    /** 
     * Pass inline styling here.
     */
    "style": PropTypes.object,
    /**
     * Will be automatically set when vertical prop is passed to Tabs component.
     */
    "vertical": PropTypes.bool,
    /**
     * Selected tab index (default 0 - first tab).
     */
    "selectedTab": PropTypes.number,
    /**
     * Handler to execute when a tab is selected, in Tabs component.
     */
    "setSelectedIndex": PropTypes.func
};

export default TabList;