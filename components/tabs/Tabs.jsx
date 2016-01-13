import React, { Component, PropTypes } from 'react';
import Tab from "./Tab";
import TabContent from "./TabContent";
import style from "./style";

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  index: PropTypes.number,
  onChange: PropTypes.func
};

const defaultProps = {
  index: 0
};

class Tabs extends Component {
  constructor (props) {
      super(props);
      this.state = {
          pointer: {}
      };
  }

  componentDidMount () {
    setTimeout(() => {
      this._updatePointer(this.props.index);
    }, 100);
  }

  componentWillReceiveProps (nextProps) {
    this._updatePointer(nextProps.index);
  }

  _handleHeaderClick = (idx) => {
    if (this.props.onChange) this.props.onChange(idx);
  };

  _parseChildren = () => {
    const headers = [];
    const contents = [];

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

    return {headers, contents};
  };

  _updatePointer = (idx) => {
    const startPoint = this.refs.tabs.getBoundingClientRect().left;
    const label = this.refs.navigation.children[idx].getBoundingClientRect();
    this.setState({
      pointer: {
        top: `${this.refs.navigation.getBoundingClientRect().height}px`,
        left: `${label.left - startPoint}px`,
        width: `${label.width}px`
      }
    });
  };

  _renderHeaders = (headers) => {
    return headers.map((item, idx) => {
      return React.cloneElement(item, {
        key: idx,
        active: this.props.index === idx,
        onClick: this._handleHeaderClick.bind(this, idx, item)
      });
    });
  };

  _renderContents = (contents) => {
    return contents.map((item, idx) => {
      return React.cloneElement(item, {
        key: idx,
        active: this.props.index === idx,
        tabIndex: idx
      });
    });
  };

  render () {
    let className = style.root;
    const { headers, contents } = this._parseChildren();
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div ref="tabs" className={className}>
        <nav className={style.navigation} ref="navigation">
          {this._renderHeaders(headers)}
        </nav>
        <span className={style.pointer} style={this.state.pointer} />
        {this._renderContents(contents)}
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
