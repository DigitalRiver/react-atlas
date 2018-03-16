import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Tabs component
 */
class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      "selectedIndex": this.props.selectedIndex
    };
  }

  _setSelectedIndex = (index, event) => {
    this.setState({ "selectedIndex": index });

    if (this.props.onSelect) {
      this.props.onSelect(index, event);
    }
  };


    render() {
      const {
          className,
          children,
          vertical,
          bordered,
          style
      } = this.props;

      const tabsChildren = React.Children.map(children, (child, index) => {

        child = cloneElement(child, {
          // todo
          // there was once logic here to do these separately based on component name via utils.getComponentName,
          // but webpack was changing the names so they were all named "t" in prod builds.
          // This is a workaround for now so that Tabs won't break, but we should come back and
          // find a better solution later so we don't have to send unnecessary props to components,
          // and probably remove state from some of these at the same time.  stuller 3/13/18

          // needed for TabList
          "selectedTab": this.state.selectedIndex,
          "setSelectedIndex": this._setSelectedIndex,
          // needed for Tabs
          "selected": this.state.selectedIndex === index - 1,
          "bordered": bordered,
          // needed for both
          "vertical": vertical
        });

      return child;
    });

    let tabsClasses = cx(
      {
        vertical
      },
      "tabs"
    );

    return (
      <div className={cx(className)} styleName={tabsClasses} style={style}>
        {tabsChildren}
      </div>
    );
  }
}

Tabs.propTypes = {
  /**
   * An Object, array, or string of CSS classes to apply to Tabs.
   */
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * TabList and TabPanel components.
   */
  "children": PropTypes.node.isRequired,
  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,
  /**
   * Set the currently selected tab. This is a zero-based index.
   */
  "selectedIndex": PropTypes.number,
  /**
   * This event handler is called every time a tab is about to change.
   */
  "onSelect": PropTypes.func,
  /**
   * Adds a border around the tab panels.
   */
  "bordered": PropTypes.bool,
  /**
   * Display the tabs vertically (always bordered)
   */
  "vertical": PropTypes.bool
};

Tabs.defaultProps = {
  "selectedIndex": 0,
  "vertical": false,
  "bordered": false
};

export default Tabs;
