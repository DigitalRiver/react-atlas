import React from "react";
import PropTypes from 'prop-types';
import cx from "classNames";

/**
 * Individual Tab component used within `<Tabs>`. Can be disabled, hidden and also sent an onActive event trigger.
 */
class Tab extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  _handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(this.props.index);
    }
  };

  _handleActive = () => {
    if (!this.props.disabled && this.props.onActive) {
      this.props.onActive();
    }
  };

  render() {
    let { active, className, hidden, disabled, label, ...other } = this.props;

    const classes = cx({
      "label": !active && !hidden && !disabled,
      active,
      hidden,
      disabled
    });

    return (
      <label
        {...other}
        styleName={classes}
        onClick={this._handleClick}
        onActive={this._handleActive}
        className={cx(className)}
      >
        {label}
      </label>
    );
  }
}

Tab.propTypes = {
  "active": PropTypes.bool,
  /**
     * Defines a custom css class name.
     * @examples 'tab', 'label'
     */
  "className": PropTypes.string,
  /**
   * Determines if the tab is disabled.
   * @examples '<Tab disabled/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the tab is hidden.
   * @examples '<Tab hidden/>'
   */
  "hidden": PropTypes.bool,
  /**
   * Determines label text on the tab navbar.
   * @examples '<Tab label="Tab 1"/>'
   */
  "label": PropTypes.string,
  /**
     * Sets a handler function to be executed when custom onActive event occurs.
     * @examples <Tab onClick={this._tabOnActive}>(...)</Tabs>
     */
  "onActive": PropTypes.func,
  /**
     * Sets a handler function to be executed when onClick event occurs.
     * @examples <Tab onClick={this._tabOnClick}>(...)</Tabs>
     */
  "onClick": PropTypes.func,
  /**
     * Tab index
     * @examples 0,1,2,3,4
     */
  "index": PropTypes.number
};

Tab.defaultProps = {
  "className": "",
  "active": false,
  "disabled": false,
  "hidden": false,
  "label": "Tab Title"
};

Tab.styleguide = {
  "category": "Layout",
  "index": "4.9",
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

export default Tab;
