import React from 'react';
import ClassNames from 'classnames/bind';
import style from './style';

const propTypes = {
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  hidden: React.PropTypes.bool,
  label: React.PropTypes.any.isRequired,
  onActive: React.PropTypes.func,
  onClick: React.PropTypes.func
};

const defaultProps = {
  active: false,
  className: '',
  disabled: false,
  hidden: false
};

class Tab extends React.Component {
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
    let {active, hidden, disabled, label} = this.props;
    const cx = ClassNames.bind(style);
    const className = cx({
      label: true,
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

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;
