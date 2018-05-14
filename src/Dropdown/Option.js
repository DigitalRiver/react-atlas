import React from "react";
import PropTypes from "prop-types";
import Text from "../Text/Text.js";

class Option extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>{this.props.text}</Text>;
  }
}

Option.propTypes = {};

Option.defaultProps = {};

export default Option;
