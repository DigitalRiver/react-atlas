import React, { Component, PropTypes } from 'react';
import themeable from 'react-themeable';
import classNames from '../utils/classNames';

/**
 * Used within the `<Tabs>` Component to programatically determine the content of any given tab. There probably isn't any reason for you to actually use `<TabContent>` directly.
 */
const TabContent = ({active, tabIndex, children, className, ...props}) => {
    const theme = themeable(props.theme);
    const classes = classNames({
      tabContent: true,
      tabActive: active
    }, className);

    return (
      <section {...theme(1, ...classes)} tabIndex={tabIndex}>
        {children}
      </section>
    );
};

TabContent.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tabIndex: PropTypes.number
};
TabContent.defaultProps = {
  active: false,
  className: ''
};

TabContent.styleguide = {
  category: 'Layout',
  index: '4.10',
  wrappedExample: true,
  example: `
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
