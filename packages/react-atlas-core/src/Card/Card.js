import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Simple Card component that wraps a div around content with card styling.
 */
class Card extends React.PureComponent {
  constructor(props) {
    super(props);

  }
  render() {
    const { children, className, legend, style, standardFieldset, image, title, width } = this.props;
    let Width = width ? width + "px" : null;
    let cardBody = children ?
      <div
        styleName={"cardBody"}
      >
        {children}
      </div>
      : null;

    let isFieldset = standardFieldset ? 
      <fieldset style={{ "width": Width}} styleName={"card"} className={cx(className)}>
        {legend && <legend styleName={"legend"}>{legend}</legend>}
        {children}
      </fieldset>
      : null;

    let useImage = image ? 
      <img
        src={image}
        styleName={"image"}
      />
      : null;

    let Title = title ?
      <div styleName={"title"}>{title}</div>
      : null;

    let card = !standardFieldset ? 
      <div        
        style={{ "width": Width}}
        styleName={"card"} 
      >
        {useImage}
        {Title}
        {cardBody}
      </div>
      : null;

    return (
      <div 
        style={style}
        className={cx(className)}
      >
        {isFieldset}
        {card}
      </div>
    );
  }
}

Card.propTypes = {
  /**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  "children": PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to card.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * Path to an image that will be displayed in Card.
   * @examples "http://path.to/an/image.jpg"
   */
  "image": PropTypes.string,

  /**
   * Legend that will be displayed on Card when standardFieldset prop is true.
   */
  "legend": PropTypes.string,

  /**
   * When true, will generate a fieldset Card.
   * @example <Card standardFieldset>{children}</Card>
   */
  "standardFieldset": PropTypes.bool,

  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,

  /**
   * Title that will be displayed inside Cards that do not have the standardFieldset prop.
   * @examples "Title Words" will output "Title Words"
   */
  "title": PropTypes.string,

  /**
   * Will determine the width of the Card.
   */
  "width": PropTypes.number
};

export default Card;