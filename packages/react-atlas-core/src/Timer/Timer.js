import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      "secondsRemaining": this.props.time
    };
  }

  componentDidMount() {
    this.interval = setInterval(this._renderTimer, 1000);
  }

  _renderTimer = () => {
    this.setState({ "secondsRemaining": this.state.secondsRemaining - 1 });
    if (this.state.secondsRemaining <= 0) {
      this.setState({
        "secondsRemaining": this.props.time
      });
    }
  };

  render() {
    let { className, style } = this.props;

    return (
      <div style={style} className={cx(className)}>
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
   * Time Property
   * Number property.  Timer will allow input of a number which is converted to seconds // TODO convert to accept more than seconds
   * @examples <Timer timer={60}/>
   */
  "time": PropTypes.number,
  /**
   * Prop to pass inline styles.
   */
  "style": PropTypes.object
};

export default Timer;
