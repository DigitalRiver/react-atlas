import React from "react";
import PropTypes from "prop-types";
import { InputCore } from "../Input";
import cx from "classnames";
import { TooltipCore } from "./../Tooltip";

class TextArea extends React.PureComponent {
  constructor(props) {
    super(props);

    let isValid;
    if (typeof props.isValid === "undefined") {
      isValid = true;
    } else if (props.isValid === false) {
      isValid = props.isValid;
    } else {
      isValid = props.isValid;
    }

    if (this.props.tooltip && !this.props.label) {
      throw "Tooltip requires Label";
    }

    // Initial state
    this.state = {
      "value": typeof props.value === "undefined" || props.value === null ? "" : props.value,
      "remaining": props.maxLength,
      "active": false,
      "isValid": isValid
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.isValid !== "undefined" &&
      nextProps.isValid !== this.state.valid
    ) {
      this.setState({ "valid": nextProps.isValid });
    }
  }

  _handleChange = (value, event, isValid) => {
    event.persist();

    if (this.props.maxLength) {
      // Keep difference between maxlength and input value in state for count
      this.setState({ "remaining": this.props.maxLength - value.length });
    }

    // Set value and isValid state depending on InputCore state
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
    this.setState({ "active": false });
  };

  render() {
    const {
      id,
      name,
      label,
      placeholder,
      maxLength,
      resizable,
      small,
      medium,
      large,
      required,
      disabled,
      hidden,
      className,
      style,
      tooltip,
      tooltipRight,
      leftLabel,
      rows
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

    let remainingCount = maxLength && 
      <div styleName={"remainingCount"}>
        {maxLength - this.state.remaining}/{maxLength}
      </div>
    ;
    const forId = id !== "" && name !== "" ? id : "";

    let labelClasses = cx({
        "leftLabel": leftLabel,
        "label": true,
        "labelFont": true,
        "labelSpacing": true
    });

    let textAreaLabel = label &&
        <label styleName={labelClasses} title={label} htmlFor={forId}>
          <span styleName={"headerFont"}>{label}</span>
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
        </label>
    ;

    let wrapperClasses = cx(
      {
        hidden,
        small,
        medium,
        large
      },
      "textareaWrapper"
    );

    let textAreaClasses = cx(
      {
        resizable,
        disabled,
        "active": this.state.active,
        "invalid": !this.state.isValid
      },
      "textarea"
    );

      const contentClasses = cx({
          "content": true,
          "leftLabelContent": leftLabel,
          "fullWidth": true
      });

    return (
      <div
        style={style}
        styleName={wrapperClasses}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        className={cx(className)}
      >
        {textAreaLabel}
        <div styleName={contentClasses}>
            <InputCore
              id={id}
              multiline
              rows={rows}
              name={name}
              placeholder={placeholder}
              maxLength={maxLength}
              styleName={textAreaClasses}
              onChange={this._handleChange}
              required={required}
              disabled={disabled}
              hidden={hidden}
              value={this.state.value}
              isValid={this.state.isValid}
            />
        </div>
        {remainingCount}
      </div>
    );
  }
}

TextArea.propTypes = {
  "isValid": PropTypes.bool,
  /** An Object, array, or string of CSS classes to apply to TextArea.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
    * Define a name for the textarea input.
    * @examples '<TextArea id="test"/>'
    */
  "id": PropTypes.string,
  /**
   * Define a name for the textarea input.
   * @examples '<TextArea name="test"/>'
   */
  "name": PropTypes.string,
  /**
   * Define a value for the textarea input.
   * @examples '<TextArea value="test"/>'
   */
  "value": PropTypes.string,
  /**
   * Define a title or label to be displayed above the textarea.
   * @examples '<TextArea label="test"/>'
   */
  "label": PropTypes.string,
  /**
   * Defines a resizable textarea. Default: true.
   * @examples '<TextArea resizable={false}/>'
   */
  "resizable": PropTypes.bool,
  /**
   * Defines a small sized textarea.
   * @examples '<TextArea small/>'
   */
  "small": PropTypes.bool,
  /**
   * Defines a medium sized textarea.
   * @examples '<TextArea medium/>'
   */
  "medium": PropTypes.bool,
  /**
   * Defines a large sized textarea.
   * @examples '<TextArea large/>'
   */
  "large": PropTypes.bool,
  /**
   * Sets a maximum character length that will be validated onChange.
   * @examples '<TextArea maxLength={25}/>'
   */
  "maxLength": PropTypes.number,
  /**
   * Defines placeholder text.
   * @examples '<TextArea placeholder="test input"/>'
   */
  "placeholder": PropTypes.string,
  /**
   * Sets a handler function to be executed when onChange event occurs (at input element).
   * @examples <TextArea onChange={this.customOnChangeFunc}/>
   */
  "onChange": PropTypes.func,
  /**
   * Sets the field as required. Will be validated onChange.
   * @examples '<TextArea required/>'
   */
  "required": PropTypes.bool,
  /**
   * Determines if the textarea is disabled.
   * @examples '<TextArea disabled/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the textarea is hidden.
   * @examples '<TextArea hidden/>'
   */
  "hidden": PropTypes.bool,
  /**
   * Set the tooltip value *
   */
  "tooltip": PropTypes.string,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /**
   * Positions the tooltip to the right. Default true.
   */
  "tooltipRight": PropTypes.bool,
  /**
   * Allows user to move the label to the left of the TextArea instead of having it on top
   */
  "leftLabel": PropTypes.bool,
  /**
    * Specifies the amount of rows
    */
  "rows": PropTypes.number
};

TextArea.defaultProps = {
  "className": "",
  "resizable": true,
  "disabled": false,
  "hidden": false,
  "tooltipRight": true
};

export default TextArea;
