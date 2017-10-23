import React from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import cx from "classnames";

class Switch extends React.PureComponent {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      checked: this.props.checked || false,
      disabled: this.props.disabled || false
    };

    /* Classes and styles setup */
    let small = this.props.small && !this.props.medium && !this.props.large,
      medium = !this.props.small && !this.props.large,
      large = this.props.large && !this.props.medium && !this.props.small,
      hidden = this.props.hidden,
      offColor = this.props.offColor,
      onColor = this.props.onColor,
      buttonColor = this.props.buttonColor;

    let offClassName = cx({
      sliderSmall: small,
      sliderMedium: medium,
      sliderLarge: large,
      sliderEnabledOffColor: !this.state.disabled,
      sliderDisabledOffColor: this.state.disabled,
      disabled: this.state.disabled,
      hidden
    });

    let inputClassName = cx({
      inputSmall: small,
      inputMedium: medium,
      inputLarge: large,
      disabled: this.state.disabled,
      hidden
    });

    let buttonClassName = cx({
      handleSmall: small,
      handleMedium: medium,
      handleLarge: large,
      handleDisabledColor: this.state.disabled,
      handleEnabledColor: !this.state.disabled,
      disabled: this.state.disabled,
      hidden
    });

    let onClassName = cx({
      onColorSmall: small,
      onColorMedium: medium,
      onColorLarge: large,
      sliderDisabledOnColor: this.state.disabled
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

    this.classes = {
      inputClassName,
      buttonClassName,
      offClassName,
      onClassName
    };

    this.styles = {
      offColorStyle,
      onColorStyle,
      buttonColorStyle
    };
  }

  _onBeforeChange = callback => {
    let triggerChange = true;
    if (this.props.onBeforeChange) {
      triggerChange = this.props.onBeforeChange(this.state.checked);
    }
    /**
     * allow the user to prevent the execution of onChange event by passing a
     * function that returns a falsy value. If onClick handler is not specified,
     * onChange function will be called by default.
    **/
    if (triggerChange) {
      callback();
    }
  };

  _handleBeforeChange = () => {
    /**
     * We need to execute onClick function, and when it's done, execute onChange function.
     * If onClick is not passed, it will only execute onChange.
     * Callback approach was taken instead of promises/generators as team decision to
     * avoid adding a new dependency like bluebird (native es6 promises are slower)
    **/
    this._onBeforeChange(() => {
      this._handleChange();
    });
  };

  _handleChange = event => {
    if (!this.state.disabled) {
      event.persist();
      if (typeof this.props.onBeforeChange !== "undefined") {
        let result = this.props.onBeforeChange(this.state.checked);
        if(result === false) {
          return;
        }
      };
      this.setState({ checked: !this.state.checked });
    }
  };

  render() {
    const { 
      className, 
      name, 
      hidden, 
      style,
      inline
    } = this.props;

    const classes = this.classes;
    const styles = this.styles;

    let labelClasses = cx(
      {
        disabled: this.state.disabled,
        hidden,
        inline
      },
      classes.offClassName
    );

    return (
      <div
        onClick={this._handleChange}
        style={style}
        styleName={labelClasses}
        className={cx(className)}
        /*eslint-disable */
        style={styles.offColorStyle}
        /*eslint-enable */
      >
        <InputCore
          type="checkbox"
          name={name}
          styleName={classes.inputClassName}
          onBeforeChange={this._handleBeforeChange}
          checked={this.state.checked}
          disabled={this.state.disabled}
        />
        {/* handle */}
        <div
          styleName={classes.buttonClassName}
          style={styles.buttonColorStyle}
        />
        {/* background */}
        <div 
          styleName={classes.onClassName} 
          style={styles.onColorStyle} />
      </div>
    );
  }
}

Switch.propTypes = {
  /** An Object, array, or string of CSS classes to apply to Switch.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Determines if the switch input is disabled.
   * @examples '<Switch disabled={condition}/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the switch input is hidden.
   * @examples '<Switch hidden={condition}/>'
   */
  "hidden": PropTypes.bool,
  /**
   * Determines if the switch input is checked.
   * @examples '<Switch checked={condition}/>'
   */
  "checked": PropTypes.bool,
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
   * @examples <Switch onBeforeChange={this.customOnBeforeChangeFunc}/>
   */
  "onBeforeChange": PropTypes.func,
  /**
   * Sets the Switch as an inline-block element
   */
  "inline": PropTypes.bool,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

Switch.defaultProps = {
  "checked": false,
  "className": "",
  "disabled": false,
  "hidden": false
};

export default Switch;
