import React from "react";
import prefixer from "../utils/prefixer";
import cx from 'classnames';

//TODO Change this to a self contained component from the current version that requires too much logic in the parent component
class ProgressBar extends React.PureComponent {
  calculateRatio(value) {
    if (value < this.props.min) {
      return 0;
    }
    if (value > this.props.max) {
      return 1;
    }
    return (value - this.props.min) / (this.props.max - this.props.min);
  }

  circularStyle() {
    if (this.props.mode !== "indeterminate") {
      return {
        "strokeDasharray": 
          `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`
        
      };
    }
  }

  linearStyle() {
    if (this.props.mode !== "indeterminate") {
      return {
        "buffer": prefixer({
          "transform": `scaleX(${this.calculateRatio(this.props.buffer)})`,
          "transitionDuration": this.props.transitionDuration
        }),
        "value": prefixer({
          "transform": `scaleX(${this.calculateRatio(this.props.value)})`,
          "transitionDuration": this.props.transitionDuration
        })
      };
    } else {
      return {};
    }
  }

  renderCircular() {
    return (
      <svg styleName={cx("circle")}>
        <circle
          styleName={cx("path")}
          style={this.circularStyle()}
          cx="30"
          cy="30"
          r="25"
        />
      </svg>
    );
  }

  renderLinear() {
    const { buffer, value } = this.linearStyle();
    return (
      <div>
        <span
          data-ref="buffer"
          styleName={cx("buffer")}
          style={buffer}
        />
        <span
          data-ref="value"
          styleName={cx("value")}
          style={value}
        />
      </div>
    );
  }
  renderRange() {
    let rangeStyle = prefixer({
      "transform": 
        `translateX(${this.calculateRatio(this.props.value.from) * 100}%) 
                   scaleX(${this.calculateRatio(
          this.props.value.to - this.props.value.from
        )})`
      
    });
    return (
      <span
        data-ref="value"
        styleName={cx("value")}
        style={rangeStyle}
      />
    );
  }

  renderInner() {
    if (this.props.type === "circular") {
      return this.renderCircular();
    }
    if (isNaN(this.props.value)) {
      return this.renderRange();
    }
    return this.renderLinear();
  }

  render() {
    const { type, mode, value, min, max, className} = this.props;
    const classes = [
      type,
      mode,
      className
    ];

    return (
      <div
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        styleName={cx(classes)}
      >
        {this.renderInner()}
      </div>
    );
  }
}

ProgressBar.propTypes = {
  /**
   * The value of a second progress bar
   * @examples ''
   */
  "buffer": React.PropTypes.number,
  /**
   * Additional classname provided to component for further styling
   * @examples ''
   */
  "className": React.PropTypes.string,
  /**
   * Length of time in seconds for the transition (can use decimals)
   * @examples '35'
   */
  "transitionDuration": React.PropTypes.string,
  /**
   * The max value of the progress bar
   * @examples ''
   */
  "max": React.PropTypes.number,
  /**
   * The min value of the progress bar
   * @examples ''
   */
  "min": React.PropTypes.number,
  /**
   * Defines the type of Progress bar: 'determinate', 'indeterminate'
   * @examples 'circular'
   */
  "mode": React.PropTypes.string,
  /**
   * If true, progressbar will change colors during transition
   * @examples ''
   */
  "multicolor": React.PropTypes.bool,
  /**
   * Type of progress bar; 'circular' or 'linear'
   * @examples ''
   */
  "type": React.PropTypes.oneOf(["linear", "circular"]),
  /**
   * The default value(s) of the progress bar.  Can be a number, or an object containing keys of "from" and "to"
   * @examples '{"from": 10, "to": 80" }'
   */
  "value": React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.shape({
      "from": React.PropTypes.number,
      "to": React.PropTypes.number
    })
  ])
};

ProgressBar.defaultProps = {
  "buffer": 0,
  "className": "",
  "max": 100,
  "min": 0,
  "transitionDuration": ".35s",
  "mode": "indeterminate",
  "multicolor": false,
  "type": "linear",
  "value": 0
};

export default ProgressBar;