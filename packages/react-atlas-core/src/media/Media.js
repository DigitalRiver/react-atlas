import React, { PropTypes } from "react";
import cx from 'classNames';

/**
 * Component to handle Media, such as Videos and Pictures and resize them based on aspect ratio.
 */
const Media = ({ children, image, aspectRatio, ...other }) => {
  const innerClasses = cx({ "content": true }, aspectRatio);

  const bgStyle = {
    "backgroundImage": typeof image === "string" ? `url('${image}')` : undefined
  };

  return (
    <div styleName={cx(bgStyle)} {...other}>
      <div styleName={cx(innerClasses)}>
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
