import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import themeable from 'react-themeable';
import classNames from 'classnames/bind';
import events from '../utils/events';
import prefixer from '../utils/prefixer';
import utils from '../utils/utils';
import ProgressBar from '../progress_bar';
import Input from '../input';

class Slider extends Component {
  state = {
    inputFocused: false,
    inputValue: null,
    otherKnobValue: null,
    sliderLength: 0,
    sliderStart: 0
  };

  componentDidMount () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!this.state.inputFocused && nextState.inputFocused) return false;
    if (this.state.inputFocused && this.props.value !== nextProps.value) {
      this.setState({inputValue: this.valueForInput(nextProps.value)});
      return false;
    }
    return true;
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  isRangeSlider () {
    return isNaN(this.props.value);
  }

  handleInputFocus = () => {
    this.setState({
      inputFocused: true,
      inputValue: this.valueForInput(this.props.value)
    });
  };

  handleInputChange = (value) => {
    var stateVal = this.state.inputValue;
    if (this.isRangeSlider())
      value.to = event;
    this.setState({inputValue: value});
  };

  handleFromInputChange = (event) => {
    let value = this.state.inputValue;
      value.from = event;
    this.setState({inputValue: value});
  };

  handleInputBlur = (event) => {
    const value = this.state.inputValue || 0;
    this.setState({inputFocused: false, inputValue: null}, () => {
      this.props.onChange(this.prepareValue(value), event);
    });
  };

  handleKeyDown = (event) => {
    if ([13, 27].indexOf(event.keyCode) !== -1) {
      this.refs.input.blur();
      ReactDOM.findDOMNode(this).blur();
    }
    if (this.isRangeSlider()) return;
    if (event.keyCode === 38) this.addToValue(this.props.step);
    if (event.keyCode === 40) this.addToValue(-this.props.step);
  };

  handleMouseDown = (event) => {
    if (this.state.inputFocused) this.refs.input.blur();
    events.addEventsToDocument(this.getMouseEventMap());
    this.start(events.getMousePosition(event));
    events.pauseEvent(event);
  };

  handleMouseMove = (event) => {
    events.pauseEvent(event);
    this.move(events.getMousePosition(event));
  };

  handleMouseUp = () => {
    this.end(this.getMouseEventMap());
  };

  handleResize = (event, callback) => {
    const {left, right} = ReactDOM.findDOMNode(this.refs.progressbar).getBoundingClientRect();
    const cb = (callback) || (() => {});
    this.setState({sliderStart: left, sliderLength: right - left}, cb);
  };

  handleSliderBlur = () => {
    events.removeEventsFromDocument(this.getKeyboardEvents());
  };

  handleSliderFocus = () => {
    events.addEventsToDocument(this.getKeyboardEvents());
  };

  handleTouchEnd = () => {
    this.end(this.getTouchEventMap());
  };

  handleTouchMove = (event) => {
    this.move(events.getTouchPosition(event));
  };

  handleTouchStart = (event) => {
    if (this.state.inputFocused) this.refs.input.blur();
    this.start(events.getTouchPosition(event));
    events.addEventsToDocument(this.getTouchEventMap());
    events.pauseEvent(event);
  };

  addToValue (increment) {
    let value = this.state.inputFocused ? parseFloat(this.state.inputValue) : this.props.value;
    value = this.trimValue(value + increment);
    if (value !== this.props.value) this.props.onChange(value);
  }

  getKeyboardEvents () {
    return {
      keydown: this.handleKeyDown
    };
  }

  getMouseEventMap () {
    return {
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp
    };
  }

  getTouchEventMap () {
    return {
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd
    };
  }

  end (revents) {
    events.removeEventsFromDocument(revents);
    this.setState({ pressed: false, otherKnobValue: null });
  }

  calculateKnobOffset (value) {
    const { max, min, step } = this.props;
    return 100 * (value - min) / (max - min);
  }

  enrichNewValue (value) {
     if (!this.isRangeSlider())
       return value;
     const otherValue = this.state.otherKnobValue;
     return otherValue > value ?
     {from: value, to: otherValue} :
     {from: otherValue, to: value};
  }

  move (position) {
    const newValue = this.positionToValue(position);
    if (newValue !== this.props.value) this.props.onChange(this.enrichNewValue(newValue));
  }

  positionToValue (position) {
    const { sliderStart: start, sliderLength: length } = this.state;
    const { max, min } = this.props;
    return this.trimValue((position.x - start) / length * (max - min) + min);
  }

  start (position) {
    this.setState({
       pressed: true,
       otherKnobValue: this.getOtherKnobValue(position)
    });
    this.handleResize(null, () => this.props.onChange(this.enrichNewValue(this.positionToValue(position))));
  }

  getOtherKnobValue (position) {
     if (!this.isRangeSlider())
       return null;
     const currentValue = this.positionToValue(position);
     const differenceFrom = Math.abs(currentValue - this.props.value.from);
     const differenceTo = Math.abs(currentValue - this.props.value.to);
     return differenceFrom > differenceTo ? this.props.value.from : this.props.value.to;
  }

  stepDecimals () {
    return (this.props.step.toString().split('.')[1] || []).length;
  }

  trimValue (value) {
    if (value < this.props.min) return this.props.min;
    if (value > this.props.max) return this.props.max;
    return utils.round(value, this.stepDecimals());
  }

  prepareValue (value) {
     if (!this.isRangeSlider())
       return this.trimValue(value);
     value.from = this.trimValue(value.from);
     value.to = this.trimValue(value.to);
     if (value.from > value.to) {
       var temp = value.to;
       value.to = value.from;
       value.from = temp;
     }
     return value;
  }

  convertValue(value) {
    const decimals = this.stepDecimals();
    return decimals > 0 ? value.toFixed(decimals) : value.toString();
  }

  valueForInput (value) {
     if (this.isRangeSlider())
       return {from: this.convertValue(value.from), to: this.convertValue(value.to)};
     return this.convertValue(value);
   }

   valueForKnob (isLast) {
     if (!this.isRangeSlider())
       return this.props.value;
     return isLast ? this.props.value.to : this.props.value.from;
   }

   renderKnob (isLast, theme) {
      const knobValue = this.valueForKnob(isLast);
      const offset = this.calculateKnobOffset(knobValue);
      const knobStyles = prefixer({left: `${offset}%`});
      const className = classNames('innerknob', {
         pressed: knobValue !== this.state.otherKnobValue
      });
      const ref = isLast ? "knob" : "knobFrom";
      return (<div
             ref={ref}
             {...theme(10, 'knob')}
             onMouseDown={this.handleMouseDown}
             onTouchStart={this.handleTouchStart}
             style={knobStyles}
           >
             <div {...theme(11, ...className)} data-value={parseInt(this.valueForKnob(isLast))}></div>
           </div>);
   }
   renderSnaps (theme) {
      if (this.props.snaps) {
        return (
         <div ref='snaps' {...theme(12, 'snaps')}>
           {utils.range(0, (this.props.max - this.props.min) / this.props.step).map(i => {
               return <div key={`span-${i}`} {...theme(13, 'snap')}></div>;
             })}
         </div>
       );
      }
    }

  renderInput (isLast, theme) {
    if (this.props.editable) {
      var value = this.state.inputFocused ? this.state.inputValue : this.valueForInput(this.props.value);
      if (this.isRangeSlider()) {
        value = isLast ? value.to : value.from;
      }
      const ref = isLast ? "input" : "inputFrom";
      return (
          <Input
            ref={ref}
            {...theme(14, 'input')}
            onFocus={this.handleInputFocus}
            onChange={isLast ? this.handleInputChange : this.handleFromInputChange}
            onBlur={this.handleInputBlur}
            value={value}
            theme={this.props.theme}
          />
      );
    }
  }

  render () {
    const theme = themeable(this.props.theme);
    const className = classNames('root', {
      editable: this.props.editable,
      pinned: this.props.pinned,
      pressed: this.state.pressed,
      ring: this.props.value === this.props.min
    }, this.props.className);

    return (
      <div
        {...theme(15, ...className)}
        onBlur={this.handleSliderBlur}
        onFocus={this.handleSliderFocus}
        tabIndex='0'
      >
        {this.isRangeSlider() ? this.renderInput(false, theme) : null}
        <div
          ref='slider'
          {...theme(16, 'container')}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
        >
          {this.isRangeSlider() ? this.renderKnob(false, theme) : ""}
          {this.renderKnob(true, theme)}
          <div {...theme(17, 'progress')}>
            <ProgressBar
              ref='progressbar'
              {...theme(18, 'innerprogress')}
              max={this.props.max}
              min={this.props.min}
              mode='determinate'
              transitionDuration='0s'
              value={this.props.value}
              theme={this.props.theme}
            />
            {this.props.snaps
              ? <div ref='snaps' {...theme(19, 'snaps')}>
                  {utils.range(0, (this.props.max - this.props.min) / this.props.step).map(i => {
                      return <div key={`span-${i}`} {...theme(20, 'snap')}></div>;
                    })}
                </div>
              : null
            }
          </div>
        </div>
        {this.renderInput(true, theme)}
      </div>
    );
  }
}

