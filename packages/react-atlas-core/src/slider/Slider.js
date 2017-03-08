import React, { PropTypes, Component } from "react";
import ReactDOM from "react-dom";
import themeable from "react-themeable";
import { classNames } from "../utils";
import events from "../utils/events";
import prefixer from "../utils/prefixer";
import utils from "../utils/utils";
import ProgressBar from "../progress_bar";
import Input from "../input";

class Slider extends Component {
  state = {
    "inputFocused": false,
    "inputValue": null,
    "sliderLength": 0,
    "sliderStart": 0,
    "value": this.props.defaultValue || 0,
  };

  componentDidMount() {
    console.log("componentDidMount")
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate")
    if (!this.state.inputFocused && nextState.inputFocused) {
      return false;
    }
    if (this.state.inputFocused && this.state.value !== nextProps.value) {
      this.setState({ "inputValue": this.valueForInput(nextProps.value) });
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
    window.removeEventListener("resize", this.handleResize);
  }

  isRangeSlider() {
    console.log("isRangeSlider")
    return isNaN(this.state.value);
  }

  handleInputChange = (value) => {
    console.log("handleInputChange")
    let stateVal = this.state.inputValue;
    if (this.isRangeSlider()) {
      value.to = event;
    }
    this.setState({ "inputValue": value });
  };


  handleInputBlur = event => {
    console.log("handleInputBlur")
    const value = this.state.inputValue || 0;
    this.setState({ "inputFocused": false, "inputValue": null }, () => {
      this.handleChange(this.prepareValue(value));
    });
  };


  getInput = () => {
    console.log("getInput")
    return this.inputNode && this.inputNode.getWrappedInstance
      ? this.inputNode.getWrappedInstance()
      : this.inputNode;
  }

  handleMouseDown = (event) => {
    console.log("handleMouseDown")
    if (this.state.inputFocused) {
      this.getInput().blur();
    }
    events.addEventsToDocument(this.getMouseEventMap());
    this.start(events.getMousePosition(event));
    events.pauseEvent(event);
  };


  /* handles the focus to let user know the know is in focus*/
  handleInputFocus = () => {
    console.log("handleInputFocus")
    this.setState({
      "inputFocused": true,
      "inputValue": this.valueForInput(this.state.value)
    });
  };
  handleResize(event, callback) {
    console.log("handleResize")
    console.log("this.progressBar: ", this.progressBar)
    console.log("this.slider: ", this.slider)
    const { left, right } = ReactDOM.findDOMNode(
      this.progressBar
    ).getBoundingClientRect();
    const cb = callback || (() => {});
    this.setState({ "sliderStart": left, "sliderLength": right - left }, cb);
  };

  handleSliderBlur = () => {
    console.log("handleSliderBlur")
    events.removeEventsFromDocument(this.getKeyboardEvents());
  };

  /* Touch handler */
  handleTouchEnd = () => {
    console.log("handleTouchEnd")
    this.end(this.getTouchEventMap());
  };

  /* Detects mouse position and moves the knob to the x location */
  handleMouseMove = (event) => {
    console.log("handleMouseMove")
    events.pauseEvent(event);
    this.move(events.getMousePosition(event));
  };

  handleMouseUp = () => {
    console.log("handleMouseUp")
    this.end(this.getMouseEventMap());
  };
  /* Touch handler */
  handleTouchMove = event => {
    console.log("handleTouchMove")
    this.move(events.getTouchPosition(event));
  };

  /* Touch handler */
  handleTouchStart = event => {
    console.log("handleTouchStart")
    if (this.state.inputFocused) {
      this.inputNode.blur();
    }
    this.start(events.getTouchPosition(event));
    events.addEventsToDocument(this.getTouchEventMap());
    events.pauseEvent(event);
  };


  handleKeyDown = event => {
    console.log("handleKeyDown")
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
  console.log("addToValue")
    let value = this.state.inputFocused
      ? parseFloat(this.state.inputValue)
      : this.state.value;
    value = this.trimValue(value + increment);
    if (value !== this.state.value) {
      this.handleChange(value);
    }
  }

  getKeyboardEvents() {
  console.log("getKeyboardEvents")
    return {
      "keydown": this.handleKeyDown
    };
  }

  handleSliderFocus = () => {
    console.log("handleSliderFocus")
    events.addEventsToDocument(this.getKeyboardEvents());
  };


  convertValue(value) {
    console.log("convertValue")
    const decimals = this.stepDecimals();
    console.log(decimals > 0 ? value.toFixed(decimals) : value.toString());
    return decimals > 0 ? value.toFixed(decimals) : value.toString();
  }
  getTouchEventMap() {
  console.log("getTouchEventMap")
    return {
      "touchmove": this.handleTouchMove,
      "touchend": this.handleTouchEnd
    };
  }

  end(revents) {
  console.log("end")
    events.removeEventsFromDocument(revents);
    this.setState({ "pressed": false, "otherKnobValue": null });
  }

  calculateKnobOffset(value) {
  console.log("calculateKnobOffset")
    const { max, min, step } = this.props;
    console.log("value: ", value)
    console.log("max: ", max)
    console.log("min: ", min)
    console.log("step: ", step)
    const offsetValue = 100 * (value - min) / (max - min);
    console.log("offsetValue: ", offsetValue);
    return 100 * (value - min) / (max - min);
  }

  handleChange = (newValue) => {
    console.log("handleChange");
    this.setState({"value": newValue});
  };
  getMouseEventMap() {
    console.log("getMouseEventMap")
    return {
      "mousemove": this.handleMouseMove,
      "mouseup": this.handleMouseUp
    };
  }
  enrichNewValue(value) {
  console.log("enrichNewValue")
    if (!this.isRangeSlider()) {
      return value;
    }
    const otherValue = this.state.otherKnobValue;
  }

  move(position) {
  console.log("move")
    const newValue = this.positionToValue(position);
    if (newValue !== this.state.value) {
      this.handleChange(this.enrichNewValue(newValue));
    }
    console.log("move value: ", newValue)
  }

  positionToValue(position) {
  console.log("positionToValue")
    const { "sliderStart": start, "sliderLength": length } = this.state;
    const { max, min } = this.props;
    return this.trimValue((position.x - start) / length * (max - min) + min);
  }

  start(position) {
  console.log("start")
    console.log("position: ", position);
    this.setState({
      "pressed": true
    });
    this.handleResize(null, () =>
      this.handleChange(this.enrichNewValue(this.positionToValue(position))));
  }

  stepDecimals() {
  console.log("stepDecimals")
    return (this.props.step.toString().split(".")[1] || []).length;
  }

  trimValue(value) {
  console.log("trimValue")
    console.log("trimValue value: ", value);
    if (value < this.props.min) {
      return this.props.min;
    }
    if (value > this.props.max) {
      return this.props.max;
    }
    console.log("trying to hit round")
    console.log("utils.round: ", utils.round)
    console.log("after hitting round")
    var rounded = utils.round(value, this.stepDecimals());
    console.log("rounded: ", rounded);
    return utils.round(value, this.stepDecimals());
  }

  prepareValue(value) {
  console.log("prepareValue")
    if (!this.isRangeSlider()) {
      return this.trimValue(value);
    }
  }

  valueForKnob = () => {
    console.log("valueForKnob")
    console.log("valueForKnob this.state.value: ", this.state.value);
    return this.state.value;
  }

  valueForInput(value) {
  console.log("valueForInput")
    return this.convertValue(value);
  }


  renderKnob(theme) {
  console.log("renderKnob")
    const knobValue = this.valueForKnob();
    console.log("knobValue: ", knobValue);
    const offset = this.calculateKnobOffset(knobValue);
    console.log("offset!!: ", offset);
    const knobStyles = prefixer({ "left": `${offset - 5}%` });
    const className = classNames("innerknob", {
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
          data-value={parseInt(this.valueForKnob())}
        />
      </div>
    );
  }

  renderInput(theme) {
  console.log("renderInput")
    if (this.props.editable) {
      let value = this.state.inputFocused
        ? this.state.inputValue
        : this.valueForInput(this.state.value);
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
    else return undefined
  }

  render() {
    const theme = themeable(this.props.theme);
    const className = classNames(
      "root",
      {
        "editable": this.props.editable,
        "pinned": this.props.pinned,
        "pressed": this.state.pressed,
        "ring": this.state.value === this.props.min
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
              value={{from: 0, to: this.state.value}}
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
        <Slider disabled />
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
