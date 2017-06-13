import React from "react";
import PropTypes from 'prop-types';
import cx from "classNames";

/**
 * Used within the `<Tabs>` Component to programatically determine the content of any given tab. There probably isn't any reason for you to actually use `<TabContent>` directly.
 */
const TabContent = ({ active, tabIndex, children, className, ...props }) => {
  const classes = cx({
    "tabContent": true,
    "tabActive": active
  });

  return (
    <section {...props} styleName={classes} className={cx(className)} tabIndex={tabIndex}>
      {children}
    </section>
  );
};

TabContent.propTypes = {
  /**
   * Determines if the tab content is active (depends on tab active index).
   */
  "active": PropTypes.bool,
  /**
     * Children components (any markup to be displayed when tab is active).
     * @examples <TabContent><h3>Tab 1</h3><p>Lorem ipsum</p></TabContent>
     */
  "children": PropTypes.node,
  /**
     * Defines a custom css class name.
     * @examples 'tabContent', 'tabActive'
     */
  "className": PropTypes.string,
  /**
     * Tab index related to the content.
     * @examples 0,1,2,3,4
     */
  "tabIndex": PropTypes.number
};
TabContent.defaultProps = {
  "className": "",
  "active": false
};

TabContent.styleguide = {
  "category": "Layout",
  "index": "4.10",
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
    console.log("Can trigger events on active");
  };
// }
  render () {
    return (
      <section>
        <h5>Tabs</h5>
        <p>This tabs can be disabled or hidden</p>
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label="Primary">
            <TabContent>
              lorem ipsum
            </TabContent>
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

export default TabContent;
