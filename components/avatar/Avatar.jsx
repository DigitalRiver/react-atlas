import React, {PropTypes} from 'react';
import FontIcon from '../font_icon';
import style from './style.css';

const Avatar = ({children, className, icon, image, title, ...other}) => {

  if (React.Children.count(children) == 1 && typeof children == 'string'){
    children = <span className={style.letter}>{children[0]}</span>;
  }

  let avatar = null;

  if (typeof image === 'string') {
    avatar = <img className={style.image} src={image} title={title} />
  } else if (image){
    avatar = image;
  } else if (typeof icon === 'string'){
    avatar = <FontIcon className={style.letter} value={icon} />
  } else if (icon){
    avatar = icon;
  } else if (title) {
    avatar = <span className={style.letter}>{title[0]}</span>
  }

  let classes = style.avatar;
  if (className) classes += ` ${className}`;

  return (
    <div data-react-toolbox='avatar' className={classes} {...other}>
      {children}
      {avatar}
    </div>
  );
};

Avatar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.string
};

export default Avatar;
