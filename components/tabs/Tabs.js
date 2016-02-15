import React, { Component, PropTypes } from 'react';
import Tab from "./Tab";
import TabContent from "./TabContent";
import style from "./tabs.css";

class Tabs extends Component {
  _handleHeaderClick = (idx) => {
    if (this.props.onChange) this.props.onChange(idx);
  };

  _parseChildren = () => {
    let headers = [];
    let contents = [];

    React.Children.forEach(this.props.children, (item) => {
      if (item.type === Tab) {
        headers.push(item);
        if (item.props.children) {
          contents.push(<TabContent children={item.props.children}/>);
        }
      } else if (item.type === TabContent) {
        contents.push(item);
      }
    });

    return { headers, contents };
  };

  render () {
    const { headers, contents } = this._parseChildren();

    let className = style.container;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className}>
        <nav className={style.navigation} ref="navigation">
          {headers.map((item, idx) => {
            return <Tab {...item.props} key={idx} active={this.props.index === idx} onClick={this._handleHeaderClick.bind(this, idx)} />
          })}
        </nav>
        {contents.map((item, idx) => {
          return <TabContent {...item.props} key={idx} active={this.props.index === idx} tabIndex={idx} />
        })}
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  index: PropTypes.number,
  onChange: PropTypes.func
};

Tabs.defaultProps = {
  index: 0
};

export default Tabs;
