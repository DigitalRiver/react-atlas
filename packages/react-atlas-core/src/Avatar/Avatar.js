import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Avatar component creates a circular area where an image, letter or icon/glyphicon can be presented. Great for user profiles and lists.
 *
 * **NOTE**: children will always take precedence over props passed into component.
 */
class Avatar extends React.PureComponent {
  constructor(props) {
    super(props);

    let image;

    // checks if image prop was defined.
    // if not defaultImage is checked and if this is undefined the image is set to null else image is set to defaultImage prop
    if (typeof props.image === "undefined") {
      if (typeof props.defaultImage === "undefined") {
        image = null;
      } else {
        image = props.defaultImage;
      }
    } else {
      image = props.image;
    }

    this.state = { "image": image };
    this.handleBadImage = this.handleBadImage.bind(this);
  }

  handleBadImage() {
    /* If the default Image is equal to the bad image URL or the default image is undefined
        set this.state.image as null so avatar will fallback on a different prop. */
    if (
      this.props.defaultImage === this.state.image ||
      typeof this.props.defaultImage === "undefined"
    ) {
      this.setState({ "image": null });
      return;
    }

    this.setState({ "image": this.props.defaultImage });
  }

  render() {
    let { children, icon, title, style, className } = this.props;
    let kids = children;
    if (React.Children.count(children) === 1 && typeof children === "string") {
      kids = <span styleName={"letter"}>{children[0]}</span>;
    }

    let avatar = null;
    let image = this.state.image;

    if (typeof image === "string") {
      avatar = 
        <img
          src={image}
          title={title}
          onError={this.handleBadImage}
          styleName={"image"}
        />
      ;
    } else if (image) {
      avatar = image;
    } else if (icon) {
      avatar = icon;
    } else if (title) {
      avatar = <span styleName={"letter"}>{title[0]}</span>;
    }

    return (
      <div title={title} className={cx(className)} style={style} styleName={"avatar"}>
        {kids}
        {avatar}
      </div>
    );
  }
}

Avatar.propTypes = {
  /**
   * Children should be either a string, an icon/glyphicon, or an image tag.
   * @examples "SomeName", <SomeIcon />, <img src="/path/to/image.jpg"/>
   */
  "children": PropTypes.node,
  /** An Object, array, or string of CSS classes to apply to avatar.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * For displaying an icon/glphyicon. Normally these will be another component or an element with a class on it.
   * @examples <GithubIcon />, <i class="fa fa-github"></i>
   */
  "icon": PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Path to an image
   * @examples "http://path.to/an/image.jpg"
   */
  "image": PropTypes.string,
  /**
   * A string. Avatar will use the first letter of the string.
   * @examples "Nathan" will output "N"
   */
  "title": PropTypes.string,
  /**
   * A URL to a image that is displayed when the main image fails to load.
   */
  "defaultImage": PropTypes.string,

  /**
   * Prop to pass inline styles.
   */
  "style": PropTypes.object
};

export default Avatar;
