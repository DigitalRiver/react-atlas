import React from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import cx from "classnames";

class Switch extends React.PureComponent {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      "checked": this.props.checked || false,
      "disabled": this.props.disabled || false,
      "valid": true
    };

    /* Classes and styles setup */
    let small = this.props.small && !this.props.medium && !this.props.large,
      medium = !this.props.small && !this.props.large,
      large = this.props.large && !this.props.medium && !this.props.small,
      onColor = this.props.onColor,
      buttonColor = this.props.buttonColor;

    let offClassName = cx({
      "sliderSmall": small,
      "sliderMedium": medium,
      "sliderLarge": large,
      "sliderEnabledOffColor": !this.state.disabled,
      "sliderDisabledOffColor": this.state.disabled
    });

    let inputClassName = cx({
      "inputSmall": small,
      "inputMedium": medium,
      "inputLarge": large
    });

    let buttonClassName = cx({
      "handleSmall": small,
      "handleMedium": medium,
      "handleLarge": large,
      "handleDisabledColor": this.state.disabled,
      "handleEnabledColor": !this.state.disabled
    });

    let onClassName = cx({
      "onColorSmall": small,
      "onColorMedium": medium,
      "onColorLarge": large,
      "sliderDisabledOnColor": this.state.disabled
    });

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
      onColorStyle,
      buttonColorStyle
    };
  }

  componentWillReceiveProps = (nextProps) =>  {
      if(nextProps.checked !== this.props.checked) {
        this.setState({ "checked": !this.state.checked })
      }
      if(nextProps.disabled !== this.props.disabled) {
        this.setState({ "disabled": !this.state.disabled })
      }
  };

  // Handles new checkbox clicks and sets value and checked status of hidden input
  _clickHandler = () => {
    if (!this.state.disabled) {
      if (typeof this.props.onBeforeChange !== "undefined") {
        let result = this.props.onBeforeChange(this.state.checked);
        if(result === false) {
          return;
        }
      }

      this.setState({ "checked": !this.state.checked }, function() {
        /* Check if onClick has been passed, if so call it. */
        if (typeof this.props.onClick !== "undefined") {
          this.props.onClick(
            this.state.checked,
            this.state.disabled
          );
        }
        /* Check if onChange has been passed, if so call it. */
        if (typeof this.props.onChange !== "undefined") {
          this.props.onChange(
            this.state.checked,
            this.state.disabled
          );
        }
      });
    }
  };

  render() {
    const {
      label,
      leftLabel,
      className, 
      name, 
      hidden, 
      style,
      inline,
      id
    } = this.props;

    const classes = this.classes;
    const styles = this.styles;
    const forId = id !== "" && name !== "" ? id : "";

    let switchWrapperClasses = cx(
        {
          "switch": true
        }
    );

    let switchClasses = cx(
      {
        "disabled": this.state.disabled,
        hidden,
        inline,
        "leftLabelContent": leftLabel
      },
      classes.offClassName
    );

    let labelClasses = cx(
        {
            "leftLabel": leftLabel,
            "label":true,
            "labelFont":true,
            "labelSpacing":true
        }
    );

    let switchLabel = label &&
      <div styleName={labelClasses}>
        <label htmlFor={forId}>
          <span>{label}</span>
        </label>
      </div>
    ;
    return (
      <div
        className={cx(className)}
        styleName={switchWrapperClasses}
      >
        {switchLabel}
        <div
          onClick={this._clickHandler}
          styleName={switchClasses}
          style={style}
        >
          <InputCore
            type="checkbox"
            name={name}
            id={id}
            styleName={classes.inputClassName}
            checked={this.state.checked}
            disabled={this.state.disabled}
            hidden={this.state.disabled}
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
      </div>
    );
  }
}

Switch.propTypes = {
  /**
   * Text for checkbox label
   * @examples 'Some Label'
   */
  "label": PropTypes.string,
  /**
   * Allows user to move the label to the left of the Switch instead of above it
   */
  "leftLabel": PropTypes.bool,
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
   * Defines an id for the switch input.
   * @examples '<Input type="text" name="test"/>'
   */
  "id": PropTypes.string,
  /**
   * Sets color that will be displayed when the switch is checked.
   * @examples '<Switch onColor="#ababab"/>'
   */
  "onColor": PropTypes.string,
  /**
   * Allows user to pass a callback for click events.
   */
  "onClick": PropTypes.func,
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
