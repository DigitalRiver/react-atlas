import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ReactDOM from 'react-dom';
import { default as DP } from 'react-datepicker';
import moment from 'moment';

class DatePicker extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date, event) {
    event.persist();
    this.setState({
      startDate: date
    });
    if(typeof this.props.onChange !== 'undefined') {
      this.props.onChange(date, event, true);
    }
  }

  render() {
    let { format, name, className, style } = this.props;
    return (<DP
        style={style}
        className={cx(className, "ra_DatePicker__datepicker")}
        name={name}
        dateFormat={format}
        selected={this.state.startDate}
        onChange={this.handleChange}
    />);
  }
}

DatePicker.propTypes = {
  "name": PropTypes.string,
  "format": PropTypes.string,
  "value": PropTypes.string,
  "onChange": PropTypes.func,
  /* Pass inline styling here. */
  style: PropTypes.object,
  /** An Object, array, or string of CSS classes to apply to DatePicker.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

export default DatePicker;
