import React from "react";
import PropTypes from "prop-types";
import TextField from "../TextField/TextField.js";
import CSSModules from "react-css-modules";
import styles from "./MaskedTextField.css";
import InputMask from "inputmask-core";
import blacklist from "blacklist";

export class MaskedTextField extends React.PureComponent {
  constructor(props) {
    super(props);

    let options = {
      "pattern": props.mask
    };

    if (props.value) {
      options.value = props.value;
    }

    this.mask = new InputMask(options);

    if (props.value) {
      let maskValue = this.mask.getValue();
      this.state = { "value": maskValue };
    } else {
      this.state = { "value": "" };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.mask.setValue(nextProps.value);
      this.setState({ "value": this.mask.getValue() });
    }

    if (nextProps.mask) {
      this.mask.setPattern(nextProps.mask);
    }
  }

  setValue = (input, event) => {
    event.persist();
    let ret = this.mask.input(input);
    let value = this.mask.getValue();
    let selection = this.mask.selection;
    if (ret === true) {
      this.setState({ "value": value }, () => {
        this.input.selectionStart = selection.start;
        this.input.selctionEnd = selection.end;
        if (typeof this.props.onChange !== "undefined") {
          this.props.onChange(event, value);
        }
      });
    }
    return ret;
  };

  handlePaste = event => {
    this.mask.paste(event.target.value);
    let value = this.mask.getValue();
    this.setState({ "value": value });
  };

  onKeyDownHandler = event => {
    if (event.key === "Backspace") {
      /* Stops onChange from firing again and overwriting mask value.*/
      event.preventDefault();

      let end = event.target.selectionEnd;
      let length = event.target.value.length;
      let start = event.target.selectionStart;

      if (start === length) {
        this.mask.backspace();
      } else {
        this.mask.selection = { "start": start, "end": end };
        this.mask.backspace();
      }

      let value = this.mask.getValue();
      this.setState({ "value": value });
    }
  };

  onBeforeChangeHandler = (event, data) => {
    if (data.status === "error") {
      return false;
    }

    event.persist();

    let ret = true;
    if (typeof this.props.onBeforeChange !== "undefined") {
      ret = this.props.onBeforeChange(event, data);
      if (ret === false) {
        return;
      }
    }

    ret = this.setValue(data.value[data.value.length - 1], event);

    return ret;
  };

  render() {
    const { ...others } = this.props;

    let props = blacklist(others, "value");

    return (
      <TextField
        onBeforeChange={this.onBeforeChangeHandler}
        value={this.state.value}
        onKeyDown={this.onKeyDownHandler}
        onPaste={this.handlePaste}
        input={input => {
          this.input = input;
        }}
        {...props}
      />
    );
  }
}

MaskedTextField.propTypes = {
  /** The mask pattern you want MaskTextField to use. */
  "mask": PropTypes.string,
  /** The initial value. Characters that dont conform to the mask pattern will be rejected. */
  "value": PropTypes.string,
   /**
   * Sets a handler function to be executed when onClick event occurs (at input element).
   * @examples <MaskedTextField onClick={this.customOnClickFunc}/>
   */
  "onChange": PropTypes.func,
  /**
   * Sets a handler function to be executed before change event occurs (at input element).
   * return true if you want the chaneg to happen, pass false to deny the change.
   * @examples <MaskedTextField onBeforeChange={this.onBeforeChange}/>
   */
  "onBeforeChange": PropTypes.func
};

export default CSSModules(MaskedTextField, styles, { "allowMultiple": true });
