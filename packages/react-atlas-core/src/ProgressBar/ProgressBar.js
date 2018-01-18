import React from "react";
import PropTypes from "prop-types";
import prefixer from "../utils/prefixer";
import cx from "classnames";

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
        "strokeDasharray": `${2 *
          Math.PI *
          25 *
          this.calculateRatio(this.props.value)}, 400`
      };
    } else {
      return {}
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
          "transitionDuration": this.props.transitionDuration,
        })
      };
    } else {
      return {};
    }
  }

  renderCircular() {
    const strokeDasharray = this.circularStyle();

    let color = this.props.color;

    const styles = {
      "stroke": color
    };

    const style = Object.assign(strokeDasharray, styles);

    return (
      <svg styleName={"circle"} viewBox="0 0 60 60">
        <circle
          styleName={"path"}
          style={style}
          cx="30"
          cy="30"
          r="25"
        />
      </svg>
    );
  }

  renderLinear() {
    const { buffer, value } = this.linearStyle();
    let color = this.props.color;

    const styles = prefixer({
      "backgroundColor": color
    }, value);

    return (
      <div>
        <span data-ref="buffer" styleName={"buffer"} style={buffer} />
        <span data-ref="value" styleName={"value"} style={styles} />
      </div>
    );
  }

  renderRange() {
    let rangeStyle = prefixer({
      "transform": `translateX(${this.calculateRatio(this.props.value.from) *
        100}%)
                   scaleX(${this.calculateRatio(
                     this.props.value.to - this.props.value.from
                   )})`
    });
    return <span data-ref="value" styleName={"value"} style={rangeStyle} />;
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
    const { type, mode, value, min, max, className, style } = this.props;
    const classes = [type, mode, className];

    return (
      <div
        style={style}
        className={cx(className)}
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
  "buffer": PropTypes.number,
  /** An Object, array, or string of CSS classes to apply to ProgressBar.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Sets color for the upfront color.
   * @examples '<ProgressBar color="red"/>'
   */
  "color": PropTypes.string,
  /**
   * Length of time in seconds for the transition (can use decimals)
   * @examples '35'
   */
  "transitionDuration": PropTypes.string,
  /**
   * The max value of the progress bar
   * @examples ''
   */
  "max": PropTypes.number,
  /**
   * The min value of the progress bar
   * @examples ''
   */
  "min": PropTypes.number,
  /**
   * Defines the type of Progress bar: 'determinate', 'indeterminate'
   * @examples 'circular'
   */
  "mode": PropTypes.string,
  /**
   * If true, progressbar will change colors during transition
   * @examples ''
   */
  "multicolor": PropTypes.bool,
  /**
   * Type of progress bar; 'circular' or 'linear'
   * @examples ''
   */
  "type": PropTypes.oneOf(["linear", "circular"]),
  /**
   * The default value(s) of the progress bar.  Can be a number, or an object containing keys of "from" and "to"
   * @examples '{"from": 10, "to": 80" }'
   */
  "value": PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      "from": PropTypes.number,
      "to": PropTypes.number
    })
  ]),

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
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
