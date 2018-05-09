import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Text extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      as,
      body,
      children,
      className,
      htmlFor,
      id,
      style,
      ...other
    } = this.props;

    const textStyles = cx({
      "blockquote": as === "blockquote",
      "bodyFont": body,
      "code": as === "code",
      "defaultFont": !body && as !== "label",
      "h1": as === "h1",
      "h2": as === "h2",
      "h3": as === "h3",
      "h4": as === "h4",
      "h5": as === "h5",
      "h6": as === "h6",
      "label": as === "label",
      "link": as === "a",
      "small": as === "small"
    });

    const TextElement = `${this.props.as}`;

    let element = 
      <TextElement
        id={id}
        htmlFor={htmlFor}
        style={style}
        className={className}
        styleName={textStyles}
        {...other}
      >
        {children}
      </TextElement>
    ;

    return element;
  }
}

Text.propTypes = {
  /** Defines what HTML element to render the Text component as. Possibilities include, but are not limited to b, body, del, em, h1, h2, h3, h4, h5, h6, i, ins, label, mark, p, small, strong, sub, and sup. */
  "as": PropTypes.string,
  /** Allows theme to differentiate font-family between default font and body copy in variables.css */
  "body": PropTypes.bool,
  /**
   * Text, any HTML element, or React Component.
   */
  "children": PropTypes.node,
  /** An Object, array, or string of CSS classes to apply to Input. */
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /** Adds a "for" attribute to your element. Intended to be used when setting the as property to "label". */
  "htmlFor": PropTypes.string,
  /**
   * Defines an id for the input.
   * @examples '<Text as="text" name="test"/>'
   */
  "id": PropTypes.string,
  /** Pass inline styling here. */
  "style": PropTypes.object
};

Text.defaultProps = {
  "as": "span"
};

export default Text;
