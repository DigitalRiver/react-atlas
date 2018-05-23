import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Text from "../Text";
import CSSModules from "react-css-modules";
import styles from "./Label.css";

export class Label extends React.PureComponent {
  render() {
    const {
      htmlFor,
      inline,
      label,
      leftLabel,
      required,
      status,
      style,
      tooltip,
      tooltipPosition,
      ...others
    } = this.props;

    const reqText = typeof required === "string" ? required : "*";

    let labelClasses = cx({
      "labelSpacing": !leftLabel,
      "label": true
    });

    let labelContainerClasses = cx({
      "tooltipRight": tooltipPosition === "right",
      "inline": leftLabel && inline,
      "labelContainer": true
    });

    let labelPadding = cx({
      "verticalPadding": !leftLabel,
      "horizontalPadding": true
    });

    const requiredClasses = cx({
      "required": true,
      "required_error": status === "error"
    });

    return (
      <div styleName={labelContainerClasses}>
        <div styleName={cx(labelPadding)}>
          {label && 
            <Text
              {...others}
              as="label"
              style={style}
              styleName={labelClasses}
              htmlFor={htmlFor}
            >
              {label}
            </Text>
          }
          {required &&
            required !== "" && 
              <span styleName={requiredClasses}>
                {" "}
                <Text>{reqText}</Text>
              </span>
            }
        </div>
        {tooltip}
      </div>
    );
  }
}

Label.propTypes = {
  /** Define an id to be used as the htmlFor attribute in the Label. */
  "htmlFor": PropTypes.string,
  /** Sets whether or not Label will display as inline. */
  "inline": PropTypes.bool,
  /** The text to be displayed in the Label. */
  "label": PropTypes.string,
  /** Allows user to move the label to the left of the TextField instead of above it.*/
  "leftLabel": PropTypes.bool,
  /** Sets the Label as required. Accepts a boolean or a string. If a string is passed it will be displayed instead of the traditional * next to the label text. */
  "required": PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Sets the status of the Label. Options are null, "success", "error", and "warning". */
  "status": PropTypes.string,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /** Sets an element to be displayed along with the Label. Traditionally used with the Tooltip component, but will accept any component or HTML element. */
  "tooltip": PropTypes.node,
  /** Sets the position of the embedded Tooltip. Defaults to "right", any other value will move it next to the label. */
  "tooltipPosition": PropTypes.string
};

Label.defaultProps = {
  "tooltipPosition": "right"
};

export default CSSModules(Label, styles, { "allowMultiple": true });
