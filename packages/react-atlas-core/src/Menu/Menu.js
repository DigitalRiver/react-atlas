import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  render() {
  	const {
      left
    } = this.props;
  	const tierOneChildren = React.Children.map(
	  this.props.children,
	  (child, i) => {
	    child = cloneElement(child, {
          left: left
        });
	    return child;
	  }
    );

    const tierOne = <ul styleName={"menuList"}>{tierOneChildren}</ul>

    const menuClasses = cx({
      "menu": true,
      "left": left
    });

  	return (
  		<div styleName={menuClasses}>
  			<div styleName={cx({"menuContainer": !left})}>
	  			{tierOne}
	  		</div>
  		</div>
  	);
  }
}

Menu.propTypes = {
  /**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  children: PropTypes.node
};

Menu.defaultProps = {
	children: <p>Some menu item.</p>
};

export default Menu;
