import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Task extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      icon,
      id,
      index,
      onClick,
      selected,
      style,
      title
    } = this.props;

    const taskLinkClasses = cx({
      "taskLink": true,
      "selected": selected
    });

    return (
      <span
        id={id}
        style={style}
        className={cx(className)}
        styleName={taskLinkClasses}
        onClick={e => {
          if (onClick) {
            onClick(e, id, index);
          }
        }}
      >
        {icon ? <i styleName="icon-left" className={icon} /> : null}
        {title}
      </span>
    );
  }
}

Task.propTypes = {
  /** An Object, array, or string of CSS classes to apply to CheckboxGroup.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Adds font-awesome icon to left of title
   */
  "icon": PropTypes.string,
  /**
   * Will set the html "id" property on the Button.
   */
  "id": PropTypes.string,
  /**
   * The index of the Task within the parent Taskbar.
   */
  "index": PropTypes.number,
  /**
   * Function that will be executed on click.
   */
  "onClick": PropTypes.func,
  /**
   * Adds selected class if true
   */
  "selected": PropTypes.bool,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /**
   * Text for task
   * @examples 'Item One'
   */
  "title": PropTypes.string
};

Task.defaultProps = {
  "title": "Item One"
};

export default Task;
