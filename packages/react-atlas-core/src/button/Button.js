import React from "react";
import PropTypes from "prop-types";
import cx from "classNames";

/**
 * A Generic button component.
 */
class Button extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onClick,
      className,
      children,
      disabled,
      large,
      small,
      primary,
      secondary,
      warning,
      danger,
      link,
      outline
    } = this.props;

    /**
     * Use cx to construct a CSS class object.
     * cx will automatically remove falsy values
     * for us. This way only passed props will be
     * transformed into CSS classes.
     */
    const classes = cx({
      "disabled": disabled,
      "large": large,
      "small": small,
      "primary": primary,
      "secondary": secondary,
      "warning": warning,
      "danger": danger,
      "link": link,
      "button": true
    });
    return (
      <button onClick={onClick} className={cx(className)} styleName={classes}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  /**
     * Define a mini button.
     *
     */
  "children": PropTypes.node,
  /**
     * define a custom css class name
     * @examples "btn", "btn-active"
     */
  "className": PropTypes.string,
  /**
     * define a custom css class name
     * @examples "btn", "btn-active"
     */
  "disabled": PropTypes.bool,
  /**
     * use outline styled button
     * @examples <Button outline>
     */
  "outline": PropTypes.bool,
  /**
     * define button href if anchor
     * @examples '#', 'http://some-website.com/'
     */
  "primary": PropTypes.bool,
  /**
     * use secondary style button
     * @examples <Button secondary>
     */
  "secondary": PropTypes.bool,
  /**
     * use success style button
     * @examples <Button success>
     */
  "success": PropTypes.bool,
  /**
     * use warning style button
     * @examples <Button warning>
     */
  "warning": PropTypes.bool,
  /**
     * use danger style button
     * @examples <Button danger>
     */
  "danger": PropTypes.bool,
  /**
     * use link style button
     * @examples <Button link>
     */
  "link": PropTypes.bool,
  /**
     * use large style button
     * @examples <Button large>
     */
  "large": PropTypes.bool,
  /**
     * use small style button
     * @examples <Button small>
     */
  "small": PropTypes.bool
};

Button.defaultProps = {
  "children": "Default Button",
  "outline": false,
  "primary": false,
  "secondary": false,
  "success": false,
  "warning": false,
  "danger": false,
  "link": false,
  "large": false,
  "small": false,
  "disabled": false
};

export default Button;
