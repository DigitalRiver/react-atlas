import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames/bind';
import style from './media.css';

const propTypes = {
	aspectRatio: PropTypes.oneOf([ 'wide', 'square' ]),
	children: PropTypes.any,
	className: PropTypes.string,
	color: PropTypes.string,
	contentOverlay: PropTypes.bool,
	image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
	])
};

class Media extends Component {
  render () {
    const { aspectRatio, children, className, color, contentOverlay, image, ...other } = this.props;
    const cx = ClassNames.bind(style);
    let classes = cx({
      wide: aspectRatio === 'wide',
      square: aspectRatio === 'square'
    });

	if (className) classes += ` ${className}`;

	const innerClass = cx({
      content: true
	});

    const bgStyle = {
      backgroundImage: typeof image === 'string' ? `url('${image}')` : undefined
    };

    return (
      <div style={bgStyle} className={classes} {...other}>
        <div className={innerClass}>
          {children}
        </div>
      </div>
    );
  }
}

Media.propTypes = propTypes;

export default Media;
