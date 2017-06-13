import React from "react";
import PropTypes from 'prop-types';
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

export default Media;
