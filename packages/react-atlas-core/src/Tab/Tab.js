import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Tab component
 */
class Tab extends React.PureComponent {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            "selected": this.props.selected,
            "disabled": this.props.disabled
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selected !== this.props.selected) {
            this.setState({ "selected": nextProps.selected })
        }
    }

    _handleClick = event => {
        let selected = this.props.tabIndex;

        if (!this.state.disabled) {
            this.props.setSelectedTab(selected, event);
        }
    }

    render() {
        const {
            className,
            children,
            vertical,
            icon,
            style
        } = this.props;

        let tabClasses = cx({
            "tab": !vertical,
            "vTab": vertical,
            "selected": this.state.selected && !vertical,
            "vSelected": this.state.selected && vertical,
            "disabled": this.state.disabled
        });

        return (
            <li 
                className={cx(className)}
                styleName={tabClasses}
                style={style}
                onClick={this._handleClick}
            >
                {icon ? <i className={cx(icon, "ra_Tab__icon-left")} /> : null}
                {children}
            </li>
        )
    }
}

Tab.propTypes = {
    /**
     * An Object, array, or string of CSS classes to apply to Tabs.
     */
    "className": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),
    /**
     * Text or other elements to display as Tab title.
     */
    "children": PropTypes.node,
    /**
     * Indicates whether tab is selected or not.
     */
    "selected": PropTypes.bool,
    /**
     * Disable this tab which will make it not do anything when clicked.
     */
    "disabled": PropTypes.bool,
    /**
     * Will be automatically set when vertical prop is passed to Tabs component.
     */
    "vertical": PropTypes.bool,
    /** 
     * Pass inline styling here.
     */
    "style": PropTypes.object,
    /**
     * Tab index.
     */
    "tabIndex": PropTypes.number.isRequired,
    /**
     * Adds font-awesome icon to left of title
     */
    "icon": PropTypes.string,
    /**
     * Handler to be executed when a tab is selected (takes into account other tabs)
     */
    "setSelectedTab": PropTypes.func.isRequired
};

Tab.defaultProps = {
    "selected": false,
    "disabled": false
};

export default Tab;