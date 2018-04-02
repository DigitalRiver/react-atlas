import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Avatar component creates a circular area where an image, letter or icon/glyphicon can be presented. Great for user profiles and lists.
 * **NOTE**: children will always take precedence over props passed into component.
 */
class Avatar extends React.PureComponent {
  constructor(props) {
    super(props);
    let image = props.image ? props.image : props.defaultImage;
    this.state = { "image": image ? image : null };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.image !== this.props.image) {
      this.setState({ "image": nextProps.image });
    }
  };

  _handleBadImage = () => {
    /* If the default Image is equal to the bad image URL or the default image is undefined
        set this.state.image as null so avatar will fallback on a different prop. */
    if (
      this.props.defaultImage &&
      this.props.defaultImage !== this.state.image
    ) {
      this.setState({ "image": this.props.defaultImage });
      return;
    }
    this.setState({ "image": null });
  };

  render() {
    let { children, icon, title, className, ...others } = this.props;

    const filteredProps = Object.keys(others)
      .filter(prop => !Avatar.propTypes[prop])
      .reduce((obj, key) => {
        obj[key] = others[key];
        return obj;
      }, {});
    let avatar = null;
    if (this.state.image) {
      avatar = 
        <img
          src={this.state.image}
          title={title}
          onError={this._handleBadImage}
          styleName={"image"}
        />
      ;
    } else if (icon) {
      avatar = <i className={icon} />;
    } else if (title) {
      avatar = <span styleName={"letter"}>{title[0]}</span>;
    }

    return (
      <div
        {...filteredProps}
        title={title}
        className={cx(className)}
        styleName={"avatar"}
      >
        {children}
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
  /** An object, array, or string of CSS classes to apply to Avatar.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * A URL for an image that will be displayed when the main image fails to load.
   */
  "defaultImage": PropTypes.string,
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

export default Avatar;
