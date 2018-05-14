import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import TextField from "../TextField/TextField.js";
import CSSModules from "react-css-modules";
import styles from "./Dropdown.css";

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      "active": false,
      "focus": false,
      "options": props.options || props.children
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.options !== "undefined" &&
      nextProps.options !== this.props.data
    ) {
      this.setState({
        "options": nextProps.data
      });
    }
    if (
      typeof nextProps.children !== "undefined" &&
      typeof nextProps.options === "undefined" &&
      nextProps.children !== this.props.children
    ) {
      this.setState({
        "options": nextProps.children
      });
    }
  }

  _handleActive = active => {
    this.setState({ "focus": active });
  };

  _handleClick = () => {
    this.setState({ "active": !this.state.active });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      event.preventDefault();
      if (typeof this.props.disabled !== "undefined" && this.props.disabled) {
        return false;
      }
      if (this.state.focus === true) {
        this.setState({ "active": !this.state.active });
      }
    }
  };

  render() {
    const {
      autocomplete,
      children,
      className,
      options,
      style,
      ...others
    } = this.props;

    const optionsWrapper = cx({
      "hidden": !this.state.active
    });

    let renderedOptions =
      children &&
      React.Children.map(children, (child, i) => {
        return child;
      });

    return (
      <div>
        <TextField
          readOnly={!autocomplete}
          onFocus={() => {
            this._handleActive(true);
          }}
          onBlur={() => {
            this._handleActive(false);
          }}
          onClick={() => {
            this._handleClick();
          }}
          onKeyPress={e => {
            this._handleKeyPress(e);
          }}
          {...others}
        />
        <div styleName={optionsWrapper}>{children}</div>
      </div>
    );
  }
}

Dropdown.propTypes = {};

Dropdown.defaultProps = {};

export default CSSModules(Dropdown, styles, { "allowMultiple": true });
