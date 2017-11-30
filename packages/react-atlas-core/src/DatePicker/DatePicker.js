import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { default as Dp } from "react-datepicker";
import moment from "moment";

class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "startDate": moment(this.props.selected)|| moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date, event) {
    event.persist();
    this.setState({
      "startDate": date
    });
    if (typeof this.props.onChange !== "undefined") {
      this.props.onChange(date, event, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.selected !== "undefined" &&
      nextProps.selected !== this.state.selected
    ) {
      this.setState({ "startDate": moment(nextProps.selected) });
    }
  }

  render() {
    let { format, name, className, style } = this.props;
    return (
      <Dp
        style={style}
        className={cx(className, "ra_DatePicker__datepicker")}
        name={name}
        dateFormat={format}
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

DatePicker.propTypes = {
  "name": PropTypes.string,
  "format": PropTypes.string,
  "value": PropTypes.string,
  "onChange": PropTypes.func,
  /**
   * The currently selected Date.  You can use any format accepted by Moment.js
   */
  "selected": PropTypes.string,
  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,
  /*
   * An Object, array, or string of CSS classes to apply to DatePicker.
   */
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

export default DatePicker;
