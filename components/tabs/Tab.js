import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './tabs.css';

/**
 * Individual Tab component used within `<Tabs>`. Can be disabled, hidden and also sent an onActive event trigger. Children become `<TabContent>`.
 */
class Tab extends Component {
  componentDidUpdate (prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  _handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };

  render () {
    let { active, hidden, disabled, label } = this.props;

    const cx = ClassNames.bind(style);

    const className = cx({
      label: !active && !hidden && !disabled,
      active,
      hidden,
      disabled
    }, this.props.className);

    return (
      <label className={className} onClick={this._handleClick}>
        {label}
      </label>
    );
  }
}

Tab.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  label: PropTypes.any.isRequired,
  onActive: PropTypes.func,
  onClick: PropTypes.func
};

Tab.defaultProps = {
  active: false,
  className: '',
  disabled: false,
  hidden: false
};

Tab.styleguide = {
  category: 'Layout',
  index: '4.9',
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
