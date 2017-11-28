import React from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import cx from "classnames";

class Switch extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onChange = (value, event) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };
  _onBeforeChange = event => {
    if (this.props.onBeforeChange) {
      this.props.onBeforeChange(event);
    }
  };

  buildClasses = props => {
    /* Classes and styles setup */
    let small = props.small && !props.medium && !props.large,
      medium = !props.small && !props.large,
      large = props.large && !props.medium && !props.small,
      disabled = props.disabled,
      hidden = props.hidden,
      offColor = props.offColor,
      onColor = props.onColor,
      buttonColor = props.buttonColor;

    let offClassName = cx({
      "sliderSmall": small,
      "sliderMedium": medium,
      "sliderLarge": large,
      disabled,
      hidden
    });

    let inputClassName = cx({
      "inputSmall": small,
      "inputMedium": medium,
      "inputLarge": large,
      disabled,
      hidden
    });

    let buttonClassName = cx({
      "handleSmall": small,
      "handleMedium": medium,
      "handleLarge": large,
      disabled,
      hidden
    });

    let onClassName = cx({
      "onColorSmall": small,
      "onColorMedium": medium,
      "onColorLarge": large
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
  };
  render() {
    const {
      className,
      id,
      name,
      disabled,
      checked,
      hidden,
      style,
      inline
    } = this.props;

    this.buildClasses(this.props);
    const classes = this.classes;
    const styles = this.styles;

    let labelClasses = cx(
      {
        disabled,
        hidden,
        inline
      },
      classes.offClassName
    );

    return (
      <label
        style={style}
        styleName={labelClasses}
        className={cx(className)}
        /*eslint-disable */
        style={styles.offColorStyle}
        /*eslint-enable */
      >
        <InputCore
          type="checkbox"
          id={id}
          name={name}
          styleName={classes.inputClassName}
          onBeforeChange={this._onBeforeChange}
          onChange={this._onChange}
          checked={checked}
        />
        <div
          styleName={classes.buttonClassName}
          style={styles.buttonColorStyle}
        />
        <div styleName={classes.onClassName} style={styles.onColorStyle} />
      </label>
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
   * Define a id for the switch input.
   * @examples '<Switch id="testId"/>'
   */
  "id": PropTypes.string,
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
