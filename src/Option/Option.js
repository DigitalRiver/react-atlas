import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Text from "../Text/Text.js";
import CSSModules from "react-css-modules";
import styles from "./Option.css";

export class Option extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _handleHover = e => {
    this.props.onMouseOver(e, this.props.index);
  };

  _clickHandler = e => {
    this.props.onClick(e, this.props.value, this.props.index);
  };

  render() {
    const { selected, text, value, ...others } = this.props;

    const optionWrapper = cx({
      "optionWrapper": true,
      "hover": this.props.hover && !selected,
      "selected": selected
    });

    return (
      <div
        onMouseOver={this._handleHover}
        onMouseDown={this._clickHandler}
        styleName={optionWrapper}
        {...others}
      >
        <Text as="option" title={text} styleName={cx("option")} value={value}>
          {text}
        </Text>
      </div>
    );
  }
}

Option.propTypes = {
  /** Define whether or not the Option should get hover styling.*/
  "hover": PropTypes.bool,
  /** Define an index for the Option.*/
  "index": PropTypes.number,
  /** Sets a handler function to be executed when onClick event occurs.*/
  "onClick": PropTypes.func,
  /** Sets a handler function to be executed when onMouseOver event occurs.*/
  "onMouseOver": PropTypes.func,
  /** Define whether or not the Option should get selected styling.*/
  "selected": PropTypes.bool,
  /** Define display text for the Option.*/
  "text": PropTypes.string,
  /** Define a value for the Option.*/
  "value": PropTypes.string
};

Option.defaultProps = {};

export default CSSModules(Option, styles, { "allowMultiple": true });
