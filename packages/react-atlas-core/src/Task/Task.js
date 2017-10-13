import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Task extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  render() {
    const { title, selected, icon } = this.props;

    const taskLinkClasses = cx({
      taskLink: true,
      selected: selected
    });

    return (
      <li styleName={"task"}>
        <span styleName={taskLinkClasses}>
          {icon ? <i className={cx(icon, "ra_Task__icon-left")} /> : null}
          {title}
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  /**
   * Text for task
   * @examples 'Item One'
   */
  title: PropTypes.string,
  /**
   * Adds selected class if true
   */
  selected: PropTypes.bool,
  /**
   * Adds font-awesome icon to left of title
   */
  icon: PropTypes.string
};

Task.defaultProps = {
  title: "Item One"
};

export default Task;
