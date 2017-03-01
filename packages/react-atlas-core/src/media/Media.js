import React, { PropTypes } from "react";
import { classNames } from "../utils";
import themeable from "react-themeable";

/**
 * Component to handle Media, such as Videos and Pictures and resize them based on aspect ratio.
 */
const Media = ({ children, image, ...other }) => {
  const theme = themeable(other.theme);
  const innerClasses = classNames({ "content": true });

  const bgStyle = {
    "backgroundImage": typeof image === "string" ? `url('${image}')` : undefined
  };

  return (
    <div style={bgStyle} {...other}>
      <div {...theme(2, ...innerClasses)}>
        {children}
      </div>
    </div>
  );
};

Media.propTypes = {
  "aspectRatio": PropTypes.oneOf(["wide", "square"]),
  "children": PropTypes.any,
  "className": PropTypes.string,
  "color": PropTypes.string,
  "contentOverlay": PropTypes.bool,
  "image": PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

Media.defaultProps = { "theme": { "content": true } };

Media.styleguide = {
  "example": 
    `
<section>
  <h5>Media</h5>
  <div style={{"width": "400px", margin: "auto"}}>
    <Media aspectRatio="square" image="nature.jpg" />
  </div>
  <div style={{"width": "400px", margin: "auto"}}>
    <Media aspectRatio="wide">
      <iframe width="1280" height="720" src="https://www.youtube.com/embed/sGbxmsDFVnE?rel=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe>
    </Media>
  </div>
</section>
`
  
};

export default Media;
