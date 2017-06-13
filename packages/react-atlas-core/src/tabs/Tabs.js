import React from "react";
import PropTypes from 'prop-types';
import cx from "classNames";

/**
 * Wrapper component to organize and produce tabs using multiple `<Tab>` components as children.
 */
class Tabs extends React.Component {
  render() {
    let { children, className, onClick, index, ...props } = this.props;

    const classes = cx({
      "container": true
    });

    const tabs = children
      .filter(child => {
        return child.type.displayName === "Tab";
      })
      .map((child, childIndex) => {
        child = React.cloneElement(child, {
          "key": childIndex,
          "index": childIndex,
          "active": childIndex === index,
          onClick
        });

        return child;
      });

    const tabContent = children
      .filter(child => {
        return child.type.displayName === "TabContent";
      })
      .map((child, childIndex) => {
        child = React.cloneElement(child, {
          "key": childIndex,
          "tabIndex": childIndex,
          "active": childIndex === index
        });

        return child;
      });

    return (
      <div {...props} className={cx(className)} styleName={classes}>
        <nav {...props} styleName={"navigation"}>
          {tabs}
        </nav>
        {tabContent}
      </div>
    );
  }
}

Tabs.propTypes = {
  /**
     * Children components (almost always Tab and TabContent).
     * @examples <Tabs><Tab label="Tab 1"/><Tab label="Tab 2"/><TabContent>Tab 1</TabContent><TabContent>Tab 2</TabContent></Tabs>
     */
  "children": PropTypes.node,
  /**
     * Defines a custom css class name.
     * @examples 'navigation', 'container'
     */
  "className": PropTypes.string,
  /**
     * Active index element (will set active Tab and TabContent depending on this).
     * @examples 0,1,2,3,4
     */
  "index": PropTypes.number,
  /**
     * Sets a handler function to be executed when onClick event occurs.
     * @examples <Tabs onClick={index => this.setState({index})}>(...)</Tabs>
     */
  "onClick": PropTypes.func
};

Tabs.defaultProps = {
  "className": "",
  "index": 0
};

export default Tabs;
