import React from 'react';
import classNames from 'classnames/bind';
import style from './dropdown.css';

const propTypes = {
  auto: React.PropTypes.bool,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  source: React.PropTypes.array.isRequired,
  template: React.PropTypes.func,
  value: React.PropTypes.string
};

const defaultProps = {
  auto: true,
  className: '',
  disabled: false
};

class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      up: false
    }
  }

  handleClick = (event) => {
    const client = event.target.getBoundingClientRect();
    const screen_height = window.innerHeight || document.documentElement.offsetHeight;
    const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;
    this.setState({active: true, up});
  };

  handleSelect = (item, event) => {
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(item, event);
      this.setState({active: false});
    }
  };

  getSelectedItem = () => {
    if (this.props.value) {
      for (const item of this.props.source) {
        if (item.value === this.props.value) return item;
      }
    } else {
      return this.props.source[0];
    }
  };

  renderItem (item, idx) {
    const className = item.value === this.props.value ? style.selected : null;
    return (
        <li key={idx} className={className} onMouseDown={this.handleSelect.bind(this, item.value)}>
          {this.props.template ? this.props.template(item) : item.label}
        </li>
    );
  }

  render () {
    const {label, template, active, base, button, title, type} = this.props;
    const selected = this.getSelectedItem();
    let cx = classNames.bind(style);

    let className = cx({
      base: true,
      up: this.state.up,
      active: this.state.active,
      disabled: this.props.disabled
    });

    return (
        <div data-react-toolbox='dropdown' className={className}>
          {label ? <label className={style.label}>{label}</label> : null}

          <ul ref='values' className={style.values}>
            {this.props.source.map(this.renderItem.bind(this))}
          </ul>

          <div ref='value' className={style.value} onClick={this.handleClick}>
            {template ? template(selected) : <span>{selected.label}</span>}
          </div>
        </div>
    );
  }
}

Dropdown.propTypes = propTypes;

Dropdown.defaultProps = defaultProps;

export default Dropdown;
