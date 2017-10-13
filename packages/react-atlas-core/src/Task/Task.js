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
  	const {
      title,
      selected,
      icon,
      link
    } = this.props;

    const taskLinkClasses = cx({
      "taskLink": true,
      "selected": selected
    });

    const iconClass = cx({
      icon: true,
      "icon-left": icon
    })

    const linkString = link || "";

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
};

Task.defaultProps = {
	title: "Item One"
};

export default Task;