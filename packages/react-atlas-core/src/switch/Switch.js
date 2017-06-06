import React from "react";
import PropTypes from "prop-types";
import { InputCore } from "../input";
import cx from "classNames";

class Switch extends React.PureComponent {

  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      "checked": this.props.checked || false
    };
  }

  _onBeforeChange = (event, callback) => {
    let triggerChange = true;
    if (this.props.onClick) {
      triggerChange = this.props.onClick(this.state.checked);
    }
    /** 
     * allow the user to prevent the execution of onChange event by passing a 
     * function that returns a falsy value. If onClick handler is not specified,
     * onChange function will be called by default.
    **/
    if(triggerChange) {
      callback();
    }
  };

  _handleClick = event => {
    /** 
     * We need to execute onClick function, and when it's done, execute onChange function.
     * If onClick is not passed, it will only execute onChange.
     * Callback approach was taken instead of promises/generators as team decision to
     * avoid adding a new dependency like bluebird (native es6 promises are slower)
    **/
    this._onBeforeChange(event, () => {
      this._handleChange(event);
    });
  };

  _handleChange = event => {
    if (this.state.checked === true) {
      this.setState({ "checked": false });
    } else {
      this.setState({ "checked": true });
    }

    /* Check if onChange has been passed, if so call it. */
    if (this.props.onChange) {
      this.props.onChange(this.state.checked);
    }
  };

  render() {
    const {
      className,
      name,
      disabled,
      hidden,
      small,
      medium,
      large,
      offColor,
      onColor,
      buttonColor,
      ...props
    } = this.props;

    let offClassName = cx({
      "sliderSmall": small && !medium && !large,
      "sliderMedium": !small && !large,
      "sliderLarge": large && !medium && !small,
      disabled,
      hidden
    });

    let inputClassName = cx({
      "inputSmall": small && !medium && !large,
      "inputMedium": !small && !large,
      "inputLarge": large && !medium && !small,
      disabled,
      hidden
    });

    let buttonClassName = cx({
      "handleSmall": small && !medium && !large,
      "handleMedium": !small && !large,
      "handleLarge": large && !medium && !small,
      disabled,
      hidden
    });

    let onClassName = cx({
      "onColorSmall": small && !medium && !large,
      "onColorMedium": !small && !large,
      "onColorLarge": large && !medium && !small
    });

    let offColorStyle = {
      "background": offColor
    };

    let onColorStyle = {
      "background": onColor
    };

    let buttonColorStyle = {
      "background": buttonColor
    };

    return (
      <label
        {...props}
        styleName={offClassName}
        className={cx(className)}
        style={offColorStyle}
      >
        <InputCore
          type="checkbox"
          name={name}
          styleName={inputClassName}
          onClick={this._handleClick}
          checked={this.state.checked}
        />
        <div styleName={buttonClassName} style={buttonColorStyle} />
        <div styleName={onClassName} style={onColorStyle} />
      </label>
    );
  }
};

Switch.propTypes = {
  /**
   * Define a custom css class name.
   * @examples 'switch', 'switch-elem'
   */
  "className": PropTypes.string,
  /**
   * Determines if the switch input is disabled.
   * @examples '<Switch disabled/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the switch input is hidden.
   * @examples '<Switch hidden/>'
   */
  "hidden": PropTypes.bool,
  /**
   * Define a name for the switch input.
   * @examples '<Switch name="test"/>'
   */
  "name": PropTypes.string,
  /**
   * Sets color that will be displayed when the switch is checked.
   * @examples '<Switch onColor="#ababab"/>'
   */
  "onColor": PropTypes.string,
  /**
   * Sets color that will be displayed when the switch is unchecked.
   * @examples '<Switch offColor="#d3d3d3"/>'
   */
  "offColor": PropTypes.string,
  /**
   * Sets color that will be displayed for the inner button.
   * @examples '<Switch buttonColor="#ffffff"/>'
   */
  "buttonColor": PropTypes.string,
  /**
   * Defines a small sized switch element.
   * @examples '<Switch small/>'
   */
  "small": PropTypes.bool,
  /**
   * Defines a medium sized switch element.
   * @examples '<Switch medium/>'
   */
  "medium": PropTypes.bool,
  /**
   * Defines a large sized switch element.
   * @examples '<Switch large/>'
   */
  "large": PropTypes.bool,
  /**
   * Sets a handler function to be executed when onChange event occurs (at input element).
   * @examples <Switch onChange={this.customOnChangeFunc}/>
   */
  "onChange": PropTypes.func,
  /**
   * Sets a handler function to be executed before the onChange event occurs.
   * @examples <Switch onClick={this.customOnChangeFunc}/>
   */
  "onClick": PropTypes.func
};

Switch.defaultProps = {
  "checked": false,
  "className": "",
  "disabled": false,
  "hidden": false
};

export default Switch;
