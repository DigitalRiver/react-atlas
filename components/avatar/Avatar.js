import React, { PropTypes } from "react";
import style from "./avatar.css";

/**
 * Avatar component creates a circular area where an image, letter or icon/glyphicon can be presented. Great for user profiles and lists.
 * **NOTE**: children will always take precedence over props passed into component.
 */
const Avatar = ({children, className, icon, image, title, ...other}) => {
  let kids = children;
  if (React.Children.count(children) === 1 && typeof children === "string"){
    kids = <span className={style.letter}>{children[0]}</span>;
  }

  let avatar = null;

  if (typeof image === "string") {
    avatar = <img className={style.image} src={image} title={title} />;
  } else if (image){
    avatar = image;
  } else if (icon){
    avatar = icon;
  } else if (title) {
    avatar = <span className={style.letter}>{title[0]}</span>;
  }

  let classes = style.avatar;
  if (className) classes += ` ${className}`;

  return (
    <div className={classes} {...other}>
      {kids}
      {avatar}
    </div>
  );
};

Avatar.propTypes = {
  /**
   * Children should be either a string, an icon/glyphicon, or an image tag.
   * @examples "SomeName", <SomeIcon />, <img src="/path/to/image.jpg"/>
   */
  children: PropTypes.node,
  /**
   * A css class name that will be appended to the wrapping div around the avatar.
   */
  className: PropTypes.string,
  /**
   * For displaying an icon/glphyicon. Normally these will be another component or an element with a class on it.
   * @examples <FaPlus />, <span class="fa-plus"></span>
   */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Path to an image
   * @examples "http://path.to/an/image.jpg"
   */
  image: PropTypes.string,
  /**
   * A string. Avatar will use First letter of the string.
   * @examples "Nathan" will output "N"
   */
  title: PropTypes.string
};

Avatar.defaultProps = {
  className: '',
  icon: ''
};

export default Avatar;
