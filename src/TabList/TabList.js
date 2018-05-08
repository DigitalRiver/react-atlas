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
  };

  render() {
    const { className, children, vertical, style } = this.props;

    const tabs = React.Children.map(children, (child, index) => {
      child = cloneElement(child, {
        "tabIndex": index,
        "selected": this.state.selectedTab === index,
        "setSelectedTab": this._setSelectedTab,
        "vertical": vertical
      });

      return child;
    });

    let tabListClasses = cx(
      {
        vertical
      },
      "tabList"
    );

    return (
      <ul className={cx(className)} styleName={tabListClasses} style={style}>
        {tabs}
      </ul>
    );
  }
}

TabList.propTypes = {
    /**
     * Will be automatically set when bordered prop is passed to Tabs component.
     *
     * @ignore
     */
    "bordered": PropTypes.bool,

    /**
     * An object, array, or string of CSS classes to apply to TabPanel.
     */
    "className": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),

    /**
     * Tab components that will be displayed in TabList.
     */
    "children": PropTypes.node.isRequired,

    /**
     * Selected tab index (default 0 - first tab).
     */
    "selectedTab": PropTypes.number,

    /**
     * Handler to execute when a tab is selected, in Tabs component.
     */
    "setSelectedIndex": PropTypes.func,

    /** 
     * Pass inline styling here.
     */
    "style": PropTypes.object,

    /**
     * Will be automatically set when vertical prop is passed to Tabs component.
     */
    "vertical": PropTypes.bool
};

export default TabList;
