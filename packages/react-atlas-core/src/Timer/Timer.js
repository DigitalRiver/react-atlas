import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      "secondsRemaining": this.props.time
    }
  }

  componentDidMount() {
    this.interval = setInterval(this._renderTimer, 1000);
  }

  _renderTimer = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      this.setState({
        secondsRemaining: this.props.time
      });
    }
  }


  render() {
   
    return (
      <div>
        {this.state.secondsRemaining}
      </div>
    );
  }
}

Timer.propTypes = {
  /** An Object, array, or string of CSS classes to apply to avatar.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
    * Prop to pass inline styles.
    */
  "style": PropTypes.object
};

export default Timer;