Slider.propTypes = {
  className: PropTypes.string,
  editable: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  pinned: PropTypes.bool,
  snaps: PropTypes.bool,
  step: PropTypes.number,
  value: React.PropTypes.oneOfType([
       React.PropTypes.number,
       React.PropTypes.shape({
         from: React.PropTypes.number,
         to: React.PropTypes.number
       })
     ])
};

Slider.defaultProps = {
  className: '',
  editable: false,
  max: 100,
  min: 0,
  pinned: false,
  snaps: false,
  step: 0.01,
  value: 0
};

Slider.styleguide = {
  category: 'Form Components',
  index: '3.11',
  wrappedExample: true,
  example: `
// Internal Methods {
class SliderExample extends React.Component {
  state = {
    slider2: 5,
    slider3: 1,
    slider4: {from: 10, to: 25}
  };

  handleChange = (slider, value) => {
    const newState = {};
    newState[slider] = value;
    this.setState(newState);
  };
// }
  render () {
    return (
      <section>
        <h5>Sliders</h5>
        <p>Normal slider</p>
        <Slider value={this.state.slider1} onChange={this.handleChange.bind(this, 'slider1')} />
        <p>With steps, initial value and editable</p>
        <Slider min={0} max={10} editable value={this.state.slider2} onChange={this.handleChange.bind(this, 'slider2')} />
        <p>Pinned and with snaps</p>
        <Slider pinned snaps min={0} max={10} step={1} editable value={this.state.slider3} onChange={this.handleChange.bind(this, 'slider3')} />
        <p>Range slider</p>
        <Slider editable pinned snaps step={5} value={this.state.slider4} onChange={this.handleChange.bind(this, 'slider4')}/>
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
