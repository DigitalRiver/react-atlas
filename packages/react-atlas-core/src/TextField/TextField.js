import React from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import { TooltipCore } from "./../Tooltip";
import { ButtonCore } from "./../Button";
import cx from "classnames";

class TextField extends React.PureComponent {
  constructor(props) {
    super(props);

    if (this.props.tooltip && !this.props.label) {
      throw "Tooltip requires Label";
    }

    // Initial state
    this.state = {
      "active": false,
      "value":
        typeof props.value === "undefined" || props.value === null
          ? ""
          : props.value
    };
  }

  componentDidMount() {
    this.setState({ "isValid": this.props.isValid });
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.isValid !== "undefined" &&
      nextProps.isValid !== this.state.isValid
    ) {
      this.setState({ "isValid": nextProps.isValid });
    }
    if (nextProps.value && nextProps.value !== this.props.value) {
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

  _handleFocus = () => {
    this.setState({ "active": true });
  };

  _handleBlur = () => {
    if(typeof this.props.onBlur !== 'undefined') {
      this.props.onBlur();
    }
    this.setState({ "active": false });
  };

  render() {
    const {
      name,
      id,
      type,
      label,
      leftLabel,
      placeholder,
      maxLength,
      small,
      medium,
      large,
      required,
      requiredText,
      validator,
      errorText,
      mask,
      disabled,
      hidden,
      className,
      inline,
      style,
      tooltip,
      tooltipRight,
      link,
      linkRight,
      linkText,
      linkOnClick,
      uppercase,
      href,
      ...others
    } = this.props;

    let labelClasses = cx({
      "leftLabel": leftLabel,
      "label": true,
      "labelFont": true,
      "labelSpacing": true
    });

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

    let buttonClasses = cx({
      "buttonAlignment": true,
      "buttonAlignmentRight": linkRight
    });

    let buttonInternalClasses = cx(
      "ra_Button__button",
      "ra_Button__base",
      "ra_styles__button-marg-1",
      "ra_styles__default-text",
      "ra_styles__cursor-pointer",
      "ra_styles__primary-button-border-width",
      "ra_styles__default-font",
      "ra_styles__rounded",
      "ra_Button__link",
      "ra_styles__border-none",
      "ra_styles__sky-blue",
      "ra_styles__border-transparent",
      "ra_styles__bg-transparent"
    );

    const reqText = typeof requiredText !== "undefined" ? requiredText : "*";

    let textFieldLabel = label &&
      <div styleName={labelClasses}>
        <label styleName="labelPadding" htmlFor={id}>
          {label}
        </label>
        {required && <span styleName={"error_text"}> {reqText}</span>}
        {tooltip &&
          <span styleName={tooltipClasses}>
            <TooltipCore
              className={tooltipInternalClasses}
              text={tooltip}
              position="top"
            />
          </span>
        }
        {link &&
          <span styleName={buttonClasses}>
            <ButtonCore
              ignoreTab
              className={buttonInternalClasses}
              href={href}
              onClick={linkOnClick}
            >
              {linkText}
            </ButtonCore>
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

    let fieldDisplayClasses = cx({
      "leftLabelContent": leftLabel
    });

    return (
      <div
        style={style}
        styleName={wrapperClasses}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        className={cx(className)}
      >
        {textFieldLabel}
        <div styleName={fieldDisplayClasses}>
          <InputCore
            {...others}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={this.state.value}
            maxLength={maxLength}
            styleName={textFieldClasses}
            onChange={(value, event, isValid) =>
              this._handleChange(value, event, isValid)
            }
            required={required}
            validator={validator}
            errorText={errorText}
            mask={mask}
            uppercase={uppercase}
            disabled={disabled}
            isValid={this.state.isValid}
            hidden={hidden}
          />
        </div>
      </div>
    );
  }
}

TextField.propTypes = {
  /**
   * Sets if the TextField is valid.
   */
  "isValid": PropTypes.bool,
  /** Define an id for the text input.*/
  "id": PropTypes.string,
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
   * Define a label to be displayed above the textfield.
   * @examples '<TextField label="test"/>'
   */
  "label": PropTypes.string,
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
   * Sets the text to show next to the label for a required TextField. If omitted will default to *.
   * @examples '<TextField required requiredText="required"/>'
   */
  "requiredText": PropTypes.string,
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

  "tooltipRight": PropTypes.bool,

  /** Set if you want a link button next to the textfield label. **/
  "link": PropTypes.bool,
  /** Set if you want the link button to the right of the textfield label. **/
  "linkRight": PropTypes.bool,
  /** The text of the link button. **/
  "linkText": PropTypes.string,
  /** Callback to call when link button is clicked. **/
  "linkOnClick": PropTypes.func,
  /** HREF to set on the link button. **/
  "href": PropTypes.string,
  /**
   * Converts all entered text to uppercase.
   */
  "uppercase": PropTypes.bool,
  /**
   * Allows user to move the label to the left of the TextField instead of above it
   */
  "leftLabel": PropTypes.bool,

  /**
   * A callback that fires onBlur.
   */
   "onBlur": PropTypes.func
};

TextField.defaultProps = {
  "type": "text",
  "isValid": true
};

export default TextField;
