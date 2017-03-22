import React, { PropTypes, Component } from "react";
import ReactDOM from "react-dom";
import themeable from "react-themeable";
import { classNames } from "../utils";
import events from "../utils/events";
import prefixer from "../utils/prefixer";
import utils from "../utils/utils";
import ProgressBar from "../progressBar";
import Input from "../input";

class Slider extends Component {
  state = {
    "inputFocused": false,
    "inputValue": null,
    "sliderLength": 0,
    "sliderStart": 0,
    "value": this.props.defaultValue || 0
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.inputFocused && nextState.inputFocused) {
      return false;
    }
    if (this.state.inputFocused && this.state.value !== nextProps.value) {
      this.setState({ "inputValue": this.convertValue(nextProps.value) });
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  isRangeSlider() {
    return isNaN(this.state.value);
  }

  handleInputChange = (value) => {
    let stateVal = this.state.inputValue;
    if (this.isRangeSlider()) {
      value.to = event;
    }
    this.setState({ "inputValue": value });
  };

  handleInputBlur = (event) => {
    const value = this.state.inputValue || 0;
    this.setState({ "inputFocused": false, "inputValue": null }, () => {
      this.handleChange(this.trimValue(value));
    });
  };


  getInput = () => {
    return this.inputNode && this.inputNode.getWrappedInstance
      ? this.inputNode.getWrappedInstance()
      : this.inputNode;
  }

  handleMouseDown = (event) => {
    if (this.state.inputFocused) {
      this.getInput().blur();
    }
    events.addEventsToDocument(this.getMouseEventMap());
    this.start(events.getMousePosition(event));
    events.pauseEvent(event);
  };

  handleInputFocus = () => {
    this.setState({
      "inputFocused": true,
      "inputValue": this.convertValue(this.state.value)
    });
  };
  handleResize(event, callback) {
    const { left, right } = ReactDOM.findDOMNode(
      this.progressBar
    ).getBoundingClientRect();
    const cb = callback || (() => {});
    this.setState({ "sliderStart": left, "sliderLength": right - left }, cb);
  }

  handleSliderBlur = () => {
    events.removeEventsFromDocument(this.getKeyboardEvents());
  };

  handleTouchEnd = () => {
    this.end(this.getTouchEventMap());
  };

  handleMouseMove = (event) => {
    events.pauseEvent(event);
    this.move(events.getMousePosition(event));
  };

  handleMouseUp = () => {
    this.end(this.getMouseEventMap());
  };
  /* Touch handler */
  handleTouchMove = (event) => {
    this.move(events.getTouchPosition(event));
  };

  /* Touch handler */
  handleTouchStart = (event) => {
    if (this.state.inputFocused) {
      this.inputNode.blur();
    }
    this.start(events.getTouchPosition(event));
    events.addEventsToDocument(this.getTouchEventMap());
    events.pauseEvent(event);
  };


  handleKeyDown = (event) => {
    if ([13, 27].indexOf(event.keyCode) !== -1) {
      this.inputNode.blur();
      ReactDOM.findDOMNode(this).blur();
    }
    if (this.isRangeSlider()) {
      return;
    }
    if (event.keyCode === 38) {
      this.addToValue(this.props.step);
    }
    if (event.keyCode === 40) {
      this.addToValue(-this.props.step);
    }
  };
  addToValue(increment) {
    let value = this.state.inputFocused
      ? parseFloat(this.state.inputValue)
      : this.state.value;
    value = this.trimValue(value + increment);
    if (value !== this.state.value) {
      this.handleChange(value);
    }
  }

  getKeyboardEvents() {
    return {
      "keydown": this.handleKeyDown
    };
  }

  handleSliderFocus = () => {
    events.addEventsToDocument(this.getKeyboardEvents());
  };

  convertValue(value) {
    const decimals = this.stepDecimals();
    return decimals > 0 ? value.toFixed(decimals) : value.toString();
  }
  getTouchEventMap() {
    return {
      "touchmove": this.handleTouchMove,
      "touchend": this.handleTouchEnd
    };
  }

  end(revents) {
    events.removeEventsFromDocument(revents);
    this.setState({ "pressed": false, "otherKnobValue": null });
  }

  calculateKnobOffset(value) {
    const { max, min, step } = this.props;
    const offsetValue = 100 * (value - min) / (max - min);
    return 100 * (value - min) / (max - min);
  }

  handleChange = (newValue) => {
    this.setState({"value": newValue});
  };
  getMouseEventMap() {
    return {
      "mousemove": this.handleMouseMove,
      "mouseup": this.handleMouseUp
    };
  }

  enrichNewValue(value) {
    if (!this.isRangeSlider()) {
      return value;
    }
    const otherValue = this.state.otherKnobValue;
  }

  move(position) {
    const newValue = this.positionToValue(position);
    if (newValue !== this.state.value) {
      this.handleChange(this.enrichNewValue(newValue));
    }
  }

  positionToValue(position) {
    const { "sliderStart": start, "sliderLength": length } = this.state;
    const { max, min } = this.props;
    return this.trimValue((position.x - start) / length * (max - min) + min);
  }

  start(position) {
    this.setState({
      "pressed": true
    });
    this.handleResize(null, () =>
      this.handleChange(this.enrichNewValue(this.positionToValue(position))));
  }

  stepDecimals() {
    return (this.props.step.toString().split(".")[1] || []).length;
  }

  trimValue(value) {
    if (value < this.props.min) {
      return this.props.min;
    }
    if (value > this.props.max) {
      return this.props.max;
    }
    let rounded = utils.round(value, this.stepDecimals());
    return utils.round(value, this.stepDecimals());
  }

  renderKnob(theme) {
    const knobValue = this.state.value;
    const offset = this.calculateKnobOffset(knobValue);
    const knobStyles = prefixer({ "left": `${offset - 5}%` });
    const innerknobDisabled = this.props.disabled ? "innerknobDisabled" : "innerknob"
    const className = classNames(innerknobDisabled, {
      "pressed": knobValue !== this.state.otherKnobValue
    });
    return (
      <div
        ref={(node) => { this.knobNode = node }}
        {...theme(10, "knob")}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        style={knobStyles}
      >
        <div
          {...theme(11, ...className)}
          data-value={parseInt(this.state.value)}
        />
      </div>
    );
  }

  renderInput(theme) {
    if (this.props.editable) {
      let value = this.state.inputFocused
        ? this.state.inputValue
        : this.convertValue(this.state.value);
      return (
        <Input
          ref={(node) => { this.inputNode = node}}
          disabled={this.props.disabled}
          {...theme(14, "input")}
          onFocus={this.handleInputFocus}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          value={value}
          theme={this.props.theme}
        />
      );
    }
    else {return undefined}
  }

  render() {
    const theme = themeable(this.props.theme);
    const className = classNames(
      "root",
      {
        "editable": this.props.editable,
        "pinned": this.props.pinned,
        "pressed": this.state.pressed,
        "ring": this.state.value === this.props.min,
        "disabled": this.props.disabled ? "disabled" : null
      },
      this.props.className
    );

    return (
      <div
        disabled={this.props.disabled}
        {...theme(15, ...className)}
        onBlur={this.handleSliderBlur}
        onFocus={this.handleSliderFocus}
        tabIndex="0"
      >
        <div
          ref={(node) => {this.slider = node}}
          {...theme(16, "container")}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
        >

          <div {...theme(17, "progress")}>
            <ProgressBar
              ref={(node) => { this.progressBar = node; }}
              disabled={this.props.disabled}
              mode="determinate"
              value={{"from": 0, "to": this.state.value}}
            />

            {this.renderKnob(theme)}
          </div>
        </div>
        {this.renderInput(theme)}
      </div>
    );
  }
}

Slider.propTypes = {
  /**
   * Sets an additional css class to customize this component
   * @examples 'Some Label'
   */
  "className": PropTypes.string,
  /**
   * If true, allows the user to set the slider based on keyboard value
   * @examples 'Some Label'
   */
  "disabled": PropTypes.bool,
  /**
   * If true, component will be disabled and cannot be interacted with
   * @examples <Slider disabled>
   */
  "editable": PropTypes.bool,
  /**
   * Max value of the slider
   * @examples 'Some Label'
   */
  "max": PropTypes.number,
  /**
   * Minimum value of the slider
   * @examples 'Some Label'
   */
  "min": PropTypes.number,
  "onChange": PropTypes.func,
  /**
   * If true, a numeric value is shown when the knob is held down.
   * @examples 'Some Label'
   */
  "pinned": PropTypes.bool,
  /**
   * If true, knob will snap to evenly spaced ticks as defined with the step prop
   * @examples 'Some Label'
   */
  "snaps": PropTypes.bool,
  /**
   * Varying amount to allow the knob to move in either direction
   * @examples 'Some Label'
   */
  "step": PropTypes.number,
  /**
   * Default value of the slider
   * @examples 'Some Label'
   */
  "value": React.PropTypes.oneOfType([
    React.PropTypes.number
  ])
};

Slider.defaultProps = {
  "className": "",
  "disabled": false,
  "editable": false,
  "max": 100,
  "min": 0,
  "pinned": false,
  "snaps": false,
  "step": 0.01,
  "value": 0
};

Slider.styleguide = {
  "category": "Form Components",
  "index": "3.11",
  "wrappedExample": true,
  "example": 
    `
// Internal Methods {
class SliderExample extends React.Component {
// }
  render () {
    return (
      <section>
        <h5>Sliders</h5>
        <p>Normal slider</p>
        <Slider  />
        <p>Disabled slider</p>
        <Slider disabled defaultValue={45}/>
      </section>
    );
  }
// Mount Component {
}
ReactDOM.render(<SliderExample/>, mountNode);
// }
`
  
};

export default Slider;