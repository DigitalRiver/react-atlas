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

Tabs.styleguide = {
  "category": "Layout",
  "index": "4.8",
  "wrappedExample": true,
  "example": `
// Internal Methods {
class TabsExample extends React.Component {
  state = {
    index: 1
  };

  handleTabChange = (index) => {
    this.setState({index});
  };

  handleActive = () => {
    console.log("Special one activated");
  };
// }
  render () {
    return (
      <section>
        <h5>Tabs</h5>
        <p>This tabs can be disabled or hidden</p>
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label="Primary">
            <small>Primary content</small>
          </Tab>
          <Tab label="Secondary" onActive={this.handleActive}>
            <small>Secondary content</small>
          </Tab>
          <Tab label="Third" disabled>
            <small>Disabled content</small>
          </Tab>
          <Tab label="Fourth" hidden>
            <small>Fourth content hidden</small>
          </Tab>
          <Tab label="Fifth">
            <small>Fifth content</small>
          </Tab>
        </Tabs>
      </section>
    );
  }
// Mount Component {
}

ReactDOM.render(<TabsExample />, mountNode);
// }
`
};

export default Tabs;
