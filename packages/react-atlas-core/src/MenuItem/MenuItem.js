import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class MenuItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  render() {
  	const {
      title,
      link,
      childIndex,
      left
    } = this.props;

    const menuItemClasses = cx({
      "menuItem": true,
      "leftMenuItem": left
    });

  	return (
  		<li styleName={menuItemClasses}>
        <a styleName={"menuItemLink"} href="{link}">{title}</a> 
      </li>
  	);
  }
}

MenuItem.propTypes = {
  /**
   * Text for MenuItem
   * @examples 'Item One'
   */
  title: PropTypes.string,
};

MenuItem.defaultProps = {
	title: "Item One"
};

export default MenuItem;