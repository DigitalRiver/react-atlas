import React from 'react';
import classNames from 'classnames/bind';
import style from './progressBar.css';
import prefixer from '../utils/prefixer';

//TODO Change this to a self contained component from the current version that requires too much logic in the parent component
class ProgressBar extends React.Component {

  calculateRatio (value) {
    if (value < this.props.min) return 0;
    if (value > this.props.max) return 1;
    return (value - this.props.min) / (this.props.max - this.props.min);
  }

  circularStyle () {
    if (this.props.mode !== "indeterminate") {
      return {strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`};
    }
  }

  linearStyle () {
    if (this.props.mode !== "indeterminate") {
      return {
        buffer: prefixer({transform: `scaleX(${this.calculateRatio(this.props.buffer)})`}),
        value: prefixer({transform: `scaleX(${this.calculateRatio(this.props.value)})`})
      };
    } else {
      return {};
    }
  }

  renderCircular () {
    return (
      <svg className={style.circle}>
        <circle className={style.path} style={this.circularStyle()} cx="30" cy="30" r="25" />
      </svg>
    );
  }

  renderLinear () {
    const {buffer, value} = this.linearStyle();
    return (
      <div>
        <span ref="buffer" data-ref="buffer" className={style.buffer} style={buffer}></span>
        <span ref="value" data-ref="value" className={style.value} style={value}></span>
      </div>
    );
  }

  render () {
    const {buffer, type, mode, value, min, max, ...props} = this.props;
    const cx = classNames.bind(style);
    const className = cx({
      [this.props.type]: this.props.type,
      [this.props.mode]: this.props.mode,
    });

    return (
      <div data-react-toolbox='progress-bar'
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className={className}
      >
        {this.props.type === "circular" ? this.renderCircular() : this.renderLinear()}
      </div>
    );
  }
}

ProgressBar.propTypes = {
  buffer: React.PropTypes.number,
  className: React.PropTypes.string,
  max: React.PropTypes.number,
  min: React.PropTypes.number,
  mode: React.PropTypes.string,
  multicolor: React.PropTypes.bool,
  type: React.PropTypes.oneOf(['linear', 'circular']),
  value: React.PropTypes.number
};

ProgressBar.defaultProps = {
  buffer: 0,
  className: '',
  max: 100,
  min: 0,
  mode: 'indeterminate',
  multicolor: false,
  type: 'linear',
  value: 0
};

export default ProgressBar;
