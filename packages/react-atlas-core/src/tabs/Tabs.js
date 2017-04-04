import React, { Component, PropTypes } from "react";
import cx from 'classNames';

/**
 * Wrapper component to organize and produce tabs using multiple `<Tab>` components as children.
 */
class Tabs extends Component {
  render() {
    let { children, className, onClick, ...props } = this.props;
    const classes = cx(
      {
        "container": true
      }
    );

  return (
    <div {...props} className={cx(className)} styleName={classes}>
      <nav styleName={"navigation"}>
        {children}
      </nav>
    </div>
  )
  }
}

Tabs.propTypes = {
  "children": PropTypes.node,
  "className": PropTypes.string,
  "index": PropTypes.number,
  "onChange": PropTypes.func
};

Tabs.defaultProps = {
  "index": 0
};

Tabs.styleguide = {
  "category": "Layout",
  "index": "4.8",
  "wrappedExample": true,
  "example": 
    `
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
