import React, { PropTypes } from "react";
import themeable from 'react-themeable';

/**
 * Avatar component creates a circular area where an image, letter or icon/glyphicon can be presented. Great for user profiles and lists.
 *
 * **NOTE**: children will always take precedence over props passed into component.
 */
 class Avatar extends React.Component {
   constructor(props) {
     super(props);

     var image;

     if(this.props.image == undefined) {
       if(this.props.defaultImage == undefined) {
         image = null;
       } else {
         image = this.props.defaultImage;
       }
     } else {
       image = this.props.image;
     }

     this.state = {image: image, title: this.props.title, icon: this.props.icon};
   }

   handleBadImage() {
     if(this.props.defaultImage === this.state.image) {
        this.setState({image: null});
        return;
     }

     this.setState({image: this.props.defaultImage});
   }

   render() {
     const theme = themeable(this.props.theme);
     var children = this.props.children;
     let kids = children;
     if (React.Children.count(children) === 1 && typeof children === "string"){
       kids = <span {...theme(4, 'letter')}>{children[0]}</span>;
     }

     let avatar = null;
     var icon = this.state.icon;
     var image = this.state.image;
     var title = this.state.title;

     if (typeof image === "string") {
       avatar = <img src={image} title={title} onError={this.handleBadImage.bind(this)} {...theme(3, 'image')} />;
     } else if (image) {
       avatar = image;
     } else if (icon) {
       avatar = icon;
     } else if (title) {
       avatar = <span {...theme(2, 'letter')}>{title[0]}</span>;
     }
     return (
       <div {...theme(1, 'avatar')}>
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
  children: PropTypes.node,
  /**
   * A css class name that will be appended to the wrapping div around the avatar.
   */
  className: PropTypes.string,
  /**
   * For displaying an icon/glphyicon. Normally these will be another component or an element with a class on it.
   * @examples <GithubIcon />, <i class="fa fa-github"></i>
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
  title: PropTypes.string,

  /**
   * A URL to a image that is displayed when the main image fails to load.
   */
  defaultImage: PropTypes.string
};

Avatar.defaultProps = {
  className: '',
  icon: ''
};

Avatar.styleguide = {
  category: 'Avatar',
  index: '2.1',
  example: `
  <section>
    <h5>Avatars</h5>
    {/* background color change */}
    <Avatar style={{backgroundColor: 'deepskyblue'}} >
      <i className="fa fa-github"></i>
    </Avatar>
    {/* title prop gets truncated to 1st letter */}
    <Avatar title="Nathan" />
    {/* icon beats title */}
    <Avatar title="Nathan" icon={<i className="fa fa-github"></i>} />
    {/* image beats icon */}
    <Avatar
      icon={<i className="fa fa-github"></i>}
      image="cat.jpg"
    />
    {/* image beats title */}
    <Avatar title="Javier" image="cat.jpg" />
    {/* child beats parameters */}
    <Avatar title="Nathan" image="cat.jpg">
      <i className="fa fa-github"></i>
    </Avatar>
    <Avatar title="Nathan" icon={<i className="fa fa-github"></i>}>
      <img src="cat.jpg"/>
    </Avatar>
    {/* child string gets truncated to 1st letter */}
    <Avatar>Nathan</Avatar>
    {/* child should be <i>, <svg>, <img>, or string */}
    <Avatar><i className="fa fa-github"></i></Avatar>
  </section>
  `
};
export default Avatar;
