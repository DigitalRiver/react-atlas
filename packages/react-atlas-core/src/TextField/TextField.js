import React from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import { TooltipCore } from "./../Tooltip";
import cx from "classnames";

class TextField extends React.PureComponent {
  constructor(props) {
    super(props);

    if (this.props.tooltip && !this.props.header) {
      throw "Tooltip requires Header";
    }

    // Initial state
    this.state = {
      "active": false,
      "value": this.props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.isValid !== "undefined" &&
      nextProps.isValid !== this.state.isValid
    ) {
      this.setState({ "isValid": nextProps.isValid });
    }
    if(nextProps.value && nextProps.value !== this.props.value) {
      this.setState({
        "value": nextProps.value
      });
    }
  }

  _handleChange = (value, event, isValid) => {
    event.persist();

    if (this.props.maxLength) {
      // Keep difference between maxlength and input value in state for count
      this.setState({ "remaining": this.props.maxLength - value.length });
    }

    this.setState({
      "value": value,
      "isValid": isValid
    });

    if (this.props.onChange) {
      // Execute app code
      this.props.onChange(value, event, isValid);
    }
  };

  componentDidMount() {
    this.setState({"isValid": this.props.isValid});
  }

  _handleFocus = () => {
    this.setState({ "active": true });
  };

  _handleBlur = () => {
    this.setState({ "active": false });
  };

  render() {
    const {
      name,
      type,
      header,
      placeholder,
      maxLength,
      small,
      medium,
      large,
      required,
      validator,
      errorText,
      mask,
      disabled,
      hidden,
      className,
      inline,
      style,
      tooltip,
      tooltipRight
    } = this.props;

    let tooltipClasses = cx({
      "tooltipAlignment": true,
      "tooltipRight": tooltipRight
    });

    let tooltipInternalClasses = cx({
      "ra_Tooltip__tooltip": true,
      "ra_Tooltip__active": true,
      "ra_Tooltip__tooltip-right": true,
      "ra_Tooltip__tooltipContent": true,
      "ra_Tooltip__block": true
    });

    let textFieldHeader = header &&
      <div styleName={"header"}>
        <span styleName={"headerFont"}>{header}</span>
        {required && <span styleName={"error_text"}> *</span>}
        {tooltip &&
          <span styleName={tooltipClasses}>
            <TooltipCore
              className={tooltipInternalClasses}
              text={tooltip}
              position="top"
            />
          </span>
        }
      </div>
    ;

    let wrapperClasses = cx(
      {
        hidden,
        small,
        medium,
        large,
        inline
      },
      "textfieldWrapper"
    );

    let textFieldClasses = cx(
      {
        disabled,
        "active": this.state.active,
        "invalid": !this.state.isValid
      },
      "textfield"
    );

    return (
      <div
        style={style}
        styleName={wrapperClasses}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        className={cx(className)}
      >
        {textFieldHeader}
        <InputCore
          type={type}
          name={name}
          placeholder={placeholder}
          value={this.state.value}
          maxLength={maxLength}
          styleName={textFieldClasses}
          onChange={(value, event, isValid) =>
            this._handleChange(value, event, isValid)}
          required={required}
          validator={validator}
          errorText={errorText}
          mask={mask}
          disabled={disabled}
          isValid={this.state.isValid}
          hidden={hidden}
        />
      </div>
    );
  }
}

TextField.propTypes = {
  /**
   * Sets if the TextField is valid.
   */
  "isValid": PropTypes.bool,
  /** An Object, array, or string of CSS classes to apply to TextField.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
	 * Define a name for the text input.
	 * @examples '<TextField name="test"/>'
	 */
  "name": PropTypes.string,
  /**
   * Define a type for the text input. Default is "text".
   * @examples '<TextField type="password"/>'
   */
  "type": PropTypes.string,
  /**
   * Define a default value for the text input.
   * @examples '<TextField value="Textfield value here"/>'
   */
  "value": PropTypes.string,
  /**
	 * Defines a small sized text input.
	 * @examples '<TextField small/>'
	 */
  "small": PropTypes.bool,
  /**
   * Define a title or header to be displayed above the textfield.
   * @examples '<TextField header="test"/>'
   */
  "header": PropTypes.string,
  /**
	 * Defines a medium sized text input.
	 * @examples '<TextField medium/>'
	 */
  "medium": PropTypes.bool,
  /**
	 * Defines a large sized text input.
	 * @examples '<TextField large/>'
	 */
  "large": PropTypes.bool,
  /**
   * Sets a maximum character length that will be validated onChange.
   * @examples '<TextField maxLenght={25}/>'
   */
  "maxLength": PropTypes.number,
  /**
   * Sets a handler function to be executed and validate against. If it returns any falsy value, validation error will trigger.
   * @examples '<TextField validator={this.customValidator}/>'
   */
  "validator": PropTypes.func,
  /**
   * Defines the error text to be shown when custom validation occurs.
   * @examples '<TextField errorText="Custom error message."/>'
   */
  "errorText": PropTypes.string,
  /**
   * Sets a mask for the input field.
   * @examples '<TextField mask="AAA 11111"/>'
   */
  "mask": PropTypes.string,
  /**
   * Defines placeholder text.
   * @examples '<TextField placeholder="test input"/>'
   */
  "placeholder": PropTypes.string,
  /**
	 * Sets a handler function to be executed when onChange event occurs (at input element).
	 * @examples <TextField onChange={this.customOnChangeFunc}/>
	 */
  "onChange": PropTypes.func,
  /**
   * Sets the field as required. Will be validated onChange.
   * @examples '<TextField required/>'
   */
  "required": PropTypes.bool,
  /**
	 * Determines if the text input is disabled.
	 * @examples '<TextField disabled/>'
	 */
  "disabled": PropTypes.bool,
  /**
	 * Determines if the text input is hidden.
	 * @examples '<TextField hidden/>'
	 */
  "hidden": PropTypes.bool,

  /** Pass inline styling here. */
  "style": PropTypes.object,

  /** Sets whether or not TextField will display as inline */
  "inline": PropTypes.bool,

  /** passes tooltip as prop if added to textField */
  "tooltip": PropTypes.string,

  "tooltipRight": PropTypes.bool
};

TextField.defaultProps = {
  "type": "text",
  "isValid": true
};

export default TextField;
