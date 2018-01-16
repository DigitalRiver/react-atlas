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
            selectedTab: this.props.selectedTab || 0
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
            style,
            ...props
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
    "children": PropTypes.node.isRequired
};

export default TabList;