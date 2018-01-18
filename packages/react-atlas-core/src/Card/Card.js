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

  /** An Object, array, or string of CSS classes to apply to card.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * Title of the Card
   */
  "legend": PropTypes.string,

  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,

  /**
   * Path to an image
   * @examples "http://path.to/an/image.jpg"
   */
   "image": PropTypes.string,

  /**
   * A string. 
   * @examples "Title Words" will output "Title Words"
   */
  "title": PropTypes.string,

  /**
   * A width. 
   */
  "width": PropTypes.number,

  /**
   * Used for non fieldset cards
   * @example <Card standardFieldset>{children}</Card>
   */
  "standardFieldset": PropTypes.boolean
};

export default Card;