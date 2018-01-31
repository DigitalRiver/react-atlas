import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Master Icon component. Used as a stand alone component or in conjunction with button and avatar
 */
class Icon extends React.PureComponent {
  constructor(props) {
    super(props);    

    if (!this.props.icon) {
      console.warn(
        "You are attempting to use an icon without passing in an icon property."
      );
    }
  }

  render() {
    const {
      className,
      small,
      large,
      style,
      onClick,
      icon
    } = this.props;

    let iconClasses = cx({
      "large": large,
      "small": small,
      "icon": true
    });

    const iconContainer = icon ? <i style={style} className={icon}/> : null;

    return (
      <span className={cx(className)} onClick={onClick} styleName={iconClasses} style={style} >
        {iconContainer}
      </span>
    );
  }
}

Icon.propTypes = {
  /** An Object, array, or string of CSS classes to apply to Input.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Defines an icon for the icon.
   * @examples '<Icon icon={"fa fa-id-card"}/>'
   */
  "icon": PropTypes.string,
  /**
   * Defines a small sized icon element.
   * @examples '<Icon small icon={"fa fa-id-card"}/>'
   */
  "small": PropTypes.bool,
  /**
   * Defines a large sized icon element.
   * @examples '<Icon large icon={"fa fa-id-card"}/>'
   */
  "large": PropTypes.bool,
  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

export default Icon;
