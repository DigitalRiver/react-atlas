import React, { Component, PropTypes } from "react";
import cx from 'classNames';
import TabCore from "./index";
import TabContentCore from "./index";

/**
 * Wrapper component to organize and produce tabs using multiple `<Tab>` components as children.
 */
class Tabs extends Component {
  _handleHeaderClick = idx => {
    if (this.props.onChange) {
      this.props.onChange(idx);
    }
  };

  _parseChildren = () => {
    let headers = [];
    let contents = [];

    React.Children.forEach(this.props.children, item => {
      if (item.type === Tab) {
        headers.push(item);
        if (item.props.children) {
          contents.push(
            <TabContentCore
              children={item.props.children}
            />
          );
        }
      } else if (item.type === TabContent) {
        contents.push(item);
      }
    });

    return { headers, contents };
  };

  render() {
    const { headers, contents } = this._parseChildren();
    const classes = cx(
      {
        "container": true
      },
      this.props.className
    );

    return (
      <div styleName={classes}>
        <nav
          styleName={"navigation"}
          ref={nav => {
            this.navigation = nav;
          }}
        >
          {headers.map((item, idx) => {
            return (
              <TabCore
                {...item.props}
                key={idx}
                active={this.props.index === idx}
                onClick={this._handleHeaderClick.bind(this, idx)}
                className={cx(
                  "label",
                  active,
                  hidden,
                  disabled
                )}
              />
                //theme={this.props.theme}
            );
          })}
        </nav>
        {contents.map((item, idx) => {
          return (
            <TabContentCore
              {...item.props}
              key={idx}
              active={this.props.index === idx}
              tabIndex={idx}
              className={cx(
                "tabContent",
                "tabActive"
              )}
            />
          );
        })}
      </div>
    );
  }
}

Tabs.propTypes = {
  "children": PropTypes.node,
  "className": PropTypes.string,
  "index": PropTypes.number,
  "onChange": PropTypes.func,
  "theme": PropTypes.object
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
