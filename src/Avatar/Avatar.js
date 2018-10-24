import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./Avatar.css";
import blacklist from "blacklist";

/**
 * Avatar component creates a circular area where an image, letter or icon/glyphicon can be presented. Great for user profiles and lists.
 * **NOTE**: children will always take precedence over props passed into component.
 * Precedence Order: image, fallbackImage, icon, title.
 */
export class Avatar extends React.PureComponent {
  constructor(props) {
    super(props);
    let image = props.image ? props.image : props.fallbackImage;
    this.state = { "image": image ? image : null };
  }

  componentDidUpdate = prevProps => {
    if (this.props.image !== prevProps.image) {
      this.setState({ "image": this.props.image });
    }
  };

  _handleBadImage = () => {
    /* If the default Image is equal to the bad image URL or the default image is undefined
        set this.state.image as null so avatar will fallback on a different prop. */
    if (
      this.props.fallbackImage &&
      this.props.fallbackImage !== this.state.image
    ) {
      this.setState({ "image": this.props.fallbackImage });
      return;
    }
    this.setState({ "image": null });
  };

  _getContent = () => {
    if (this.props.children) {
      return this.props.children;
    }
    let avatar = null;
    if (this.state.image) {
      avatar = 
        <img
          src={this.state.image}
          title={this.props.title}
          onError={this._handleBadImage}
          styleName={"image"}
        />
      ;
    } else if (this.props.icon) {
      avatar = <i className={this.props.icon} />;
    } else if (this.props.title) {
      avatar = <span styleName={"letter"}>{this.props.title[0]}</span>;
    }
    return avatar;
  };

  render() {
    let { title, className, style, ...others } = this.props;

    // Declaring the following variables so they don't get passed to TextField through the prop spread.
    const othersFiltered = blacklist(
      others,
      "children",
      "fallbackImage",
      "icon",
      "image"
    );

    return (
      <div
        {...othersFiltered}
        title={title}
        className={cx(className)}
        styleName={"avatar"}
        style={style}
      >
        {this._getContent()}
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
  /** An object, array, or string of CSS classes to apply to Avatar.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * A URL for an image that will be displayed when the main image fails to load.
   */
  "fallbackImage": PropTypes.string,
  /**
   * For displaying an icon/glphyicon. Usually another component or an element with a class on it.
   * @examples <GithubIcon />, <i class="fa fa-github"></i>
   */
  "icon": PropTypes.string,
  /**
   * Path to an image.
   * @examples "http://path.to/an/image.jpg"
   */
  "image": PropTypes.string,
  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,
  /**
   * Avatar will use the first letter of the title string when children, image, and icon are not supplied.
   * @examples "Nathan" will output "N"
   */
  "title": PropTypes.string
};

export default CSSModules(Avatar, styles, { "allowMultiple": true });
