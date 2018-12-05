import React from "react";
import PropTypes from "prop-types";

/**
 * Timer is a headless component that does not render anything by default. It provides props for calling functions on tick, when it reaches zero, or as a render prop for what to display.
 */
export class Timer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      secondsRemaining: props.time || null
    };
  }

  componentDidMount() {
    this.start();
  }

  componentDidUpdate(prevProps) {
    /* eslint-disable react/no-did-update-set-state */
    if (this.props.time !== prevProps.time) {
      this.setState(
        {
          secondsRemaining: this.props.time || null
        },
        this.start()
      );
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  start = () => {
    // Don't do anything if time is not set
    if (typeof this.props.time === "undefined" || this.props.time === null) {
      // If time is not set but we are ticking, stop ticking
      if (this._interval !== null) {
        this.stop();
      }
      return;
    }

    // Don't allow two timers to be going, clear previous interval
    clearInterval(this._interval);
    this._interval = setInterval(this.tick, 1000);
  };

  stop = () => {
    clearInterval(this._interval);
  };

  tick = () => {
    if (this.state.secondsRemaining === null) {
      // If we're ticking we have an interval so stop it
      this.stop();
      return;
    }

    // The tick occurs after 1 second has passed, so 1 second remaining is now 0
    if (this.state.secondsRemaining === 1) {
      if (this.props.onZero) {
        this.props.onZero();
      }

      if (this.props.loop) {
        this.setState({
          secondsRemaining: this.props.time
        });
        return;
      }

      this.stop();
    } else {
      // Don't call onTick at zero when onZero is called
      if (this.props.onTick) {
        // onTick(remaining, elapsed)
        this.props.onTick(
          this.state.secondsRemaining,
          this.props.time - this.state.secondsRemaining
        );
      }
    }

    this.setState(prevState => ({
      secondsRemaining: prevState.secondsRemaining - 1
    }));
  };

  render() {
    if (this.props.render) {
      // render(remaining, elapsed)
      return this.props.render(
        this.state.secondsRemaining,
        this.props.time - this.state.secondsRemaining
      );
    }

    return null;
  }
}

Timer.propTypes = {
  /**
   * Whether to loop the timer when it reaches zero or not
   */
  loop: PropTypes.bool,
  /**
   * Pass a function you would like called on every tick (1 second interval)
   * @examples <Timer time={10} onTick={(remaining, elapsed) => { ... }/>
   */
  onTick: PropTypes.func,
  /**
   * Pass a function you would like to be called when the timer reaches zero
   * @examples <Timer time={10} onZero={enableButton}/>
   */
  onZero: PropTypes.func,
  /**
   * Render property receives func(remaining, elapsed) should return component to render
   * @examples <Timer time={30} render={(remaining, elapsed) => (<Text>You have {remaining} second(s) remaining.</Text>)}/>
   */
  render: PropTypes.func,
  /**
   * Time Property
   * Number property.  Timer will allow input of a number which is converted to seconds
   * @examples <Timer time={60}/>
   */
  time: PropTypes.number
};

export default Timer;
