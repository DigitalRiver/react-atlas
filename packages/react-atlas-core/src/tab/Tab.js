import React, { Component, PropTypes } from "react";
import cx from 'classNames';

/**
 * Individual Tab component used within `<Tabs>`. Can be disabled, hidden and also sent an onActive event trigger. Children become `<TabContent>`.
 */
class Tab extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  _handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    let { active, className, hidden, disabled, label, ...other } = this.props;

    const classes = cx(
      {
        "label": !active && !hidden && !disabled,
        active,
        hidden,
        disabled
      }
    );

    return (
      <label styleName={classes} onClick={this._handleClick} className={cx(className)}>
        {label}
      </label>
    );
  }
}

Tab.propTypes = {
  "active": PropTypes.bool,
  "className": PropTypes.string,
  "disabled": PropTypes.bool,
  "hidden": PropTypes.bool,
  "label": PropTypes.string,
  "onActive": PropTypes.func,
  "onClick": PropTypes.func
};

Tab.defaultProps = {
  "active": false,
  "disabled": false,
  "hidden": false,
  "label": "Tab Title"
};

Tab.styleguide = {
  "category": "Layout",
  "index": "4.9",
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

export default Tab;
